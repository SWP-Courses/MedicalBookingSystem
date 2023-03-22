const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence");

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
    payCode: { type: Number, unique: true },
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
    // payCode: { type: Number, unique: true }
  },

  { versionKey: false }
);

BookedServiceSchema.plugin(AutoIncrement(mongoose), {
  inc_field: "payCode",
  start_seq: 1,
});

module.exports = mongoose.model("BookedService", BookedServiceSchema);
