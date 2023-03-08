var express = require("express");
const {  addDrugBill, getPresciptionByServiceId } = require("../controllers/drugBillController");
var router = express.Router();

// /api/presciptions/

// GET a prescription by booked service id
router.get("/:id", getPresciptionByServiceId);

// Add a bill
router.post("/:doctorId/:customerId", addDrugBill);

module.exports = router;
