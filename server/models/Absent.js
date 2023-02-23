const mongoose = require("mongoose");

const AbsentSchema = new mongoose.Schema(
  {
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Absent", AbsentSchema);
