var { login, logout, register } = require("../controllers/authController");
const updateImage = require("../config/multerConfig");

var express = require("express");
const router = express.Router();

router.post("/register", updateImage.single("avatar"), register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
