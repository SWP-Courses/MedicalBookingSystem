var SpecialistModel = require("../models/Specialist");
var UserModel = require("../models/User");

// GET /api/specialists/
// Get all specialists
const getAllSpecialists = async (req, res) => {
  try {
    const specialists = await SpecialistModel.find();
    res.status(200).json(specialists);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET /api/specialists/:specialistId
// Get single specialists by id, join with User
const getSingleSpecialist = async (req, res) => {
  const specialistId = req.params.id;
  try {
    const specialist = await SpecialistModel.findById(specialistId);
    let speDoctors = await UserModel.find(
      { specialist_id: specialistId },
      "_id fullname degree profile avatar"
    );

    const result = {
      ...specialist._doc,
      doctor_list: [...speDoctors],
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllSpecialists, getSingleSpecialist };
