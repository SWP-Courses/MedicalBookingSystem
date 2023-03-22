const asyncHandler = require("express-async-handler");
const TypeMedicine = require("../models/typeMedicine");

//@desc Get all TypeMedicine
//@route GET /api/typeMedicine
//@access private
const getTypeMedicine = asyncHandler(async (req, res, next) => {
  const typeMedicine = await TypeMedicine.find();
  res.status(200).json({ typeMedicine });
});

//@desc Get typeMedicine
//@route GET /api/typeMedicine/:id
//@access private
const getTypeMedicineById = asyncHandler(async (req, res, next) => {
  const typeMedicine = await TypeMedicine.findById(req.params.id);
  if (!typeMedicine) {
    res.status(404);
    throw new Error("TypeMedicine Not Found!");
  }
  res.status(200).json({ typeMedicine });
});

//@desc Create typeMedicine
//@route POST /api/typeMedicine
//@access private
const createTypeMedicine = asyncHandler(async (req, res, next) => {
  const { name} = req.body;

  if (!name) {
    res.status(400);
    throw new Error("All field not be empty!");
  }

  const typeMedicine = await TypeMedicine.create({
    name
  });

  res.status(200).json({ typeMedicine });
});

//@desc Update typeMedicine
//@route PUT /api/typeMedicine/:id
//@access private
const updateTypeMedicine = asyncHandler(async (req, res, next) => {
  const typeMedicineId = req.params.id;
  const typeMedicine = await TypeMedicine.findById(typeMedicineId);

  if (!typeMedicine) {
    res.status(404);
    throw new Error("TypeMedicine Not Found!");
  }

  const { name} = req.body;

  const typeMedicineUpdate = await TypeMedicine.findByIdAndUpdate(typeMedicineId, {
    name
  }, { new: true });

  res.status(200).json({ typeMedicineUpdate });
});

//@desc Delete typeMedicine
//@route delete /api/:id
//@access private
const deleteTypeMedicine = asyncHandler(async (req, res, next) => {
  const typeMedicineId = req.params.id;
  const deleteTypeMedicine = await TypeMedicine.findById(typeMedicineId);
  if (!deleteTypeMedicine) {
    res.status(404);
    throw new Error("TypeMedicine Not Found!");
  }
  await TypeMedicine.deleteOne({ _id: typeMedicineId });
  res.status(200).json({ deleteTypeMedicine });
});

module.exports = {
  getTypeMedicine,
  getTypeMedicineById,
  createTypeMedicine,
  updateTypeMedicine,
  deleteTypeMedicine,
};
