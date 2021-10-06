const ObjectId = require('mongodb').ObjectId;

const getPosts = async (req, res) => {
  const posts = await req.db.Posts.find({}).toArray();
  res.json({posts});
};

const getPostById = async (req, res) => {
  const {id} = req.params;
  const post = await req.db.Posts.findOne({_id: new ObjectId(id)});
  if (!post) {
    return res
        .status(400)
        .json({status: `failure, no post with id '${id}' found!`});
  }
  res.json({post, status: 'success'});
};

const addPost = async (req, res) => {
  const {topic, text} = req.body;
  const newPost = {
    topic,
    text,
  };
  await req.db.Posts.insert(newPost);
  res.json({status: 'success'});
};

const changePost = async (req, res) => {
  const {topic, text} = req.body;

  await req.db.Posts.updateOne(
      {_id: new ObjectId(req.params.id)},
      {$set: {topic, text}},
  );
  res.json({status: 'success'});
};

const deletePost = async (req, res) => {
  await req.db.Posts.deleteOne({_id: new ObjectId(req.params.id)});
  res.json({status: 'success'});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
};
