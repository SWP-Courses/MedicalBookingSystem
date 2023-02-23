const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillMedicineSchema = new mongoose.Schema({
  medicine_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  drugbill_id: {
    type: Schema.Types.ObjectId,
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
});

module.exports = mongoose.model("BillMedicine", BillMedicineSchema);
