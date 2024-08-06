const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const path = require("path");
const cors = require("cors");
const {
  errorResponserHandler,
  invalidPathHandler,
} = require("./middlewares/errorHandler.js");
// Routes
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");
const postCategoriesRoutes = require("./routes/postCategoriesRoutes.js");

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

// static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(invalidPathHandler);
app.use(errorResponserHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
