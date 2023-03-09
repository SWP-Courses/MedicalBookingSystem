const express = require("express");
const bodyParser = require("body-parser");
const {
  bookService,
  addExtraService,
  getBookedByDoctor,
  getIncomingBookedByUser,
  updateAddedService,
  completeBooked,
  cancelBookedService,
  getAllBookedService,
  getBookedServiceById,
  paymentBookedServices,
} = require("../controllers/bookedServiceController");
const router = express.Router();

router.use(bodyParser.json());
router.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "json/plain");
  next();
});

router.route("/").post(bookService).get(getAllBookedService);

router.route("/:id/:serviceId").put(updateAddedService);

// customer và doctor cùng tìm theo user_id
// doctor search ra customer rồi mới fetch lịch sử
// router.route('/history/:userId', getBookedsByUserId)

router.route("/doctors/:id").get(getBookedByDoctor);

router.route("/users/:id").get(getIncomingBookedByUser);

router.route("/payment/:id").patch(paymentBookedServices);

router
  .route("/:id")
  .get(getBookedServiceById)
  .put(addExtraService)
  .patch(completeBooked)
  .delete(cancelBookedService);

module.exports = router;
