var express = require("express");
var router = express.Router();
var UserModel = require("../models/User.js");
var {
  getDoctorById,
  getDoctors,
  updateUser,
  deleteDoctorAccount,
  getUsersCuredone,
} = require("../controllers/userController");
var {
  verifyUser,
  verifyToken,
  verifyAdmin,
} = require("../middlewares/verifyToken");
const updateImage = require("../config/multerConfig");

// GET patients who had booked service
router.get("/doctors/:id", getDoctorById);

// GET doctor by id
router.get("/booked-service-done", getUsersCuredone);

// GET all doctors
router.get("/doctors", getDoctors);

// UPDATE user by id
router.put("/:id", updateImage.single("avatar"), updateUser);

router.delete("/doctors/:id", verifyToken, verifyAdmin, deleteDoctorAccount);

module.exports = router;
