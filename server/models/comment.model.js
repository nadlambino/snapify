const mongoose = require('mongoose')
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 50
    },
    deletedAt: {
      type: Date,
      default: null
    }
  }, {
    timestamps: true,
    collection: 'posts'
});

module.exports = {
  Comment: mongoose.model('Comment', commentSchema),
  commentSchema
}
