const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillMedicineSchema = new mongoose.Schema(
  {
    medicine_id: {
      type: Schema.Types.ObjectId,
      ref:"Medicine",
      required: true,
    },
    drugbill_id: {
      type: Schema.Types.ObjectId,
      ref:"DrugBill",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    dose: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("BillMedicine", BillMedicineSchema);
