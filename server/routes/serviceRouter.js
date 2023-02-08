const express = require("express");
const bodyParser = require("body-parser");
const serviceRouter = express.Router();
const {
    getService,
    getServiceById,
    createService,
    updateService,
    deleteService,
} = require("../controllers/serviceController");

serviceRouter.use(bodyParser.json());

serviceRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getService)
  .post(createService);

  serviceRouter
  .route("/:id")
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "json/plain");
  //   next();
  // })
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);

module.exports = serviceRouter;
