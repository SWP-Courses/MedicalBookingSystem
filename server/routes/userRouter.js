var express = require("express");
var router = express.Router();
var UserModel = require("../models/User.js");
var { getUserById, getDoctors, deleteDoctorAccount } = require("../controllers/userController");

// GET user by id
router.get("/doctor", getDoctors);
router.delete("/doctor/:id", deleteDoctorAccount);
router.get("/:id", getUserById);

module.exports = router;
