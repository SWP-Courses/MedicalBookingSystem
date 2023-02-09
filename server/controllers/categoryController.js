const asyncHandler = require("express-async-handler");
const Category = require("../models/category");

//@desc Get all category
//@route GET /api/category
//@access private
const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.find();
  res.status(200).json({ category });
});

//@desc Get category
//@route GET /api/category/:id
//@access private
const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("category Not Found!");
  }
  res.status(200).json({ category });
});

//@desc Create category
//@route POST /api/category
//@access private
const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("All field not be empty!");
  }

  const category = await Category.create({
    name,
  });

  res.status(200).json({ category });
});

//@desc Update category
//@route PUT /api/category/:id
//@access private
const updateCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("category Not Found!");
  }

  const { name } = req.body;
  const updateCategory = await Category.findByIdAndUpdate(categoryId, {
    name,
  });

  res.status(200).json({ updateCategory });
});

//@desc Delete category
//@route delete /api/category/:id
//@access private
const deleteCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;
  const deleteCategory = await Category.findById(categoryId);
  if (!deleteCategory) {
    res.status(404);
    throw new Error("category Not Found!");
  }
  await Category.deleteOne({ _id: categoryId });
  res.status(200).json({ deleteCategory });
});

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
