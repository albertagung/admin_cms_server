const Post = require('../models/postModel.js')

// Find all post
const findAllPost = (req, res) => {
  Post.find().then((dataPost) => {
    res.status(200).send(dataPost)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Find post by id
const findPostById = (req, res) => {
  console.log(req.params.idPost);
  Post.find(
    {
      _id: req.params.idPost
    }
  ).then((dataPost) => {
    res.status(200).send(dataPost)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Insert New Post
const insertNewPost = (req, res) => {
  let newPost = Post(
    {
      title: req.body.title,
      content: req.body.content,
      sectionTitle: req.body.sectionTitle,
      section: req.body.section,
      sectionName: req.body.sectionName,
      createdAt: new Date(),
      author: req.body.author
    }
  )
  newPost.save().then((dataPost) => {
    res.status(200).send(dataPost)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Update post
const updatePost = (req, res) => {
  Post.findOneAndUpdate(
    {
      _id: req.params.idPost
    },
    {
      title: req.body.title,
      content: req.body.content,
      sectionTitle: req.body.sectionTitle,
      section: req.body.section,
      sectionName: req.body.sectionName,
      updatedAt: new Date()
    }
  ).then((dataPost) => {
    res.status(200).send(dataPost)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

// Delete post by id
const removePost = (req, res) => {
  Post.findOneAndRemove(
    {
      _id: req.params.idPost
    }
  ).then((dataPost) => {
    res.status(200).send(dataPost)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
}

module.exports = {
  findAllPost,
  findPostById,
  insertNewPost,
  updatePost,
  removePost
}
