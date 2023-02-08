const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog");

//@desc Get all blog
//@route GET /api/blog
//@access private
const getBlog = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({ blogs });
});

//@desc Get blog
//@route GET /api/blog/:id
//@access private
const getBlogById = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.findById(req.params.id);
  if (!blogs) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }
  res.status(200).json({ blogs });
});

//@desc Create blog
//@route POST /api/blog
//@access private
const createBlog = asyncHandler(async (req, res, next) => {
  const { author, title, createdAt, content, image, category } = req.body;

  if (!author || !title || !createdAt || !content || !image || !category) {
    res.status(400);
    throw new Error("All field not be empty!");
  }

  const blogs = await Blog.create({
    author,
    title,
    createdAt,
    content,
    image,
    category
  });

  res.status(200).json({ blogs });
});

//@desc Update blog
//@route PUT /api/blog/:id
//@access private
const updateBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  
  if (!blog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }

  const { author, title, createdAt, content, image, category } = req.body;
  const updateBlog = await Blog.findByIdAndUpdate(blogId, {
    author,
    title,
    createdAt,
    content,
    image,
    category
  });

  res.status(200).json({ updateBlog });
});

//@desc Delete blog
//@route delete /api/:id
//@access private
const deleteBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  const deleteBlog = await Blog.findById(blogId);
  if (!deleteBlog) {
    res.status(404);
    throw new Error("Blog Not Found!");
  }
  await Blog.deleteOne({ _id: blogId });
  res.status(200).json({ deleteBlog });
});

module.exports = {
  getBlog,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
