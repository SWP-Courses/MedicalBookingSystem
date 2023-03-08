var express = require("express");
var roomRouter = express.Router();
const { createRoom, getEmptyRoom } = require("../controllers/roomController.js");

roomRouter.post("/", createRoom);
roomRouter.get("/:id", getEmptyRoom);

module.exports = roomRouter; 
