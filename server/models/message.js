const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender_id: {
        type: String,
    },
    recipient_id: {
        type: String,
    },
    message: {
        type: String,
    },
    converstation_id: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

})

const message = mongoose.model("message", messageSchema);
module.exports = message