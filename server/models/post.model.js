const mongoose = require('mongoose');
const { default: commentSchema } = require('./comment.model');
const { default: reactSchema } = require('./react.model');
const { Schema } = mongoose;

const postSchema = new Schema({
    content: {
      type: String,
      required: true,
      maxlength: 50
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reacts: [reactSchema],
    comments: [commentSchema],
    deletedAt: {
      type: Date,
      default: null
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema)
