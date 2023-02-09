const asyncHandler = require("express-async-handler");
const Service = require("../models/service");

//@desc Get all service
//@route GET /api/service
//@access private
const getService = asyncHandler(async (req, res, next) => {
  const services = await Service.find();
  res.status(200).json({ services });
});

//@desc Get service
//@route GET /api/service/:id
//@access private
const getServiceById = asyncHandler(async (req, res, next) => {
  const services = await Service.findById(req.params.id);
  if (!services) {
    res.status(404);
    throw new Error("Service Not Found!");
  }
  res.status(200).json({ services });
});

//@desc Create service
//@route POST /api/service
//@access private
const createService = asyncHandler(async (req, res, next) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    res.status(400);
    throw new Error("All field not be empty!");
  }

  const services = await Service.create({
    name,
    price,
    description
  });

  res.status(200).json({ services });
});

//@desc Update service
//@route PUT /api/service/:id
//@access private
const updateService = asyncHandler(async (req, res, next) => {
  const serviceId = req.params.id;
  const service = await Service.findById(serviceId);

  if (!service) {
    res.status(404);
    throw new Error("Service Not Found!");
  }

  const { name, price, description } = req.body;
  const services = await Service.findByIdAndUpdate(serviceId, {
    name,
    price,
    description
  }, { new: true });

  res.status(200).json({ services });
});

//@desc Delete service
//@route delete /api/:id
//@access private
const deleteService = asyncHandler(async (req, res, next) => {
  const serviceId = req.params.id;
  const deleteService = await Service.findById(serviceId);
  if (!deleteService) {
    res.status(404);
    throw new Error("Service Not Found!");
  }
  await Service.deleteOne({ _id: serviceId });
  res.status(200).json({ deleteService });
});

module.exports = {
  getService,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
