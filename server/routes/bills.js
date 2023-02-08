import express from "express";
var router = express.Router();
import DrugBill from "../models/DrugBill.js";

// Get all bills - also cure history
router.get("/", async (req, res) => {
  try {
    const bills = await DrugBill.find({ customer_id: req.body.customer_id });
    if (bills.length) return;
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a bill
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
export default router;
