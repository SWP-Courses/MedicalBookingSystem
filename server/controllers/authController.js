var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var UserModel = require("../models/User.js");
var RoleModel = require("../models/Role.js");
var SpecialistModel = require("../models/Specialist");
const { deleteImageById } = require("./imageController.js");

// POST /api/resgiter
// Với role là R2 (doctor) thì gửi thêm 3 fields là degree, specialist_id, profile
// REGISTER
const register = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ phone: req.body.phone });
    const avatar = req.file;
    console.log(req.body);
    if (user) {
      return res.status(409).send("Phone already exists.");
    } else {
      // Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(req.body.password, salt);

      let document = {
        fullname: req.body.fullname,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: hash,
        phone: req.body.phone,
        role_code: req.body.role_code,
        avatar: avatar
      };

      // If create a doctor accounts
      if (req.body.role_code === "R2")
        document = {
          ...document,
          degree: req.body.degree,
          specialist_id: req.body.specialist_id,
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
    await deleteImageById(avatar.id);
    res.status(500).json(err);
  }
};

// POST /api/login
// LOGIN
const login = async (req, res, next) => {
  try {
    let userQuery = {};
    if (req.body.phone) {
      userQuery = {
        phone: req.body.phone,
        role_code: req.body.role_code,
      };
    } else if (req.body.email) {
      userQuery = {
        email: req.body.email,
        role_code: req.body.role_code,
      };
    }
    const user = await UserModel.findOne(userQuery);
    // const result = await UserModel.aggregate([
    //   {
    //     $lookup: {
    //       from: "roles",
    //       localField: "role_code",
    //       foreignField: "role_code",
    //       as: "role",
    //     },
    //   },
    //   {
    //     $match: {
    //       phone: "01234567890",
    //     },
    //   },
    // ]);
    // const user = result[0];

    console.log(user);

    if (!user) return res.status(404).send("User not exists.");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return res.status(401).send("Wrong password!");
    const userRole = await RoleModel.findOne({ role_code: user.role_code });
    console.log(userRole);

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, idAdmin, ...filteredUser } = user._doc;
    res
      .cookie("access_token", token, {
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
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = { register, login, logout };
