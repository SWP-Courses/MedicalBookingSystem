var express = require("express");
const { refreshTokens } = require("../controllers/authController");
const { generateAccessToken } = require("../middlewares/verifyToken");
var router = express.Router();
require("dotenv").config();

/* GET home page. */


module.exports = router;
