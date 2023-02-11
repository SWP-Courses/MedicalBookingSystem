const UserModel = require("../models/User");
var SpecialistModel = require("../models/Specialist");

// PUT /api/users/:id
// Update a user by id (customer, doctor)
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
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
    const doctor = await UserModel.findOne({_id: req.params.id, role_code: "R2"}, "_id fullname degree profile avatar specialist_id");
    if (!doctor) return res.status(404).send("Doctor not found!");
    const specialist = await SpecialistModel.findById(doctor._doc.specialist_id);
    res.status(200).json({ ...doctor._doc, specialist: specialist.title });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET /api/users/doctors
// Get all doctors info for page
const getDoctors = async (req, res, next) => {
  const user_code = "R2";
  try {
    const users= await UserModel.aggregate([
      {
        $match: {
          "role_code":"R2"
        }
      }
    ])
    if (users.length === 0) return res.status(404).send("Empty doctors!");
    // console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getDoctorById, getDoctors, updateUser };
