import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import RoleModel from "../models/Role.js";

// REGISTER
export const register = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ phone: req.body.phone });
    // console.log(user);
    if (user) {
      return res.status(409).send("Phone already exists.");
    } else {
      // Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const document = {
        fullname: req.body.fullname,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: hash,
        phone: req.body.phone,
        role_code: req.body.role_code,
      };
      const newUser = new UserModel(
        !req.body.email
          ? document
          : {
              ...document,
              email: req.body.email,
            }
      );

      await newUser.save();
      res.status(200).send("User has been created.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// LOGIN
export const login = async (req, res, next) => {
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

    if (!isPasswordCorrect) return next(createError(401, "Wrong password!"));
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

// LOGOUT
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
