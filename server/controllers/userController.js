const UserModel = require("../models/User");
var SpecialistModel = require("../models/Specialist");
const { deleteImageById } = require("./imageController");

// GET /api/users/:id
const getUserById = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).send("User not found!");
    const specialist = await SpecialistModel.findById(user._doc.specialist_id);
    res.status(200).json({ ...user._doc, specialist: specialist.title });
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
        }
      },
      {
        "$lookup": {
          "from": "specialists",
          "localField": "specialist_id",
          "foreignField": "_id",
          "as": "special"
        }
      },
      { "$unwind": '$special' },
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
    const deleteDoctor = await UserModel.findOneAndDelete({ _id: doctorId, role_code: "R2" });
    if (!deleteDoctor) {
      res.status(404);
    }
    console.log(deleteDoctor);
    await UserModel.deleteOne({ _id: doctorId });
    console.log(deleteDoctor);
    await deleteImageById(deleteDoctor.avatar.id);
    res.status(200).json({ deleteDoctor });
  } catch (error) {
    console.log(error);
  }
}



module.exports = { getUserById, getDoctors, deleteDoctorAccount };
