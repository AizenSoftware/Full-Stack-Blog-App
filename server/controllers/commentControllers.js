const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
const axios = require("axios");
//const checkComment = require("../utils/checkComment.js");

const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await Post.findOne({ slug: slug });

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    });

    const savedComment = await newComment.save();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        comment: savedComment.desc,
      });

      console.log(response.data); // Bu kısımda response'u görmeniz gerekiyor

      const isSpam = response.data.result === "spam";
      savedComment.desc = isSpam ? "spam!" : savedComment.desc;
      await savedComment.save();
      res.status(201).json({
        isSpam,
        savedComment,
      });
    } catch (error) {
      console.error("Spam kontrolü sırasında hata:", error.message);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { desc, check } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    comment.desc = desc || comment.desc;
    comment.check = typeof check !== "undefined" ? check : comment.check;

    const updatedComment = await comment.save();
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    await Comment.deleteMany({ parent: comment._id });

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    return res.json({
      message: "Comment is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.desc = { $regex: filter, $options: "i" };
    }
    let query = Comment.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Comment.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
        {
          path: "parent",
          populate: [
            {
              path: "user",
              select: ["avatar", "name"],
            },
          ],
        },
        {
          path: "replyOnUser",
          select: ["avatar", "name"],
        },
        {
          path: "post",
          select: ["slug", "title"],
        },
      ])
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
// const checkCommentById = async (req, res, next) => {
//   const comment = await Comment.findById(req.params.id);

//   if (!comment) {
//     return res.status(404).json({ message: "Comment not found" });
//   }

//   const isSpam = await checkComment(comment.desc);

//   return isSpam;
// };
module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  //checkCommentById,
};
