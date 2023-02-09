var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const {
  getAllSpecialists,
  getSingleSpecialist,
} = require("../controllers/specialistController");


// /api/specialists/
router.get("/", getAllSpecialists);
router.get("/:specialistId", getSingleSpecialist);

module.exports = router;
