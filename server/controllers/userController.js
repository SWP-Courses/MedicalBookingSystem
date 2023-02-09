const UserModel = require("../models/User");
var SpecialistModel = require("../models/Specialist");

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

module.exports = { getUserById };
