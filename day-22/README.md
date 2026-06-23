# Day 22 - Notes App Backend (JWT Authentication)

Full backend for the Notes app with user registration, JWT login, and user-specific notes CRUD.

## Learning Objectives
- Set up user registration with bcrypt hashing
- Implement JWT login
- Protect routes with auth middleware
- Create user-specific notes
- Handle auth errors properly

## Concepts Covered

### User Model with Password Hashing
```js
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};
```

### JWT Authentication
```js
// Login - create token
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET || 'secret123',
  { expiresIn: '7d' }
);

// Auth middleware - verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select('-password');
```

### Protected Routes
```js
// middleware/auth.js
const protect = (req, res, next) => {
  if (req.headers.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    // verify token
  }
};

// Usage
app.get('/api/notes', protect, getNotes);
app.post('/api/notes', protect, createNote);
```

### User-Specific Notes
Each note references a user. Routes filter by `req.user._id`.
```js
Note.find({ user: req.user._id });
Note.findOneAndUpdate({ _id: id, user: req.user._id }, update);
```

### API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/notes` | Yes | Get user's notes |
| POST | `/api/notes` | Yes | Create a note |
| PUT | `/api/notes/:id` | Yes | Update a note |
| DELETE | `/api/notes/:id` | Yes | Delete a note |

## Files
| File | Description |
|------|-------------|
| `index.js` | Express server with auth + notes routes |
| `models/User.js` | User schema with bcrypt hashing |
| `models/Note.js` | Note schema with user reference |
| `middleware/auth.js` | JWT verification middleware |
