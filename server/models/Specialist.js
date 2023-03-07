const mongoose = require("mongoose");

const SpecialistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    images:[Object]
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Specialist", SpecialistSchema);
