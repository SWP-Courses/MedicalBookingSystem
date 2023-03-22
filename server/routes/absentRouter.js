const express = require("express");
const bodyParser = require("body-parser");
const absentRouter = express.Router();
const { getAbsent, createAbsent } = require("../controllers/absentController");

absentRouter.use(bodyParser.json());
absentRouter.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "json/plain");
  next();
});

absentRouter.route("/").get(getAbsent);
absentRouter.route("/create").post(createAbsent);

module.exports = absentRouter;
