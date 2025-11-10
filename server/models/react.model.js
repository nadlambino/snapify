const mongoose = require('mongoose')
const { Schema } = mongoose;

const reactSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
  React: mongoose.model('React', reactSchema),
  reactSchema
}
