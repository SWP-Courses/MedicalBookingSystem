import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    // unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
  },
  nationalId: {
    type: String,
  },
  role_code: {
    type: String,
    required: true,
    default: 3,
  },
  spe_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default mongoose.model("User", UserSchema);
