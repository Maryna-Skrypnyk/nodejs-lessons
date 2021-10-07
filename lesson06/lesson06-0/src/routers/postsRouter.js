const express = require('express');
const router = new express.Router();

const {addPostValidation} = require('../middlewares/validationMiddleware');

const {asyncWrapper} = require('../helpers/apiHelpers');

const {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
} = require('../controllers/postsController');

// GET /api/posts -> [...posts]
router.get('/', asyncWrapper(getPostsController));

// GET /api/posts/<123> -> {post with id 123}
router.get('/:id', asyncWrapper(getPostByIdController));

// POST /api/posts -> [newPost, ...posts]
router.post('/', addPostValidation, asyncWrapper(addPostController));

// PUT /api/posts/123 -> [changePost, ...posts]
router.put('/:id', addPostValidation, asyncWrapper(changePostController));

// DELETE /api/posts/123 -> [posts]
router.delete('/:id', asyncWrapper(deletePostController));

module.exports = {postsRouter: router};
