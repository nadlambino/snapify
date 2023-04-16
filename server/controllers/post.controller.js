const Post = require('./../models/post.model')

const createPost = async (req, res) => {
  try {
    const { _id: user } = req.auth
    console.log(req.files)

    // const post = await Post.create({...req.body, user})

    // res.status(201).json(post)
  } catch (error) {
    res.status(400).json({error: 'Failed to create a post'})
    console.log(error)
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $project: {
            content: 1,
            comments: 1,
            reacts: 1,
            user: { $arrayElemAt: [{
              $map: {
                input: '$user',
                in: {
                  _id: '$$this._id',
                  firstName: '$$this.firstName',
                  lastName: '$$this.lastName',
                  email: '$$this.email'
                }
              }
            }, 0] },
            commentsCount: {$size: '$comments'},
            reactsCount: {$size: '$reacts'},
            createdAt: 1,
            updatedAt: 1,
            deletedAt: 1
          }
        },
        {
          $sort: {  createdAt: -1, commentsCount: -1, reactsCount: -1 },
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