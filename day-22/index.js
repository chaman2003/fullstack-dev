import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "./models/User.js"
import Note from "./models/Note.js"
import protect from "./middleware/auth.js"

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:123@learning.hifnbqi.mongodb.net/notes-app?retryWrites=true&w=majority&appName=learning")
  .then(() => console.log("MongoDB connected"))

// ============ AUTH ROUTES ============

app.post("/api/auth/register", asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  const exists = await User.findOne({ $or: [{ email }, { username }] })
  if (exists) return res.status(400).json({ message: "User already exists" })

  const user = await User.create({ username, email, password })
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123", { expiresIn: "7d" })

  res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } })
}))

app.post("/api/auth/login", asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123", { expiresIn: "7d" })
  res.json({ token, user: { id: user._id, username: user.username, email: user.email } })
}))

// ============ NOTES ROUTES (protected) ============

app.get("/api/notes", protect, asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort("-createdAt")
  res.json(notes)
}))

app.post("/api/notes", protect, asyncHandler(async (req, res) => {
  const { title, content } = req.body
  if (!title || !content) return res.status(400).json({ message: "Title and content required" })
  const note = await Note.create({ title, content, user: req.user._id })
  res.status(201).json(note)
}))

app.put("/api/notes/:id", protect, asyncHandler(async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true, runValidators: true }
  )
  if (!note) return res.status(404).json({ message: "Note not found" })
  res.json(note)
}))

app.delete("/api/notes/:id", protect, asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id })
  if (!note) return res.status(404).json({ message: "Note not found" })
  res.json({ message: "Note deleted" })
}))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
