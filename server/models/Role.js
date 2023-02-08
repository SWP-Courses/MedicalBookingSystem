const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  role_code: {
    type: String,
    required: true,
    default: "r3",
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Role", RoleSchema);
