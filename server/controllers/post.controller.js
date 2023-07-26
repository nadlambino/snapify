const {
  getMinRelevanceDate,
  RELEVANCE_POINTS,
  POPULARITY_MULTIPLIER,
  COMMENT_PER_REQUEST,
  POST_PER_REQUEST,
} = require('../services/post.service');
const Post = require('./../models/post.model');
const fs = require('fs');

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
    const relevanceDate = getMinRelevanceDate();

    const posts = await Post.aggregate([
      { $limit: POST_PER_REQUEST },
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
          popularity: {
            $add: ['$commentsCount', '$reactsCount'],
          },
        },
      },
      {
        $addFields: {
          relevance: {
            $cond: {
              if: { $gte: ['$createdAt', relevanceDate] },
              then: {
                $add: [
                  RELEVANCE_POINTS,
                  { $multiply: ['$popularity', POPULARITY_MULTIPLIER] },
                ],
              },
              else: '$popularity',
            },
          },
        },
      },
      {
        $addFields: {
          popularityAndRelevance: { $add: ['$popularity', '$relevance'] },
        },
      },
      {
        $sort: {
          popularityAndRelevance: -1,
          relevance: -1,
          popularity: -1,
          commentsCount: -1,
          reactsCount: -1,
          createdAt: -1,
        },
      },
      {
        $project: {
          popularityAndRelevance: 0,
          relevance: 0,
          popularity: 0,
        },
      },
    ]);

    let filteredPosts = posts.map((post) => {
      const { media } = post;

      let filteredMedia = media.map((data) => {
        return fs.existsSync(data.src) === true ? data : null;
      });

      filteredMedia = global._.filter(filteredMedia, (data) => data !== null);

      return {
        ...post,
        media: filteredMedia,
      };
    });

    filteredPosts = global._.filter(
      filteredPosts,
      (data) => data.media.length > 0
    );

    res.status(200).json(filteredPosts);
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
