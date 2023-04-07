const AuthService = require('./../services/AuthService')

const unauthorizedRoutes = ['/signin', '/signup', '/users']

const authMiddleware = async (req, res, next) => {
  try {
    if (unauthorizedRoutes.includes(req.path)) {
      return next()
    }
  
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
  
    if (!token) {
      return res.status(401).json({error: 'Unauthorized'})
    }
  
    const decoded = await AuthService.verify(token);
    req.auth = decoded

    next()
  } catch (error) {
    res.status(401).json({error: 'Unauthorize'})
  }
}

module.exports = authMiddleware