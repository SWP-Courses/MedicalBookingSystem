const conversationSchema = require("../models/conversation");
const newMessage = require("../models/message");

const sendMessageService = async (req, res) => {
    try {
        const { sender_id, recipient_id, message, fullname, email } = req.body;
        let converstation = await conversationSchema.findOne({
            $or: [
                { sender_id: sender_id, recipient_id: recipient_id },
                { sender_id: recipient_id, recipient_id: sender_id },
            ]
        });

        if (!converstation) {
            newConverstation_user1 = await conversationSchema({ sender_id, recipient_id, message, fullname, email });
            converstation_1 = await newConverstation_user1.save();
        }

        await conversationSchema.findOneAndUpdate({ sender_id, recipient_id }, { newMessageAdmin: true });
        await conversationSchema.findOneAndUpdate({ sender_id: recipient_id, recipient_id: sender_id }, { newMessageClient: true });

        const newMessSave = newMessage({ sender_id, recipient_id, message });
        const insert = await newMessSave.save();
        res.json({ status: true, insert })
    } catch (error) {
        console.log(error.message);
        throw error
    }
}

const getMessageByConversation = async (req, res) => {
    try {
        const { sender_id, recipient_id } = req.body;
        const message = await newMessage.find({
            $or: [
                { sender_id: sender_id, recipient_id: recipient_id },
                { sender_id: recipient_id, recipient_id: sender_id },
            ]
        });
        res.json({ status: true, message })
    } catch (error) {
        console.log(error);
    }
}


const getConversation = async (req, res) => {
    try {
        const result = await conversationSchema.find();
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
    }
}

const getConversationHaveNewMessage = async (req, res) => {
    try {
        const result = await conversationSchema.find({ newMessageAdmin: true }).select("sender_id");
        const resultFormat = result.map(item => item.sender_id);
        res.status(200).json(resultFormat);
    } catch (error) {
        console.log(error.message);
    }
}

const changeConversationStatus = async (req, res) => {
    try {
        const { sender_id, role } = await req.body;
        const result = role === 'admin' ? await conversationSchema.findOneAndUpdate({ sender_id }, { newMessageAdmin: false }) : await conversationSchema.findOneAndUpdate({ sender_id }, { newMessageClient: false })
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { sendMessageService, getConversation, getMessageByConversation, getConversationHaveNewMessage, changeConversationStatus }