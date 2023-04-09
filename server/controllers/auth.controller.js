const User = require('../models/user.model')
const EncryptionService =  require('../services/encryption.service')
const AuthService = require('../services/auth.service')
const UserService = require('../services/user.service')
const { retrievables } = require('../constants/user.constant')

const signIn = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email}).exec()
    
    if (!user) {
      return res.status(400).json({error: 'Incorrect credentials'})
    }
  
    const isValid = await EncryptionService.verify(password, user.password)
  
    if (!isValid) {
      return res.status(400).json({error: 'Incorrect credentials'})
    }

    const token = await AuthService.authorize({_id: user._id, email: user.email})

    if (!token) {
      throw new Error('Authentication failed')
    }

    const expiration = await AuthService.getExpiry(token)

    return res.status(200).json({user: global._.pick(user, retrievables), access: {token, expiration}})
  } catch (error) {
    res.status(400).json({error: 'Authentication failed'})
  }
}

const signUp = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body, true)

    let token = await AuthService.authorize({_id: user._id, email: user.email})

    if (!token) {
      await User.deleteOne({_id: user._id})
      throw new Error('Authentication failed')
    }

    const expiration = await AuthService.getExpiry(token)

    return res.status(200).json({user: global._.pick(user, retrievables), access: {token, expiration}})
  } catch (error) {
    res.status(400).json({error: 'Sign up failed'})
  }
}

module.exports = {
  signIn,
  signUp
}