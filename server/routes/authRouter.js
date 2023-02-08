var { login, logout, register } = require("../controllers/authController");

var express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
