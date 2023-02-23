var express = require("express");
const { getBillByUser, addDrugBill } = require("../controllers/drugBillController");
var router = express.Router();

// Get all bills - also cure history
router.get("/users/:id", getBillByUser);

// Add a bill
router.post("/:doctorId/:customerId", addDrugBill);

module.exports = router;
