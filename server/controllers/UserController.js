const User = require('../models/UserModel')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        const userData = req.body
        
        await bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(userData.password, salt))
          .then(hash => {
            userData.password = hash
          })

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
