const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const BookedService = require("../models/BookedService");
const Service = require("../models/service");
const { startOfDay, endOfDay } = require("date-fns");
const Absent = require("../models/Absent");
const Slot = require("../models/Slot");
const User = require("../models/User");

const mergeService = async (bookedService) => {
  return await Promise.all(
    bookedService.services.map(async (serviceItem) => {
      const servicefind = await Service.findById(serviceItem.service_id);
      // console.log("merge",servicefind);
      let service = servicefind;
      return {
        name: service.name,
        price: service.price,
        quantity: serviceItem.quantity,
        service_id: serviceItem.service_id,
      };
    })
  );
};

//@desc Get blog
//@route GET /api/blog/:id
//@access private
const getBookedByDoctor = asyncHandler(async (req, res, next) => {
  const viewDate = req.query.date;
  // console.log(viewDate);
  try {
    const orders = await BookedService.aggregate([
      {
        $match: {
          $and: [
            { doctor_id: mongoose.Types.ObjectId(req.params.id) },
            {
              date: {
                $gte: startOfDay(new Date(viewDate)),
                $lte: endOfDay(new Date(viewDate)),
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          pipeline: [{ $project: { _id: 1, fullname: 1 } }],
          as: "customer",
        },
      },
    ]).project({ user_id: 0, doctor_id: 0, date: 0 });
    // console.log(orders);
    if (!orders.length) return res.status(404).json("Không có lịch đặt");

    const bookedServicesFull = await Promise.all(
      orders.map(async (order) => {
        const servicesFull = await mergeService(order);
        // console.log({
        //   ...order,
        //   services: servicesFull,
        // });
        return {
          ...order,
          services: servicesFull,
        };
      })
    );
    return res.status(200).json(bookedServicesFull);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//@desc Get history of patient
//@route GET /api/blog/:id
//@access private
const getHistoryByUserId = asyncHandler(async (req, res, next) => {
  const viewDate = req.query.date;
  console.log(viewDate);
  const orders = await BookedService.aggregate([
    {
      $match: {
        $and: [
          { user_id: mongoose.Types.ObjectId(req.params.userId) },
          { isPaid: true },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 1, fullname: 1 } }],
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "doctor_id",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 1, fullname: 1 } }],
        as: "doctor",
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
  ]).project({ user_id: 0, doctor_id: 0 });
  // console.log(orders);
  const bookedServicesFull = await Promise.all(
    orders.map(async (order) => {
      const servicesFull = await mergeService(order);
      // console.log({
      //   ...order,
      //   services: servicesFull,
      // });
      return {
        ...order,
        services: servicesFull,
      };
    })
  );
  return res.status(200).json(bookedServicesFull);
});

const getIncomingBookedByUser = asyncHandler(async (req, res, next) => {
  const orders = await BookedService.aggregate([
    {
      $match: {
        $and: [
          { user_id: mongoose.Types.ObjectId(req.params.id) },
          {
            date: {
              $gte: startOfDay(new Date()),
            },
          },
          { isPaid: false },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "doctor_id",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 1, fullname: 1 } }],
        as: "doctor",
      },
    },
  ]).project({ user_id: 0, doctor_id: 0 });
  // console.log(orders);
  const bookedServicesFull = await Promise.all(
    orders.map(async (order) => {
      const servicesFull = await mergeService(order);
      return {
        ...order,
        services: servicesFull,
      };
    })
  );
  return res.status(200).json(bookedServicesFull);
});

//@desc Create blog
//@route POST /api/blog
//@access private
const bookService = asyncHandler(async (req, res, next) => {
  const { user_id, doctor_id, date, slot_time, service_id } = req.body;

  try {
    // check doctor va user co ton tai
    const patient = await User.findById(user_id);
    if (!patient) return res.status(404).json("Người dùng không tồn tại");

    const doctor = await User.findById(doctor_id);
    if (!doctor) return res.status(404).json("Bác sĩ không tồn tại");

    // check đủ fields
    if (!user_id || !doctor_id || !date || !slot_time || !service_id) {
      return res.status(400).json("Không đủ dữ liệu yêu cầu");
    }

    //chặn ngày cũ
    if (new Date(date) < new Date().setHours(0, 0, 0, 0))
      return res.status(400).json("Outdated");

    // đặt trong ngày thì chỉ được đặt những slot sắp tới
    if (new Date(date) === new Date().setHours(0, 0, 0, 0)) {
      // chặn slot đã qua trong ngày, check cùng ngày
      if (parseInt(slot_time) < new Date().getHours())
        return res.status(422).json(`Slot ${slot_time} is expired.`);
    }

    // Ngày sắp tới thì slot phải nằm trong những slot được đặt ra
    const fullSlots = await Slot.find();
    if (fullSlots.length) {
      const isinSlots = fullSlots.some(
        (slot) => slot.time === parseInt(slot_time)
      );
      if (!isinSlots)
        return res
          .status(404)
          .json("Slot này ko nằm trong những slot được book.");
    }

    // chặn book bác sĩ đã nghỉ của ngày
    const absentDoctor = await Absent.findOne({
      doctor_id: doctor_id,
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDay(new Date(date)),
      },
    });
    if (absentDoctor) return res.status(403).json(`Doctor absent in ${date}`);

    // chặn bookedservice đã có thì sẽ bị duplicate
    // trường hợp book lại cùng slot, doctor, date
    const existBservice = await BookedService.findOne({
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDay(new Date(date)),
      },
      doctor_id: doctor_id,
      slot_time: slot_time,
    });
    if (existBservice)
      return res.status(409).json("This slot is already booked");

    const bService = new BookedService({
      user_id,
      doctor_id,
      date: new Date(date),
      slot_time: slot_time,
      services: [{ service_id, quantity: 1 }],
    });
    // console.log(bService);
    const savedbService = await bService.save();
    res.status(200).json(savedbService);
  } catch (err) {
    console.log(err);
  }
});

