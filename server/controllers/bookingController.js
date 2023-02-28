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
  // console.log(viewDate);
  const absents = await Absent.find({
    date: {
      $gte: startOfDay(new Date(viewDate)),
      $lte: endOfDay(new Date(viewDate)),
    },
  });
  const doctors = await User.find({ role_code: "R2" }, "_id fullname");
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
  const viewDate = req.query.date;
  const fullSlotss = await Slot.find();
  const bookedSlots = await BookedService.find({
    doctor_id: req.params.doctorId,
    date: {
      $gte: startOfDay(new Date(viewDate)),
      $lte: endOfDay(new Date(viewDate)),
    },
  }).select("slot_time");

  const today = new Date();
  const fullSlots =
    today.getDate() === new Date(viewDate).getDate()
      ? fullSlotss?.filter((fslot) => {
          let keep = true;
          let slotNum = parseInt(fslot?.time.slice(0, 2));
          if (today.getHours() > slotNum) {
            keep = false;
          }
          return keep;
        })
      : fullSlotss;

  if (bookedSlots.length === 0) {
    return res.status(200).json(fullSlots);
  } else {
    const leftSlots = fullSlots.filter((fslot) => {
      let keep = true;
      bookedSlots?.forEach((bslot) => {
        if (bslot.slot_time === fslot.time) {
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
