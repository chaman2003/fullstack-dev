# Day 20 - REST APIs with Database

Create a full REST API for a Notes application using Express, Mongoose, and MongoDB with proper environment configuration.

## Learning Objectives
- Build CRUD endpoints for a Notes resource
- Connect to MongoDB with Mongoose
- Use environment variables with dotenv
- Handle 404 errors properly
- Test APIs with Postman

## Concepts Covered

### Environment Variables
```js
// .env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

// index.js
import 'dotenv/config';
const PORT = process.env.PORT || 5000;
```

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get single note |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### express-async-handler
Wraps async route handlers to catch errors automatically instead of writing try/catch in every route.

```js
import asyncHandler from 'express-async-handler';

app.get('/api/notes', asyncHandler(async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
}));
```

### Route Structure
```
POST /api/notes  body: { title, content }
GET /api/notes
GET /api/notes/:id
PUT /api/notes/:id  body: { title?, content? }
DELETE /api/notes/:id
```

### Postman Testing
Import the routes into Postman to test each endpoint with different request bodies and parameters.

## Files
| File | Description |
|------|-------------|
| `index.js` | Express server with complete Notes API |
| `db.js` | MongoDB connection using Mongoose |
| `models/Note.js` | Note schema (title, content, timestamps) |
| `.env` | Environment variables (PORT, MONGODB_URI) |
| `.env.example` | Template for environment setup |
