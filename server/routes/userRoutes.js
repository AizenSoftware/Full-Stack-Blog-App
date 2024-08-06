const express = require("express");
const cors = require("cors");
const { authGuard, adminGuard } = require("../middlewares/authMiddleware.js");
const {
  loginUser,
  registerUser,
  updateProfile,
  updateProfilePicture,
  userProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userControllers.js");

const router = express.Router();
router.use(cors());
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);
router.get("/", authGuard, adminGuard, getAllUsers);
router.delete("/:userId", authGuard, adminGuard, deleteUser);
module.exports = router;
