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
  getHistoryByUserId,
} = require("../controllers/bookedServiceController");
const router = express.Router();

router.use(bodyParser.json());
router.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "json/plain");
  next();
});

router.route("/").post(bookService);

router.route("/:id/:serviceId").put(updateAddedService);

// customer và doctor cùng tìm theo user_id
// doctor search ra customer rồi mới fetch lịch sử
router.get('/history/:userId', getHistoryByUserId);

router.route("/doctors/:id").get(getBookedByDoctor);

router.route("/users/:id").get(getIncomingBookedByUser);

router
  .route("/:id")
  .put(addExtraService)
  .patch(completeBooked)
  .delete(cancelBookedService);

module.exports = router;
