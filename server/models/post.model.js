const mongoose = require('mongoose');
const { Schema } = mongoose;
const { reactSchema } = require('./react.model')
const { commentSchema } = require('./comment.model')

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
