const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const Blog = require("../models/blog");
const SavedBlog = require("../models/SavedBlog");

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
  try {
    const { title, content, category_id, author, description } = req.body;

    if (!title || !content || !category_id) {
      res.status(400);
      throw new Error("All field not be empty!");
    }


    const blogs = await Blog.create({
      title,
      content,
      category_id,
      author,
      description
    });

    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
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

  const { author, title, content, category_id, description } = req.body;
  const blogs = await Blog.findByIdAndUpdate(blogId, {
    author,
    title,
    content,
    category_id,
    description
  }, { new: true });

  res.status(200).json({ blogs });
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

/* ----- Khoa ADD ------ */ 
/* User save or unsave a blog */
//@desc Save a blog
//@route POST /api/blogs/save/:blogId/:userId
//@access private
const saveBlog = asyncHandler(async (req, res, next) => {
  const newSavedBlog = new SavedBlog({
    blog_id: req.params.blogId,
    user_id: req.params.userId,
  });
  const dbSavedBlog = await newSavedBlog.save();
  res.status(200).json(dbSavedBlog);
});

//@desc Unsave a blog
//@route DELETE /api/blogs/unsave/:blogId/:userId
//@access private
const unsaveBlog = asyncHandler(async (req, res, next) => {
  const deletedPair = await SavedBlog.findOneAndDelete({
    blog_id: req.params.blogId,
    user_id: req.params.userId,
  });
  res.status(200).json("");
});

//@desc Get all savedblogs that a user saved.
//@route GET /api/blogs/saved/:userId
//@access private
const getAllSavedBlogs = asyncHandler(async (req, res, next) => {
  // const savedblogs = await SavedBlog.find({user_id: req.params.userId},"blog_id");
  const result = await SavedBlog.aggregate([
    {
      $match: {
        user_id: mongoose.Types.ObjectId(req.params.userId),
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "blog_id",
        foreignField: "_id",
        as: "blog",
      },
      
    },
    {
      $lookup: {
        from: "categories",
        localField: "blog.category_id",
        foreignField: "_id",
        as: "category",
      },
    }
  ]);
  // const user = result[0];
  res.status(200).json(result);
});

module.exports = {
  getBlog,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  saveBlog,
  unsaveBlog,
  getAllSavedBlogs,
};
