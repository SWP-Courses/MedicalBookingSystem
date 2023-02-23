const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    slot_number: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      maxLength: 255,
      required: [true, "Please add the slot time"],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Slot", SlotSchema);
