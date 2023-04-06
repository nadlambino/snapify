const bcrypt = require('bcrypt')

const hash = async (password) => {
  return await bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => hash)
    .catch((error) => {
      console.log(error)
      return null
    })
}

const verify = async (password, hashed) => {
  return await bcrypt.compare(password, hashed)
    .then(result => result)
    .catch((error) => {
      console.log(error)
      return false
    })
}

module.exports = {
  hash,
  verify
}