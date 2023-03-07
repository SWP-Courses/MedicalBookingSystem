const mongoose = require("mongoose");

const DrugBillSchema = new mongoose.Schema(
  {
    total_price:{
      type: Number,
    },
    disease: {
      type: String,
      required: true,
    },
    // room: {
    //   type: String,
    //   required: true,
    // },
    note: {
      type: String,
      required: true,
    },
    re_exam_date: Date,
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("DrugBill", DrugBillSchema);
