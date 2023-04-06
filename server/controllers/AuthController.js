const { verify } =  require('../services/EncryptionService')
const User = require('../models/UserModel')
const { retrievables } = require('../constants/userConstants')

const login = async (req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email}).exec()
  
  if (!user) {
    return res.status(404).json({error: 'Failed to authenticate'})
  }

  const isAuthorized = await verify(password, user.password)

  if (isAuthorized) {
    return res.status(200).json(global._.pick(user, retrievables))
  }

  res.status(404).json({error: 'Failed to authenticate'})
}

module.exports = {
  login
}