var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var UserModel = require("../models/User.js");
var RoleModel = require("../models/Role.js");

// POST /api/resgiter
// Với role là R2 (doctor) thì gửi thêm 3 fields là degree, specialist_id, profile
// REGISTER
const register = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ phone: req.body.phone });
    console.log(req.body);
    if (user) {
      return res.status(409).send("Số điện thoại đã tồn tại.");
    } else {
      // Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      console.log('resgiter');
      const hash = bcrypt.hashSync(req.body.password, salt);
      
      // default: role_code = "R3"
      let document = {
        fullname: req.body.fullname,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: hash,
        phone: req.body.phone,
      };
      
      // If create a doctor account
      // Pass role_code="R2"
      if (req.body.role_code === "R2")
      document = {
        role_code: "R2",
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

      const savedUser = await newUser.save();
      res.status(200).send(savedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST /api/login
// LOGIN
const login = async (req, res, next) => {
  try {
    let userQuery = { role_code: req.body.role_code };
    if (req.body.phone) {
      userQuery = { ...userQuery, phone: req.body.phone };
    } else if (req.body.email) {
      userQuery = {
        ...userQuery,
        email: req.body.email,
      };
    }
    
    // degree, profile, spe_id của doctor chỉ được admin thay đổi
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

    // console.log(user);

    if (!user) return res.status(404).send("Tài khoản không tồn tại!");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return res.status(401).send("Sai mật khẩu!");
    const userRole = await RoleModel.findOne({ role_code: user.role_code });
    // console.log(userRole);

    const token = jwt.sign(
      { id: user._id, isAdmin: user.role === 'admin' ? true : false },
      process.env.JWT
    );

    const { password, role_code, ...filteredUser } = user._doc;
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
  console.log('logout controller');
  // res
  //   .clearCookie("access_token", {
  //     sameSite: "none",
  //     secure: true,
  //   })
  //   .status(200)
  //   .json("User has been logged out.");

  res.status(200).json("Logged out!")
};

module.exports = { register, login, logout };
