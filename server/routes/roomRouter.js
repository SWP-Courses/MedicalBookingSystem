var express = require("express");
const roomRouter = express.Router();
const { createRoom, getEmptyRoom } = require("../controllers/roomController.js");

roomRouter.post("/", createRoom);
roomRouter.get("/:id", getEmptyRoom);

module.exports = roomRouter;
