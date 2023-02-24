const express = require("express");
const bodyParser = require("body-parser");
const { bookService, addExtraService, getBookedByDoctor, getBookedByUser, updateAddedService } = require("../controllers/bookedServiceController");
const router = express.Router();

router.use(bodyParser.json());

router
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .post(bookService)

router
  .route("/:id/:serviceId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .put(updateAddedService)

router
  .route("/:id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .put(addExtraService)

router
  .route("/doctors/:id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getBookedByDoctor)

router
  .route("/users/:id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getBookedByUser)

module.exports = router;
