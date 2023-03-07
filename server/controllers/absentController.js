const asyncHandler = require("express-async-handler");
const Absent = require("../models/Absent");

//@desc get all absent
//@route GET /api/absent
//@access public
const getAbsent = asyncHandler(async (req, res, next) => {
    const absents = await Absent.find();
    res.status(200).json({ absents });
})

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


