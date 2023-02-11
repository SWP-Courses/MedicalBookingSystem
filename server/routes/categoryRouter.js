const express = require("express");
const bodyParser = require("body-parser");
const categoryRouter = express.Router();
const {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

categoryRouter.use(bodyParser.json());

categoryRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getCategory)
  .post(createCategory);

  categoryRouter
  .route("/:id")
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "json/plain");
  //   next();
  // })
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = categoryRouter;
