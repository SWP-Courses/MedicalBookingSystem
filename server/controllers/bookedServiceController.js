const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const BookedService = require("../models/BookedService");
const Service = require("../models/service");
const { startOfDay, endOfDay } = require("date-fns");

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
console.log(date);
  const bService = await BookedService.create({
    user_id,
    doctor_id,
    date: new Date(date+"T12:00:00"),
    slot_time: slot_time,
    services: [{ service_id, quantity: 1 }],
  });
  res.status(200).json(bService);
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

module.exports = {
  bookService,
  addExtraService,
  getBookedByDoctor,
  getIncomingBookedByUser,
  updateAddedService,
  completeBooked,
  cancelBookedService,
};
