const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: Object,
      default: {
        bucketName:"photos",
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
    },
    dateOfBirth: {
      type: String,
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
      sparse:true
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
    degree: {
      type: String,
    },
    profile: {
      type: String,
    },
    status:{
      type: Boolean,
      default:true
    }
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", UserSchema);
