const UserModel = require("../models/User");
var SpecialistModel = require("../models/Specialist");
var RoleModel = require("../models/Role");
const { deleteImageById } = require("./imageController");

// Get users that done booked service
const getUsersCuredone = async (req, res, next) => {
  try {
    const wordContain = req.query.name;

    if (!wordContain)
      return res.status(400).json("Vui lòng điền tên người khám!");

    const users = await UserModel.find({
      fullname: { $regex: wordContain, $options: "i" },
      status: true, 
      role_code: "R3"
    }, {_id: 1, fullname: 1, email: 1}).populate("_id", "user_id");

    // const filterUsers = users.filter(user => {
      
    // });

    if (!users.length)
      return res.status(404).json("Không có tài khoản thích hợp đã khám");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// PUT /api/users/:id
// Update a user by id (customer, doctor)
const updateUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json("User not found!");

    const otherEmailUser = await UserModel.findOne({
      email: req.body.email,
      _id: { $ne: req.params.id },
    });
    if (otherEmailUser)
      return res.status(409).json("Email này đã được sử dụng!");

    const avatar = req.file && req.file;
    if (avatar) await deleteImageById(user.avatar.id);

    console.log(req.body);
    let document = {
      fullname: req.body.fullname,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      avatar: avatar,
      room_id: req.body?.room_id,
      degree: req.body?.degree,
    };
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      document,
      { new: true }
    );
    const userRole = await RoleModel.findOne({
      role_code: updatedUser.role_code,
    });
    const { password, role_code, ...filteredInfo } = updatedUser._doc;

    res.status(200).json({ ...filteredInfo, role: userRole.title });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// GET /api/users/doctors/:id
// Get a doctor info for page
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await UserModel.findOne(
      { _id: req.params.id, role_code: "R2" },
      "_id fullname degree profile avatar"
    );
    if (!doctor) return res.status(404).send("Doctor not found!");
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET /api/users/doctors
const getDoctors = async (req, res, next) => {
  try {
    const user = await UserModel.aggregate([
      {
        "$match": {
          "role_code": "R2",
          "status": true
        }
      },

    ])
    // console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteDoctorAccount = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const deleteDoctor = await UserModel.findOneAndUpdate({ _id: doctorId }, { status: false });
    if (!deleteDoctor) {
      res.status(404);
    }
    // await UserModel.deleteOne({ _id: doctorId });
    await deleteImageById(deleteDoctor.avatar.id);
    res.status(200).json({ deleteDoctor });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDoctorById,
  getDoctors,
  deleteDoctorAccount,
  updateUser,
  getUsersCuredone,
};