//@desc Update blog
//@route PUT /api/blog/:id
//@access private
const addExtraService = asyncHandler(async (req, res, next) => {
  const { service_id, quantity } = req.body;

  if (!service_id || !quantity)
    return res.status(400).json("Thêm phải có dịch vụ và số lượng!");

  const bookedService = await BookedService.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: {
        services: {
          service_id,
          quantity,
        },
      },
    },
    { safe: true, upsert: true, new: true }
  );

  //   if (
  //     bookedService.services.find(
  //       (service) => service.service_id === req.body.service_id
  //     )
  //   )
  //     return res.status(409).json("Duplicate service id");

  res.status(200).json(bookedService);
});

const updateAddedService = asyncHandler(async (req, res, next) => {
  // check params:id có valid

  const result = await BookedService.updateOne(
    { _id: req.params.id, "services.service_id": req.params.serviceId },
    { $set: { "services.$.quantity": req.body.quantity } }
  );

  res.status(200).json(result);
});

const completeBooked = asyncHandler(async (req, res, next) => {
  const booked = await BookedService.findById(req.params.id);

  let totalPrice = 0;
  for (const bservice of booked.services) {
    console.log("asdasd");
    const service = await Service.findById(bservice.service_id);
    totalPrice = bservice.quantity * service.price;
  }

  booked.total_price = totalPrice;
  const completeBooked = await booked.save();
  res.status(200).json(completeBooked);
});

const cancelBookedService = asyncHandler(async (req, res, next) => {
  const result = await BookedService.findByIdAndDelete(req.params.id);
  res.status(200).json(result);
});

// An
//@desc Get all bookedservice
//@route GET /api/bookedservices
//@access public
const getAllBookedService = asyncHandler(async (req, res, next) => {
  const bookedService = await BookedService.find();

  const result = await Promise.all(
    bookedService.map(async (obj) => {
      const user = await User.findById(obj.user_id);
      const doctor = await User.findById(obj.doctor_id);

      const user_name = user ? user.fullname : "";
      const doctor_name = doctor ? doctor.fullname : "";

      return {
        _id: obj._id,
        user_name,
        doctor_name,
        date: obj.date,
        slot_time: obj.slot_time,
        services: obj.services,
        isPaid: obj.isPaid,
        total_price: obj.total_price,
      };
    })
  );

  res.status(200).json({
    result,
  });
});

//@desc Get Service Bill by id
//@route PUT /api/bookedservices/:id
//@access public
const getBookedServiceById = asyncHandler(async (req, res, next) => {
  const bookedService = await BookedService.findById(req.params.id);
  if (!bookedService) {
    res.status(404);
    throw new Error("bookedService Not Found!");
  }

  const user = await User.findById(bookedService.user_id);
  const doctor = await User.findById(bookedService.doctor_id);

  const servicesList = await Promise.all(
    bookedService.services.map(async (obj) => {
      const service = await Service.findById(obj.service_id);

      const service_name = service ? service.name : "";
      const price = service ? service.price : 1;

      return {
        _id: obj._id,
        service_name,
        price,
        quantity: obj.quantity,
      };
    })
  );

  const result = {
    _id: bookedService._id,
    user_name: user.fullname,
    doctor_name: doctor.fullname,
    date: bookedService.date,
    slot_time: bookedService.slot_time,
    services: servicesList,
    total_price: bookedService.total_price,
    isPaid: bookedService.isPaid,
  };

  res.status(200).json({ result });
});

//@desc Update Service Bill by id
//@route PATCH /api/bookedservices/payment/:id
//@access public
const paymentBookedServices = asyncHandler(async (req, res, next) => {
  try {

    const paidBservice = await BookedService.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
      date: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    });
    
    if (!paidBservice)
      return res
        .status(405)
        .send("Không được thanh toán cho lịch khác hôm nay!");

    if (new Date().getHours() < paidBservice.slot_time)
      return res.status(405).send("Không được thanh toán cho slot chưa khám!");

    const total_price = req.body.total_price;
    // const isPaid = req.body.isPaid;
    // console.log(req.body)

    const completeBooked = await BookedService.findByIdAndUpdate(
      req.params.id,
      {
        total_price,
        isPaid:true,
      },
      { new: true }
    );

    // const completeBooked = await booked.save();

    res.status(200).json(completeBooked);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  bookService,
  addExtraService,
  getBookedByDoctor,
  getIncomingBookedByUser,
  updateAddedService,
  completeBooked,
  cancelBookedService,
  getHistoryByUserId,
  getAllBookedService,
  getBookedServiceById,
  paymentBookedServices,
};
