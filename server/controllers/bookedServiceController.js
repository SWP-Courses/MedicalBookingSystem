const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const BookedService = require("../models/BookedService");
const Service = require("../models/service");
const { startOfDay, endOfDay } = require("date-fns");

const mergeService = async (bookedService) => {
  return await Promise.all(
    bookedService._doc.services.map(async (serviceItem) => {
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

//@desc Get all blog
//@route GET /api/blog
//@access private
const getFreeDoctors = asyncHandler(async (req, res, next) => {
  const blogs = await BookedService.find();
  res.status(200).json({ blogs });
});

//@desc Get blog
//@route GET /api/blog/:id
//@access private
const getBookedByDoctor = asyncHandler(async (req, res, next) => {
  const viewDate = req.query.date;
  console.log(viewDate);
  const orders = await BookedService.find({
    doctor_id: mongoose.Types.ObjectId(req.params.id),
    date: {
      $gte: startOfDay(new Date(viewDate)),
      $lte: endOfDay(new Date(viewDate)),
    },
  });
  console.log(orders);
  const bookedServicesFull = await Promise.all(
    orders.map(async (order) => {
      console.log("asdasd");
      const servicesFull = await mergeService(order);
      console.log({
        ...order._doc,
        services: servicesFull,
      });
      return {
        ...order._doc,
        services: servicesFull,
      };
    })
  );

  res.status(200).json(bookedServicesFull);
});

const getBookedByUser = asyncHandler(async (req, res, next) => {
  const orders = await BookedService.find({ user_id: req.params.id });
  res.status(200).json(orders);
});

//@desc Create blog
//@route POST /api/blog
//@access private
const bookService = asyncHandler(async (req, res, next) => {
  const { user_id, doctor_id, date, slot_time, service_id } = req.body;

  const bService = await BookedService.create({
    user_id,
    doctor_id,
    date,
    slot_time: slot_time,
    services: [{ service_id, quantity: 1 }],
  });
  res.status(200).json(bService);
});

//@desc Update blog
//@route PUT /api/blog/:id
//@access private
const addExtraService = asyncHandler(async (req, res, next) => {
  const bookedService = await BookedService.findById(req.params.id);

  bookedService.services.push({
    service_id: req.body.service_id,
    quantity: req.params.quantity,
  });
  const updated = await bookService.save();
  res.status(200).json(updated);
});

const updateAddedService = asyncHandler(async (req, res, next) => {
  const bookedService = await BookedService.findById(req.params.id);

  bookedService.services.push({
    service_id: req.body.service_id,
    quantity: req.params.quantity,
  });
  const updated = await bookService.save();
  res.status(200).json(updated);
});

module.exports = {
  bookService,
  addExtraService,
  getBookedByDoctor,
  getBookedByUser,
  updateAddedService,
};
