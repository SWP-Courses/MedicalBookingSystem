const mongoose = require("mongoose");

const BillMedicineSchema = new mongoose.Schema({
  medicine_id: {
    type: String,
    required: true,
    ref: "Medicine",
  },
  drugbill_id: {
    type: String,
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
