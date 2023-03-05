const mongoose = require("mongoose");

const typeMedicineSchema = new mongoose.Schema({
  name: {
    type: String,
  },
}, {versionKey: false});

module.exports = mongoose.model('TypeMedicine', typeMedicineSchema);