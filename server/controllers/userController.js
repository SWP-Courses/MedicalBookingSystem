const UserModel = require("../models/User");
var SpecialistModel = require("../models/Specialist");
const { deleteImageById } = require("./imageController");

// PUT /api/users/:id
// Update a user by id (customer, doctor)
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // if (!doctor) return res.status(404).send("Doctor not found!");
    // const specialist = await SpecialistModel.findById(doctor._doc.specialist_id);
    res.status(200).json(updatedUser);
  } catch (err) {
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
    console.log(user);
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
