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

const getExpiry = async (token) => {
  const decoded = await jwt.decode(token, { complete: true })
  
  if (decoded.payload.exp) {
    const expTimestamp = decoded.payload.exp
    return new Date(expTimestamp * 1000)
  } else {
    return null
  }
}

module.exports = {
  verify,
  authorize,
  getExpiry
}