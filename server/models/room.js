const mongoose = require("mongoose");

const Room = new mongoose.Schema({
    room: {
        type: 'string',
    }
});

module.exports = mongoose.model("Room", Room);
