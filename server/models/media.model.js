const mongoose = require('mongoose')
const { Schema } = mongoose;

const mediaSchema = new Schema({
  src: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  duration: {
    type: Number,
    default: 5
  }
}, {
  collection: 'posts'
});

module.exports = {
  Media: mongoose.model('Media', mediaSchema),
  mediaSchema
}
