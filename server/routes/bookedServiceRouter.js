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
  getHistoryByUserId,
  replaceServicesListInBooked,
} = require("../controllers/bookedServiceController");
const bookedServicesRouter = express.Router();

bookedServicesRouter.use(bodyParser.json());
bookedServicesRouter.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "json/plain");
  next();
});

bookedServicesRouter.route("/").post(bookService).get(getAllBookedService);

bookedServicesRouter.route("/history/:userId").get(getHistoryByUserId);

bookedServicesRouter.route("/:id/:serviceId").put(updateAddedService);

// customer và doctor cùng tìm theo user_id
// doctor search ra customer rồi mới fetch lịch sử
// router.route('/history/:userId', getBookedsByUserId)

bookedServicesRouter.route("/doctors/:id").get(getBookedByDoctor);

bookedServicesRouter.route("/users/:id").get(getIncomingBookedByUser);

bookedServicesRouter.route("/payment/:id").patch(paymentBookedServices);

bookedServicesRouter
  .route("/:id")
  .get(getBookedServiceById)
  .put(replaceServicesListInBooked)
  .patch(completeBooked)
  .delete(cancelBookedService);



module.exports = bookedServicesRouter;
