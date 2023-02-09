const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 255,
    required: [true, "Please add the medicine name"],
  },
  dosageForm: {
    type: String,
    required: [true, "Please add the medicine dosage form"],
  },
  type: {
    type: String,
    maxLength: 255,
    required: [true, "Please add the medicine type"],
  },
  price: {
    type: Number,
    required: [true, "Please add the medicine price"],
  },
}, {versionKey: false});

module.exports = mongoose.model('Medicine', medicineSchema);