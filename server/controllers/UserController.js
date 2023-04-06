const User = require('../models/UserModel')
const { hash } = require('../services/EncryptionService')

const createUser = async (req, res) => {
    try {
        const userData = req.body
        userData.password = await hash(userData.password)
        const user = await User.create(userData)

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: `Failed to create an account.`})
        console.log(error)
    }
}

module.exports = {
  createUser
}
