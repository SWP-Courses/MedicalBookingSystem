var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var UserModel = require("../models/User.js");
var RoleModel = require("../models/Role.js");
var SpecialistModel = require("../models/Specialist");
const { deleteImageById } = require("./imageController.js");
var nodemailer = require("nodemailer");

const CLIENT_URL = "http://localhost:3000";

const sendMail = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
      password: { $exists: true },
    });
    if (!user) return res.status(404).json("Tài khoản không tồn tại.");

    // check email address is valid ?
    let code = (Math.random() + 1).toString(36).substring(6);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "thongkhoa2002@gmail.com",
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    var mailOptions = {
      from: "thongkhoa2002@gmail.com",
      to: req.body.email.trim(),
      subject: "Đổi mật khẩu",
      text: "Mã xác nhận là " + code,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent " + info.response);

      const token = jwt.sign(
        { id: user._id, reset_code: code },
        process.env.JWT,
        { expiresIn: "10m" }
      );

      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Credentials", true);
      res.cookie("reset_token", token, {
        httpOnly: false,
      });

      res.status(200).json("Đã gửi mã xác nhận đến " + req.body.email);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const verifyResetCode = async (req, res, next) => {
  try {
    const reset_token = req.cookies["reset_token"];
    jwt.verify(reset_token, process.env.JWT, (err, user) => {
      if (err) return res.status(403).send("Sai mã code");
      // console.log(user);
      if (user.reset_code === req.body.resetInput)
        return res.status(200).send("Xác thực thành công");
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateNewPassword = async (req, res, next) => {
  try {
    const reset_token = req.cookies["reset_token"];
    jwt.verify(reset_token, process.env.JWT, async (err, user) => {
      if (err) return res.status(403).send("Mã code đã quá hạn");

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);

      await UserModel.findByIdAndUpdate(user.id, {
        password: hash,
      });
      return res.status(200).send("Đã cập nhật mật khẩu mới");
    });
  } catch (err) {
    res.status(500).err;
  }
};

// POST /api/resgiter
// Với role là R2 (doctor) thì gửi thêm 3 fields là degree, specialist_id, profile
// REGISTERserver/controllers/authController.js
const register = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ phone: req.body.phone });
    const avatar = req.file;
    console.log(req.body);
    if (user) {
      return res.status(409).send("Số điện thoại đã tồn tại.");
    } else {
      // Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      console.log("resgiter");
      const hash = bcrypt.hashSync(req.body.password, salt);

      // default: role_code = "R3"
      let document = {
        fullname: req.body.fullname,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: hash,
        phone: req.body.phone,
        role_code: req.body.role_code,
        avatar: avatar,
        room_id: req.body.room_id,
      };

      // If create a doctor account
      // Send role_code="R2"
      if (req.body.role_code === "R2")
        document = {
          role_code: "R2",
          ...document,
          degree: req.body.degree,
          room: req.body.room,
          profile: req.body.profile,
        };

      const newUser = new UserModel(
        !req.body.email
          ? document
          : {
              ...document,
              email: req.body.email,
            }
      );

      let user = await newUser.save();

      if (req.body.role_code === "R2") {
        const doctor = await UserModel.findById(user._id);
        if (!doctor) return res.status(404).send("Doctor not found!");
        const special = await SpecialistModel.findById(doctor.specialist_id);
        res.status(200).json({ ...doctor._doc, special });
        return;
      }

      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// POST /api/login
// LOGIN
const login = async (req, res, next) => {
  console.log("login");
  try {
    // profile của doctor chỉ được admin thay đổi
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) return res.status(404).send("Tài khoản không tồn tại!");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return res.status(401).send("Sai mật khẩu!");
    const userRole = await RoleModel.findOne({ role_code: user.role_code });
    // console.log(userRole);

    const token = jwt.sign(
      { id: user._id, isAdmin: user.role === "admin" ? true : false },
      process.env.JWT
    );
    console.log(token);

    const { password, role_code, ...filteredUser } = user._doc;
    res
      .cookie("access_token", "sfasdfdf", {
        httpOnly: true,
      })
      .status(200)
      .json({ ...filteredUser, role: userRole.title });
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST /api/logout
// LOGOUT
const logout = (req, res) => {
  console.log("logout controller", req.user);
  // req.cookie.destroy()
  // req.logout();
  // res.redirect(CLIENT_URL)
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  delete req.user;
  // req.logout();
  req.session = null;
  res.clearCookie("session");
  res.clearCookie("session.sig");
  // console.log("asdasd");
  // res.redirect(CLIENT_URL);
  res.status(200).json("logged out");
  // res
  //   // .clearCookie("access_token", {
  //   //   sameSite: "none",
  //   //   secure: true,
  //   // })
  //   .status(200)
  //   .json("User has been logged out.");
};

const loginSuccess = (req, res) => {
  console.log("req.user", req.user);
  if (req.user) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.status(200).json(req.user._doc || req.user);
  } else {
    res.status(404).json({});
  }
};

const loginFailed = (req, res) => {
  console.log(req.session.messages);
  res.cookie("error", "Đã có tài khoản đăng nhập đăng kí với email này!");
  res.redirect(CLIENT_URL + "/login");
  // res.render("asdashd")
};

module.exports = {
  register,
  login,
  logout,
  loginSuccess,
  loginFailed,
  sendMail,
  verifyResetCode,
  updateNewPassword,
};
