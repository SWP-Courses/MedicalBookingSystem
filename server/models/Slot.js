const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    time: {
      type: Number,
      required: true,
      unique:true,
      min:8,
      max:17
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Slot", SlotSchema);
