const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    sender_id: {
        type: String,
    },
    recipient_id: {
        type: String,
    },
    newMessageClient: {
        type: Boolean,
        default: false
    },
    newMessageAdmin: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
    },
    fullname: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

});

module.exports = mongoose.model('conversation', conversationSchema);