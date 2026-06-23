import jwt from "jsonwebtoken"
import User from "../models/User.js"
import asyncHandler from "express-async-handler"

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123")
    req.user = await User.findById(decoded.id).select("-password")
    if (!req.user) return res.status(401).json({ message: "User not found" })
    next()
  } else {
    res.status(401).json({ message: "No token, not authorized" })
  }
})

export default protect
