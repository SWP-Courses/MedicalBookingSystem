const express = require("express");
const bodyParser = require("body-parser");
const { getFreeDoctors, getFreeSlots } = require("../controllers/bookingController");
const router = express.Router();

router.use(bodyParser.json());

router
  .route("/doctors")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getFreeDoctors)

router
  .route("/slots/:doctorId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getFreeSlots)

module.exports = router;
