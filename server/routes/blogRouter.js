const express = require("express");
const bodyParser = require("body-parser");
const blogRouter = express.Router();
const {
    getBlog,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
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

module.exports = blogRouter;
