const express = require("express");

const {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} = require("../controllers/postControllers.js");
const { authGuard, adminGuard } = require("../middlewares/authMiddleware.js");

const router = express.Router();
router.route("/").post(authGuard, adminGuard, createPost).get(getAllPosts);
router
  .route("/:slug")
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

  module.exports = router;
