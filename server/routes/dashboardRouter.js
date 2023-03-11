var express = require("express");
const { getAnalyticsOfSystem, serviceAnalysis } = require("../controllers/dashboardController");
var dashBoardRouter = express.Router();

dashBoardRouter.get("/count", getAnalyticsOfSystem);
dashBoardRouter.get("/service", serviceAnalysis);

module.exports = dashBoardRouter;