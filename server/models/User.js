const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: Object,
      default: {
        filename: "defaultAvatar.jpg",
      }
    },
    address: {
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
      required: false,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      // required: true, //login by google not need
    },
    nationalId: {
      type: String,
    },
    role_code: {
      type: String,
      required: true,
      default: "R3",
    },
    specialist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialist",
    },
    service_id:{
      type: mongoose.Schema.Types.ObjectId,
    },
    degree: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", UserSchema);
