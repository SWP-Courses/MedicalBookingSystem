var SpecialistModel = require("../models/Specialist");

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
// Get single specialists by id
const getSingleSpecialist = async (req, res) => {
  const specialistId = req.params.specialistId;
  try {
    const specialist = await SpecialistModel.findOne({ _id: specialistId });
    res.status(200).json(specialist);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllSpecialists, getSingleSpecialist };
