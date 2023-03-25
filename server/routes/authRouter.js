var {
  login,
  logout,
  register,
  loginFailed,
  loginSuccess,
  sendMail,
  verifyResetCode,
  updateNewPassword,
  handleRefreshToken,
} = require("../controllers/authController");
const updateImage = require("../config/multerConfig");
const passport = require("passport")
const CLIENT_URL = "http://localhost:3000";
const cookieParser = require('cookie-parser')
var express = require("express");
const router = express.Router();
router.use(cookieParser());

// router.get("/forgot-password", sendMail );
router.post("/send-reset-code", sendMail );
router.post('/verify-code', verifyResetCode)
router.post('/reset-password', updateNewPassword)

router.post("/refresh", handleRefreshToken);
router.post("/register", updateImage.single("avatar"), register);
router.post("/login", login);
router.post("/logout", logout);

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
    failureMessage:true,
    successRedirect:CLIENT_URL,
  }),
  // (req, res) => {
  //   console.log(req.user);
  //   // res.status(200).json(req.user)
  //   // res.redirect(CLIENT_URL);
  // }
);

module.exports = router;
