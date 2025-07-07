import jwt from 'jsonwebtoken'
import User from '../models/user-models.js'

const userMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")

  if (!token) {
    return res.status(401).json({ message: "Unauthorized user: Token not provided" })
  }

  const jwtToken = token.replace("Bearer", "").trim()

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET)

    const userData = await User.findOne({ email: isVerified.email }).select({password: 0})

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized: User not found" })
    }
    
    req.user = userData // Attach user info to request 
    next()
  } catch (err) {
    console.error("JWT verification error:", err.message)
    res.status(401).json({ message: "Unauthorized: Invalid token" })
  }
}

export default userMiddleware
