const Post = require('./../models/post.model')

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body)

    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({error: 'Failed to create a post'})
    console.log(error)
  }
}

module.exports = {
  createPost
}