const multer  = require('multer')
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { _id: user } = req.auth
    const dir = `public/uploads/${user}`
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const newName = `${Date.now()}${ext}`
    cb(null, newName);
  }
});

const upload = multer({ storage: storage });

const multiple = (max) => upload.array('files', max)

module.exports = {
  multiple
}