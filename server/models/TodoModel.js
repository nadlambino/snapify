const mongoose = require('mongoose')
const { Schema } = mongoose;

const todoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
    }
  }, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema)