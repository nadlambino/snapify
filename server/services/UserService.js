const User = require('./../models/UserModel')
const EncryptionService = require('./EncryptionService')

const createUser = async (data) => {
  try {
    data.password = await EncryptionService.hash(data.password)
    const user = await User.create(data)

    return user
  } catch (error) {
      throw new Error('Failed to create a user')
  }
}

module.exports = {
  createUser
}