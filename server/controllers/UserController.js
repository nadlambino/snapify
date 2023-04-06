const User = require('../models/UserModel')
const { hash } = require('../services/EncryptionService')

const createUser = async (req, res) => {
    try {
        const userData = req.body
        userData.password = await hash(userData.password)
        const user = await User.create(userData)

        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: `Failed to create an account.`})
        console.log(error)
    }
}

const getUsers = async (req, res) => {
  try {
    const retrievables = ['_id', 'firstName', 'lastName', 'gender', 'email', 'createdAt', 'updatedAt', 'deletedAt']
    const filters = global._.pick(req.query, retrievables)
    const page = req.query?.page || 1
    const limit = 1
    const skip = (page * limit) - 1
    const users = await User.find({...filters}, retrievables.join(' '), {limit, skip}).exec()

    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({error: `Failed to get users.`})
    console.log(error)
  }
}

module.exports = {
  createUser,
  getUsers
}
