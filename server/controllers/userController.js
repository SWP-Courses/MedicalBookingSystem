const UserModel = require("../models/User");
var SpecialistModel = require("../models/Specialist");
var RoleModel = require('../models/Role');
const { deleteImageById } = require("./imageController");

// PUT /api/users/:id
// Update a user by id (customer, doctor)
const updateUser = async (req, res, next) => {
  try {
    const avatar = req.file && req.file;
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json("User not found!");
    if (avatar) await deleteImageById(user.avatar.id);
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
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, document, { new: true });
    const userRole = await RoleModel.findOne({ role_code: updatedUser.role_code });
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
    const doctor = await UserModel.findOne({ _id: req.params.id, role_code: "R2" }, "_id fullname degree profile avatar specialist_id");
    if (!doctor) return res.status(404).send("Doctor not found!");
    const specialist = await SpecialistModel.findById(doctor._doc.specialist_id);
    res.status(200).json({ ...doctor._doc, specialist: specialist.title });
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
}

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
}



module.exports = { getDoctorById, getDoctors, deleteDoctorAccount, updateUser };
