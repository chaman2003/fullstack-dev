import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./db.js"
import Note from "./models/Note.js"
import asyncHandler from "express-async-handler"

const app = express()
app.use(cors())
app.use(express.json())

await connectDB()

// GET all notes
app.get("/api/notes", asyncHandler(async (req, res) => {
  const notes = await Note.find().sort("-createdAt")
  res.json(notes)
}))

// GET single note
app.get("/api/notes/:id", asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (!note) return res.status(404).json({ message: "Note not found" })
  res.json(note)
}))

// POST create note
app.post("/api/notes", asyncHandler(async (req, res) => {
  const { title, content } = req.body
  if (!title || !content) return res.status(400).json({ message: "Title and content are required" })
  const note = await Note.create({ title, content })
  res.status(201).json(note)
}))

// PUT update note
app.put("/api/notes/:id", asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!note) return res.status(404).json({ message: "Note not found" })
  res.json(note)
}))

// DELETE note
app.delete("/api/notes/:id", asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id)
  if (!note) return res.status(404).json({ message: "Note not found" })
  res.json({ message: "Note deleted" })
}))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
