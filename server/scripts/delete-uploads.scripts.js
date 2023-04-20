require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs');
const Post = require('./../models/post.model')

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

deleteFolderRecursive('public/uploads');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      Post.deleteMany().then(() => {
        console.log('Posts deleted')
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        mongoose.disconnect();
      })
    })
    .catch(error => {
        console.log(`Error: `, error)
    })
