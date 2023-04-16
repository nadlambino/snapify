const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const multiple = (max) => upload.array('files', max)

module.exports = {
  multiple
}