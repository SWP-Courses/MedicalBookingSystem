var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const updateImage = require("../config/multerConfig");
const {
  getAllSpecialists,
  getSingleSpecialist,
  addSpecialist,
} = require("../controllers/specialistController");


// /api/specialists/
router.get("/", getAllSpecialists);
router.post("/", updateImage.array("images",2),addSpecialist);
router.get("/:id", getSingleSpecialist);

module.exports = router;
