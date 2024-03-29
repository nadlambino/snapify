const { isValidObjectId, default: mongoose } = require('mongoose');
const {
  COMMENT_PER_REQUEST,
  POST_PER_REQUEST,
  ENGAGEMENT_WEIGHT,
  RECENCY_WEIGHT,
  MILLISECONDS_IN_HOUR,
  removePostWithoutMedia,
} = require('../services/post.service');
const Post = require('./../models/post.model');

const createPost = async (req, res) => {
  try {
    const { _id: user } = req.auth;
    const media = req.files.map((file) => {
      return {
        src: file.path,
        category: file.mimetype.includes('image') ? 'image' : 'video',
      };
    });

    const post = await Post.create({ ...req.body, user, media });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a post' });
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const { _id: user } = req.auth;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (post && user === post.user.toString()) {
      await Post.findByIdAndDelete(postId);
      res.status(200).json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ error: 'No post found' });
    }
  } catch (error) {
    res.status(404).json({ error: 'No post found' });
    console.log(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const lastPostId = req.query.q;
    let limit = req.query.limit || POST_PER_REQUEST;
    limit = limit > POST_PER_REQUEST ? POST_PER_REQUEST : limit;

    const pipeline = [
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.user',
          foreignField: '_id',
          as: 'commentOwner',
        },
      },
      {
        $project: {
          content: 1,
          comments: { $slice: ['$comments', COMMENT_PER_REQUEST] },
          comments: {
            $map: {
              input: '$comments',
              as: 'comment',
              in: {
                _id: '$$comment._id',
                content: '$$comment.content',
                user: {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: '$commentOwner',
                        as: 'user',
                        in: {
                          _id: '$$user._id',
                          firstName: '$$user.firstName',
                          lastName: '$$user.lastName',
                          email: '$$user.email',
                        },
                      },
                    },
                    0,
                  ],
                },
                reacts: '$$comment.reacts',
                createdAt: '$$comment.createdAt',
                updatedAt: '$$comment.updatedAt',
                deletedAt: '$$comment.deletedAt',
              },
            },
          },
          reacts: 1,
          media: 1,
          user: {
            $arrayElemAt: [
              {
                $map: {
                  input: '$user',
                  as: 'u',
                  in: {
                    _id: '$$u._id',
                    firstName: '$$u.firstName',
                    lastName: '$$u.lastName',
                    email: '$$u.email',
                  },
                },
              },
              0,
            ],
          },
          commentsCount: { $size: '$comments' },
          reactsCount: { $size: '$reacts' },
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
      {
        $addFields: {
          engagement: {
            $add: ['$commentsCount', '$reactsCount'],
          },
        },
      },
      {
        $addFields: {
          recency: {
            $divide: [
              { $subtract: [new Date(), '$createdAt'] },
              MILLISECONDS_IN_HOUR,
            ],
          },
        },
      },
      {
        $addFields: {
          totalScore: {
            $add: [
              { $multiply: ['$engagement', ENGAGEMENT_WEIGHT] },
              { $multiply: ['$recency', -RECENCY_WEIGHT] },
            ],
          },
        },
      },
      {
        $sort: {
          totalScore: -1,
          recency: -1,
          engagement: -1,
          commentsCount: -1,
          reactsCount: -1,
          createdAt: -1,
        },
      },
      { $limit: parseInt(limit, 10) },
    ];

    if (lastPostId && isValidObjectId(lastPostId)) {
      pipeline.unshift({
        $match: {
          _id: { $lt: new mongoose.Types.ObjectId(lastPostId) },
        },
      });
    }

    const posts = await Post.aggregate(pipeline);

    res.status(200).json(removePostWithoutMedia(posts));
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve posts' });
    console.log(error);
  }
};

const commentPost = async (req, res) => {
  try {
    const { _id: user } = req.auth;
    const post = await Post.findById(req.params.id);

    post.comments.push({ ...req.body, user });
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

const reactPost = async (req, res) => {
  try {
    const { _id: user } = req.auth;
    const post = await Post.findById(req.params.id);
    const index = post.reacts.findIndex(
      (react) => react.user.toString() === user
    );

    if (index === -1) {
      post.reacts.push({ user });
    } else {
      const reacts = post.reacts.filter(
        (react) => react.user.toString() !== user
      );
      post.reacts = reacts;
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  commentPost,
  reactPost,
  deletePost,
};
