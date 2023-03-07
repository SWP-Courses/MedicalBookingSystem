const mongoose = require("mongoose");

const SavedBlogSchema = new mongoose.Schema({
  blog_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
}, {
  versionKey: false
}
);

module.exports = mongoose.model("SavedBlog", SavedBlogSchema);
