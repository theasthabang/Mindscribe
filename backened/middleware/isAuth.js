import jwt from "jsonwebtoken"
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    
    console.log("🔑 Token received:", token ? "YES" : "NO")
    console.log("🍪 Cookies:", req.cookies)
    console.log("📋 Auth header:", req.headers.authorization)

    if (!token) {
      return res.status(400).json({ message: "Token is not found" })
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!verifyToken) {
      return res.status(400).json({ message: "user doesn't have valid token" })
    }
    req.userId = verifyToken.userId
    next()
  } catch (error) {
    console.log("❌ isAuth error:", error.message)
    return res.status(500).json({ message: `is auth *9error ${error}` })
  }
}
export default isAuth
