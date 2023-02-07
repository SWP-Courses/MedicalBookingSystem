import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  role_code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Role", RoleSchema);
