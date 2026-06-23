# Day 22 - Notes App Backend (JWT Auth)

## Topics
- User registration with bcrypt password hashing
- JWT token generation and verification
- Login/logout routes
- Protected routes (auth middleware)
- User-specific notes CRUD
- Express + Mongoose

## Files
- `index.js` - Express server with auth + notes routes
- `models/User.js` - User schema with password hashing
- `models/Note.js` - Note schema with user reference
- `middleware/auth.js` - JWT auth middleware
- `package.json` - Dependencies
