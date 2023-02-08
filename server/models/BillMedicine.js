import mongoose from "mongoose";

const BillMedicineSchema = new mongoose.Schema({
  medicine_id: {
    type: String,
    required: true,
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

export default mongoose.model("BillMedicine", BillMedicineSchema);
