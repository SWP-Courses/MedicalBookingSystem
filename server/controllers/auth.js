const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.js");

export const register = async (req, res, next) => {
  try {
    const user = await UserModel;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  //   var salt = bcrypt.genSaltSync(10);
  //   var hash = bcrypt.hashSync(req.body.password, salt);

  //   const newUser = new User({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: hash,
  //   });

  //   try {
  //     await newUser.save();
  //     res.status(200).send("User has been created.");
  //   } catch (err) {
  //     next(err);
  //   }
};

// REGISTER
// export const register = async (req, res) => {
//   // Check existing user
//   console.log(req.body);
//   const q = "SELECT * FROM users WHERE email = ? OR username = ?";
//   db.query(q, [req.body.email, req.body.username], (err, data) => {
//     if (err) return res.json(err);
//     if (data.length) return res.status(409).json("User already exists.");

//     // Hash the password and create a user
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(req.body.password, salt);

//     const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
//     const values = [req.body.username, req.body.email, hashedPassword];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.json(err);
//       console.log("User has been created.");
//       return res.status(200).json("User has been created.");
//     });
//   });
// };
// LOGIN
export const login = (req, res) => {
  // Check existing user
  console.log(req.body);
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not exist.");
    if (data.length === 1) {
      const isPasswordRight = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!isPasswordRight) {
        return res.status(400).json("Password is not correct");
      }

      const token = jwt.sign({ id: data[0].id }, "jwtkey"); // Can be stored in env
      const { password, ...other } = data[0];
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    }
  });
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
