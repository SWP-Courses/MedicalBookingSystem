const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const BookedServiceSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: Date,
    slot_time: String,
    // room: String,
    services: [{service_id: Schema.Types.ObjectId, quantity: Number}],
  },
  { versionKey: false }
);

module.exports = mongoose.model("BookedService", BookedServiceSchema);
