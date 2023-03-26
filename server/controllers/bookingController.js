const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const { startOfDay, endOfDay } = require("date-fns");
const Absent = require("../models/Absent");
const User = require("../models/User");
const Slot = require("../models/Slot");
const BookedService = require("../models/BookedService");

//@desc Get all blog
//@route GET /api/blog
//@access private
const getFreeDoctors = asyncHandler(async (req, res, next) => {
  const viewDate = req.query.date;
  console.log(viewDate);
  const absents = await Absent.find({
    date: {
      $gte: startOfDay(new Date(viewDate)),
      $lte: endOfDay(new Date(viewDate)),
    },
  });
  const doctors = await User.find(
    { role_code: "R2", status: true },
    "_id fullname avatar"
  );
  // console.log(doctors);
  const freeDoctors = doctors.filter((doctor) => {
    let keep = true;
    absents.forEach((ab) => {
      if (ab.doctor_id.equals(doctor._id)) {
        keep = false;
      }
    });
    return keep;
  });
  res.status(200).json(freeDoctors);
});

//@desc Get blog
//@route GET /api/blog/:id
//@access private
const getFreeSlots = asyncHandler(async (req, res, next) => {
  // Remove time of view date
  const dateObj = new Date(req.query.date);
  const viewDate = dateObj.toISOString().slice(0, 10);

  const fullSlots = await Slot.find();
  const bookedSlots = await BookedService.find({
    doctor_id: req.params.doctorId,
    date: {
      $gte: startOfDay(new Date(viewDate)),
      $lte: endOfDay(new Date(viewDate)),
    },
  }).select("slot_time");

  const today = new Date();
  // console.log({ today: today.getDate(), view: new Date(viewDate).getDate() });
  const afterFilterTodaySlots =
    today.getDate() === new Date(viewDate).getDate()
      ? fullSlots?.filter((fslot) => {
          let keep = true;
          if (today.getHours() >= fslot.time) {
            keep = false;
          }
          return keep;
        })
      : fullSlots;

  // nếu chưa có ai book thì chỉ lọc qua cùng ngày (nếu có)
  if (bookedSlots.length === 0) {
    console.log(afterFilterTodaySlots);
    return res.status(200).json(afterFilterTodaySlots);
  } else {
    // có người book rồi thì lọc lại
    const leftSlots = afterFilterTodaySlots.filter((fslot) => {
      let keep = true;
      bookedSlots?.forEach((bslot) => {
        if (bslot.slot_time == fslot.time) {
          return (keep = false);
        }
      });
      return keep;
    });
    return res.status(200).json(leftSlots);
  }
});

module.exports = {
  getFreeDoctors,
  getFreeSlots,
};
