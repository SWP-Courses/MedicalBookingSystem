const mongoose = require("mongoose");

const DrugBillSchema = new mongoose.Schema(
  {
    disease: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    re_exam_date: {
      type: Date,
    },
    total_price: {
      type: Number,
      required: true,
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DrugBill", DrugBillSchema);
