const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const BookedService = require("../models/BookedService");
const Service = require("../models/service");
const { startOfDay, endOfDay } = require("date-fns");
const Absent = require("../models/Absent");
const Slot = require("../models/Slot");
const User = require("../models/User")

const mergeService = async (bookedService) => {
  return await Promise.all(
    bookedService.services.map(async (serviceItem) => {
      const servicefind = await Service.findById(serviceItem.service_id);
      let service = servicefind._doc;
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
  console.log(viewDate);
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
    //chặn ngày cũ
    if (new Date(date) < new Date().setHours(0, 0, 0, 0))
      return res.status(400).json("Outdated");

    // chặn slot ko có trong slot đã đặt ra. vd: 12, 13, 18, 19,...
    if (new Date(date) === new Date().setHours(0, 0, 0, 0)) {
      // chặn slot đã qua trong ngày, check cùng ngày
      if (parseInt(slot_time) < new Date().getHours())
        return res.status(422).json(`Slot ${slot_time} is expired.`);
    }

    // check doctor va user co ton tai

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
  const bookedService = await BookedService.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: {
        services: {
          service_id: req.body.service_id,
          quantity: req.body.quantity,
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

//@desc Get all bookedservice
//@route GET /api/bookedservices
//@access public
const getAllBookedService = asyncHandler(async (req, res, next) => {
  const bookedService = await BookedService.find();

  // const result = bookedService.map(async (obj) => {
  //   const user = await User.findById(obj.user_id);
  //   const doctor = await User.findById(obj.doctor_id);

  //   console.log('user',user.fullname)

  // })
  
  
  
  res
    .status(200)
    .json({
      bookedService
      
    });
});

module.exports = {
  bookService,
  addExtraService,
  getBookedByDoctor,
  getIncomingBookedByUser,
  updateAddedService,
  completeBooked,
  cancelBookedService,
  getAllBookedService,
};
