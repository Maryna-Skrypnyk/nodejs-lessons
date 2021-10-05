const express = require("express");
const router = new express.Router();

const { addPostValidation } = require("../middlewares/validationMiddleware");

const { asyncWrapper } = require("../helpers/apiHelpers");

const modelsMiddleware = require("../middlewares/models");

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
} = require("../controllers/postsController");

router.use(modelsMiddleware);

// GET /api/posts -> [...posts]
router.get("/", asyncWrapper(getPosts));

// GET /api/posts/<123> -> {post with id 123}
router.get("/:id", asyncWrapper(getPostById));

// POST /api/posts -> [newPost, ...posts]
router.post("/", addPostValidation, asyncWrapper(addPost));

// PUT /api/posts/123 -> [changePost, ...posts]
router.put("/:id", addPostValidation, asyncWrapper(changePost));

// PATCH /api/posts/123 -> [changePost, ...posts]
// router.patch("/:id", patchPostValidation, patchPost);

// DELETE /api/posts/123 -> [posts]
router.delete("/:id", asyncWrapper(deletePost));

module.exports = { postsRouter: router };
