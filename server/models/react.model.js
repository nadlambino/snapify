const mongoose = require('mongoose')
const { Schema } = mongoose;

const reactSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ["happy", "neutral", "sad", "angry", "heart eyes", "scared"]
    },
    deletedAt: {
      type: Date,
      default: null
    }
  }, {
    timestamps: true
});

export default reactSchema

module.exports = mongoose.model('Comment', reactSchema)
