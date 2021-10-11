const {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
} = require("../services/postService");

const getPostsController = async (req, res) => {
  const { _id } = req.user;
  const posts = await getPosts(_id);
  res.json({ posts });
};

const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  const post = await getPostById(id);
  res.json({ post, status: "success" });
};

const addPostController = async (req, res) => {
  const { topic, text } = req.body;
  const { _id } = req.user;
  await addPost(
    {
      topic,
      text,
    },
    _id
  );

  res.json({ status: "success" });
};

const changePostController = async (req, res) => {
  const { id } = req.params;
  const { topic, text } = req.body;
  await changePostById(id, { topic, text });
  res.json({ status: "success" });
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  await deletePostById(id);
  res.json({ status: "success" });
};

module.exports = {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
};
