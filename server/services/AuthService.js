const secret = process.env.JWT_SECRET
const expiration = process.env.JWT_EXPIRY
const jwt = require('jsonwebtoken')

const verify = async (token) => {
  return await jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      throw error
    }
  
    return decoded;
  })
}

const authorize = async (data) => {
  return await jwt.sign({...data}, secret, {expiresIn: expiration})
}

module.exports = {
  verify,
  authorize
}