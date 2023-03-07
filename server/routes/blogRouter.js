const express = require("express");
const bodyParser = require("body-parser");
const blogRouter = express.Router();
const {
  getBlog,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getAllSavedBlogs,
  saveBlog,
  unsaveBlog
} = require("../controllers/blogController");

blogRouter.use(bodyParser.json());

blogRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getBlog)
  .post(createBlog);

blogRouter
  .route("/:id")
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "json/plain");
  //   next();
  // })
  .get(getBlogById)
  .put(updateBlog)
  .delete(deleteBlog);

// Khoa ADD
blogRouter.get("/saved/:userId", getAllSavedBlogs);
blogRouter.post("/save/:blogId/:userId", saveBlog);
blogRouter.delete("/unsave/:blogId/:userId", unsaveBlog);

module.exports = blogRouter;
