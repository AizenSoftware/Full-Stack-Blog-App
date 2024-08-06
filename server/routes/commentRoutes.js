const express = require("express");

const {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
  checkComment,
  checkCommentById,
} = require("../controllers/commentControllers.js");
const { adminGuard, authGuard } = require("../middlewares/authMiddleware.js");

const router = express.Router();
router
  .route("/")
  .post(authGuard, createComment) //http:local:/api/comments post 
  .get(authGuard, adminGuard, getAllComments);
router
  .route("/:commentId")
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);
//router.route("/check-comment/:id").get(checkCommentById);
module.exports = router;
