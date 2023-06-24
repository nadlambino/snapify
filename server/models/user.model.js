const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)
