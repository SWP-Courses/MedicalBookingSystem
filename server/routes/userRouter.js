var express = require("express");
var router = express.Router();
var UserModel = require("../models/User.js");
var { getUserById } = require("../controllers/userController");

// GET user by id
router.get("/:id", getUserById);

module.exports = router;
