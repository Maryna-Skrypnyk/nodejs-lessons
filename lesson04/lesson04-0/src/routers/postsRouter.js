const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require("../controllers/postsController");

const {
  addPostValidation,
  patchPostValidation,
} = require("../middlewares/validationMiddleware");

// GET /api/posts -> [...posts]
router.get("/", getPosts);

// GET /api/posts/<123> -> {post with id 123}
router.get("/:id", getPostById);

// POST /api/posts -> [newPost, ...posts]
router.post("/", addPostValidation, addPost);

// PUT /api/posts/123 -> [changePost, ...posts]
router.put("/:id", addPostValidation, changePost);

// PATCH /api/posts/123 -> [changePost, ...posts]
router.patch("/:id", patchPostValidation, patchPost);

// DELETE /api/posts/123 -> [posts]
router.delete("/:id", deletePost);

module.exports = { postsRouter: router };
