var express = require("express");
var router = express.Router();
var UserModel = require("../models/User.js");
var { getDoctorById, getDoctors, updateUser, deleteDoctorAccount } = require("../controllers/userController");
var {verifyUser} = require("../middlewares/verifyToken")
const updateImage = require("../config/multerConfig");

// GET doctor by id
router.get("/doctors/:id", getDoctorById);


// GET all doctors
router.get("/doctors", getDoctors);

// UPDATE user by id
router.put("/:id", updateImage.single("avatar"),updateUser );

router.delete("/doctors/:id", deleteDoctorAccount);


module.exports = router;
