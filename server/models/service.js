const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 255,
    required: [true, "Please add the name service"],
  },
  price: {
    type: Number,
    required: [true, "Please add the price service"],
  },
  description: {
    type: String,
    required: [true, "Please add the description service"],
  },
  specialist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialist",
  }
}, {versionKey: false});

module.exports = mongoose.model('Service', serviceSchema);