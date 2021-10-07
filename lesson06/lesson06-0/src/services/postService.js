const {Post} = require('../db/postModel');
const {WrongParametersError} = require('../helpers/errors');

const getPosts = async () => {
  const posts = await Post.find({});
  return posts;
};

const getPostById = async (id) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new WrongParametersError(`failure, no post with id '${id}' found!`);
  }
  return post;
};

const addPost = async ({topic, text}) => {
  const post = await new Post({
    topic,
    text,
  });
  await post.save();
};

const changePostById = async (id, {topic, text}) => {
  await Post.findByIdAndUpdate(id, {$set: {topic, text}});
};

const deletePostById = async (id) => {
  await Post.findByIdAndRemove(id);
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePostById,
  deletePostById,
};
