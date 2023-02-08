var express = require("express");
var router = express.Router();
var MedicineModel = require("../models/Medicine.js");

// Get all medicines
router.get("/", async (req, res) => {
  try {
    const medicines = await MedicineModel.find();
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a medicine
router.post("/", async (req, res) => {
  const newMedicine = new MedicineModel({
    name: req.body.name,
    type: req.body.type,
    quantity: req.body.quantity,
    price: req.body.price,
  });

  try {
    const savedMedicine = await newMedicine.save();
    res.status(200).json(savedMedicine);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
