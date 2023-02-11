const express = require("express");
const bodyParser = require("body-parser");
const medicineRouter = express.Router();
const {
  getMedicine,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");

medicineRouter.use(bodyParser.json());

medicineRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getMedicine)
  .post(createMedicine);

medicineRouter
  .route("/:id")
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "json/plain");
  //   next();
  // })
  .get(getMedicineById)
  .put(updateMedicine)
  .delete(deleteMedicine);

module.exports = medicineRouter;
