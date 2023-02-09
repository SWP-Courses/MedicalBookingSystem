const asyncHandler = require("express-async-handler");
const Medicine = require("../models/medicine");

//@desc Get all medicine
//@route GET /api/medicine
//@access private
const getMedicine = asyncHandler(async (req, res, next) => {
  const medicines = await Medicine.find();
  res.status(200).json({ medicines });
});

//@desc Get medicine
//@route GET /api/medicine/:id
//@access private
const getMedicineById = asyncHandler(async (req, res, next) => {
  const medicines = await Medicine.findById(req.params.id);
  if (!medicines) {
    res.status(404);
    throw new Error("Medicine Not Found!");
  }
  res.status(200).json({ medicines });
});

//@desc Create medicine
//@route POST /api/medicine
//@access private
const createMedicine = asyncHandler(async (req, res, next) => {
  const { name, type, dosageForm, price } = req.body;

  if (!name || !type || !dosageForm || !price) {
    res.status(400);
    throw new Error("All field not be empty!");
  }

  const medicines = await Medicine.create({
    name,
    type,
    dosageForm,
    price,
  });

  res.status(200).json({ medicines });
});

//@desc Update medicine
//@route PUT /api/medicine/:id
//@access private
const updateMedicine = asyncHandler(async (req, res, next) => {
  const medicineId = req.params.id;
  const medicines = await Medicine.findById(medicineId);

  if (!medicines) {
    res.status(404);
    throw new Error("Medicine Not Found!");
  }

  const { name, type, dosageForm, price } = req.body;
  const updateMedicine = await Medicine.findByIdAndUpdate(medicineId, {
    name,
    type,
    dosageForm,
    price,
  });

  res.status(200).json({ updateMedicine });
});

//@desc Delete medicine
//@route delete /api/medicine/:id
//@access private
const deleteMedicine = asyncHandler(async (req, res, next) => {
  const medicineId = req.params.id;
  const deleteMedicines = await Medicine.findById(medicineId);
  if (!deleteMedicines) {
    res.status(404);
    throw new Error("Medicine Not Found!");
  }
  await Medicine.deleteOne({ _id: medicineId });
  res.status(200).json({ deleteMedicines });
});

module.exports = {
  getMedicine,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};
