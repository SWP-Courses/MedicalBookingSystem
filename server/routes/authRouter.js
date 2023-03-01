var {
  login,
  logout,
  register,
  loginFailed,
  loginSuccess,
} = require("../controllers/authController");
const updateImage = require("../config/multerConfig");
const passport = require("passport")
const CLIENT_URL = "http://localhost:3000";

var express = require("express");
const router = express.Router();

router.post("/register", updateImage.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailed);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/auth/login/failed",
    successRedirect:CLIENT_URL,
  }),
  // (req, res) => {
  //   console.log(req.user);
  //   // res.status(200).json(req.user)
  //   // res.redirect(CLIENT_URL);
  // }
);

module.exports = router;
