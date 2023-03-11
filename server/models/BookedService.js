const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookedServiceSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: Date,
    slot_time: Number,
    // room: String,
    services: [
      {
        service_id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        price: Number,
        quantity: Number,
      },
    ],
    isPaid: {
      type: Boolean,
      default: false,
    },
    total_price: Number,
    drugbill_id: Schema.Types.ObjectId,
  },

  { versionKey: false }
);

module.exports = mongoose.model("BookedService", BookedServiceSchema);
