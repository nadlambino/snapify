const Post = require('./../models/post.model')
const CircularJSON = require('circular-json')

const createPost = async (req, res) => {
  try {
    const { _id: user } = req.auth
    const post = await Post.create({...req.body, user})

    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({error: 'Failed to create a post'})
    console.log(error)
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
        {
          $project: {
            content: 1,
            comments: 1,
            reacts: 1,
            commentsCount: {$size: '$comments'},
            reactsCount: {$size: '$reacts'}
          }
        },
        {
          $sort: { reactsCount: -1, commentsCount: -1 },
        }
      ])

    res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({error: 'Failed to retrieve posts'})
    console.log(error)
  }
}

const commentPost = async (req, res) => {
  try {
    const { _id: user } = req.auth
    const post = await Post.findById(req.params.id)
    
    post.comments.push({...req.body, user})
    await post.save();

    res.status(200).json(post)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createPost,
  getPosts,
  commentPost
}