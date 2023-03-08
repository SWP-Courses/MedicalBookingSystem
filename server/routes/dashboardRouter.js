var express = require("express");
const { getAnalyticsOfSystem } = require("../controllers/dashboardController");
var dashBoardRouter = express.Router();

dashBoardRouter.get("/count", getAnalyticsOfSystem);

module.exports = dashBoardRouter;