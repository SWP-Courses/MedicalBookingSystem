var SpecialistModel = require("../models/Specialist");
var UserModel = require("../models/User");
const { deleteImageById } = require("./imageController");

// GET /api/specialists/
// Get all specialists
const getAllSpecialists = async (req, res) => {
  console.log(req.cookies.access_token);
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

const addSpecialist = async (req, res) => {
  try {
    const images = req.files;

    const newSpe = new SpecialistModel({ title: req.body.title, images });

    console.log(newSpe);
    let specialist = await newSpe.save();
    res.status(200).json(newSpe);
  } catch (err) {
    console.log(err);
    for (const image of req.files) await deleteImageById(image.id);
    res.status(500).json(err);
  }
};

module.exports = { getAllSpecialists, getSingleSpecialist, addSpecialist };
