var express = require("express");
const { sendMessageService, getConversation, getMessageByConversation, getConversationHaveNewMessage, changeConversationStatus } = require("../controllers/chatContainer");
var chatRouter = express.Router();

chatRouter.post("/", sendMessageService);
chatRouter.get("/conversation", getConversation);
chatRouter.post("/all", getMessageByConversation);
chatRouter.get("/new-message", getConversationHaveNewMessage);
chatRouter.post("/status", changeConversationStatus);

module.exports = chatRouter;