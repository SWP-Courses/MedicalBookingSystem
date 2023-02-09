const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 255,
      required: [true, "Please add the category name"],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Category", categorySchema);
