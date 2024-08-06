const express = require("express");

const {
  createPostCategory,
  deletePostCategory,
  getAllPostCategories,
  updatePostCategory,
  getSingleCategory,
} = require("../controllers/postCategoriesController.js");
const { adminGuard, authGuard } = require("../middlewares/authMiddleware.js");

const router = express.Router();
router
  .route("/")
  .post(authGuard, adminGuard, createPostCategory)
  .get(getAllPostCategories);

router
  .route("/:postCategoryId")
  .get(getSingleCategory)
  .put(authGuard, adminGuard, updatePostCategory)
  .delete(authGuard, adminGuard, deletePostCategory);

  module.exports = router;
