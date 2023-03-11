const express = require("express");
const bodyParser = require("body-parser");
const typeMedicineRouter = express.Router();
const {
  getTypeMedicine,
  getTypeMedicineById,
  createTypeMedicine,
  updateTypeMedicine,
  deleteTypeMedicine,
} = require("../controllers/typeMedicineController");

typeMedicineRouter.use(bodyParser.json());

typeMedicineRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getTypeMedicine)
  .post(createTypeMedicine);

typeMedicineRouter
  .route("/:id")
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "json/plain");
  //   next();
  // })
  .get(getTypeMedicineById)
  .put(updateTypeMedicine)
  .delete(deleteTypeMedicine);

module.exports = typeMedicineRouter;
