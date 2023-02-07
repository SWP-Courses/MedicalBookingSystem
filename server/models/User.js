const mongoose = require("mongoose");

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
});

export default mongoose.model("User", UserSchema);
