import "dotenv/config"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

// ========== Joi Validation ==========
import Joi from "joi"

// Define a schema for user registration
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().integer().min(1).max(150),
})

const noteSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).max(1000).required(),
})

// Validation middleware
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const messages = error.details.map(d => d.message)
      return res.status(400).json({ errors: messages })
    }
    next()
  }
}

// ========== Routes with Validation ==========
const users = []

app.post("/api/register", validate(registerSchema), (req, res) => {
  users.push(req.body)
  res.status(201).json({ message: "User registered", user: req.body })
})

app.post("/api/notes", validate(noteSchema), (req, res) => {
  res.json({ message: "Note is valid", note: req.body })
})

// ========== Route that throws an error ==========
app.get("/api/error-test", (req, res, next) => {
  // Simulate an async error
  next(new Error("Something went wrong in the server!"))
})

// ========== Centralized Error Handler ==========
app.use((err, req, res, next) => {
  console.error("Error:", err.message)
  const status = err.status || 500
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
