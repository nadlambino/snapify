const User = require('../models/UserModel')
const EncryptionService =  require('../services/EncryptionService')
const AuthService = require('./../services/AuthService')
const UserService = require('./../services/UserService')
const { retrievables } = require('../constants/userConstants')

const signIn = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email}).exec()
    
    if (!user) {
      return res.status(404).json({error: 'Incorrect credentials'})
    }
  
    const isValid = await EncryptionService.verify(password, user.password)
  
    if (!isValid) {
      return res.status(404).json({error: 'Incorrect credentials'})
    }

    const token = await AuthService.authorize({email: user.email})

    if (!token) {
      throw new Error('Authentication failed')
    }

    return res.status(200).json({user: global._.pick(user, retrievables), token})
  } catch (error) {
    res.status(400).json({error: 'Authentication failed'})
  }
}

const signUp = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body, true)

    let token = await AuthService.authorize({email: user.email})

    if (!token) {
      await User.deleteOne({_id: user._id})
      throw new Error('Authentication failed')
    }

    return res.status(200).json({user: global._.pick(user, retrievables), token})
  } catch (error) {
    res.status(400).json({error: 'Sign up failed'})
  }
}

module.exports = {
  signIn,
  signUp
}