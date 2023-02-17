const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      maxLength: 255
    },
    title: {
      type: String,
      maxLength: 255,
      required: [true, "Please add the title"],
    },
    createdAt: {
      type: String,
      required: [true, "Please add the created at"],
    },
    content: {
      type: String,
      required: [true, "Please add the content"],
    },
    image: {
      type: String,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subTitle: {
      type: String,
      
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Blog", blogSchema);
