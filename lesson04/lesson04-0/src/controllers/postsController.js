let posts = [
  { id: "1", topic: "test1", text: "text1" },
  { id: "2", topic: "test2", text: "text2" },
  { id: "3", topic: "test3", text: "text3" },
];

const getPosts = (req, res) => {
  res.json({ posts, status: "success" });
};

const getPostById = (req, res) => {
  const { id } = req.params;
  const [post] = posts.filter((el) => el.id === id);
  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no post with id '${id}' found!` });
  }
  res.json({ post, status: "success" });
};

const addPost = (req, res) => {
  const { topic, text } = req.body;
  const newPost = {
    id: new Date().getTime().toString(),
    topic,
    text,
  };
  posts.push(newPost);
  res.json({ status: "success" });
};

const changePost = (req, res) => {
  const { topic, text } = req.body;
  posts.forEach((post) => {
    if (req.params.id === post.id) {
      post.topic = topic;
      post.text = text;
    }
  });
  res.json({ status: "success" });
};

const patchPost = (req, res) => {
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
};

const deletePost = (req, res) => {
  posts = posts.filter((el) => el.id !== req.params.id);
  res.json({ status: "success" });
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
