const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const {
  getService,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.use(bodyParser.json());

let serviceRouter = router.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "json/plain");
  next();
});

serviceRouter.route("/").get(getService).post(createService);

serviceRouter
  .route("/:id")
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);

module.exports = serviceRouter;
