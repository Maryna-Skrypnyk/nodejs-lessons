const express = require("express");
const router = express.Router();

const {
  addPostValidation,
  patchPostValidation,
} = require("../middlewares/validationMiddleware");

let posts = [
  { id: "1", topic: "test1", text: "text1" },
  { id: "2", topic: "test2", text: "text2" },
  { id: "3", topic: "test3", text: "text3" },
];

// GET /api/posts -> [...posts]
router.get("/", (req, res) => {
  res.json({ posts, status: "success" });
});

// GET /api/posts/<123> -> {post with id 123}
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const [post] = posts.filter((el) => el.id === id);
  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no post with id '${id}' found!` });
  }
  res.json({ post, status: "success" });
});

// POST /api/posts -> [newPost, ...posts]
router.post("/", addPostValidation, (req, res) => {
  const { topic, text } = req.body;
  const newPost = {
    id: new Date().getTime().toString(),
    topic,
    text,
  };
  posts.push(newPost);
  res.json({ status: "success" });
});

// PUT /api/posts/123 -> [changePost, ...posts]
router.put("/:id", addPostValidation, (req, res) => {
  const { topic, text } = req.body;
  posts.forEach((post) => {
    if (req.params.id === post.id) {
      post.topic = topic;
      post.text = text;
    }
  });
  res.json({ status: "success" });
});

// PATCH /api/posts/123 -> [changePost, ...posts]
router.patch("/:id", patchPostValidation, (req, res) => {
  const { topic, text } = req.body;
  posts.forEach((post) => {
    if (post.id === req.params.id) {
      if (topic) {
        post.topic = topic;
      }
      if (text) {
        post.text = text;
      }
    }
  });
  res.json({ status: "success" });
});

// DELETE /api/posts/123 -> [posts]
router.delete("/:id", (req, res) => {
  posts = posts.filter((el) => el.id !== req.params.id);
  res.json({ status: "success" });
});

module.exports = { postsRouter: router };
