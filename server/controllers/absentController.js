const asyncHandler = require("express-async-handler");
const Absent = require("../models/Absent");
const User = require("../models/User");

//@desc get all absent
//@route GET /api/absent
//@access public
const getAbsent = asyncHandler(async (req, res, next) => {
  const absents = await Absent.find();
  const result = await Promise.all(
    absents.map(async (obj) => {
      const doctor = await User.findById(obj.doctor_id);
      const doctor_name = doctor ? doctor.fullname : "";
      return {
        _id: obj._id,
        doctor_name,
        date: obj.date,
      };
    })
  );
  res.status(200).json(result); 
});

//@desc create absent
//@route POST /api/absent/create
//@access public
const createAbsent = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body.date);
    console.log(new Date(decodeURIComponent(req.body.date)));
    const absent = await Absent.create({
      doctor_id: req.body.id,
      // date: new Date(req.body.date + "T12:00:00"),
      date: new Date(decodeURIComponent(req.body.date)),
    });
    res.status(200).json(absent);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  createAbsent,
  getAbsent,
};
