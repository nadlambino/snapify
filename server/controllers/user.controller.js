const { retrievables } = require('../constants/user.constant')
const User = require('../models/user.model')
const UserService = require('../services/user.service')

const createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body)

        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: `Failed to create a user`})
        console.log(error)
    }
}

const getUsers = async (req, res) => {
  try {
    const filters = global._.pick(req.query, retrievables)
    const page = req.query?.page || 1
    const limit = 10
    const skip = (page * limit) - limit
    const users = await User.find({...filters}, retrievables.join(' '), {limit, skip}).exec()

    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({error: `Failed to get users`})
    console.log(error)
  }
}

module.exports = {
  createUser,
  getUsers
}
