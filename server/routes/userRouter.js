var express = require("express");
var router = express.Router();
var UserModel = require("../models/User.js");
var { getDoctorById, getDoctors, updateUser, deleteDoctorAccount } = require("../controllers/userController");
var {verifyUser} = require("../middlewares/verifyToken")

// GET doctor by id
router.get("/doctors/:id", getDoctorById);


// GET all doctors
router.get("/doctors", getDoctors);

// UPDATE user by id
router.put("/:id",verifyUser, updateUser )

router.delete("/doctors/:id", deleteDoctorAccount);


module.exports = router;
