# Day 13-14: Database Integration and Authentication - Complete Documentation

## Table of Contents

1. [Introduction to Database Integration](#introduction-to-database-integration)
2. [MongoDB and Mongoose](#mongodb-and-mongoose)
3. [Database Connection](#database-connection)
4. [Schema and Model Definition](#schema-and-model-definition)
5. [CRUD Operations](#crud-operations)
6. [Cookies and Session Management](#cookies-and-session-management)
7. [Authentication Concepts](#authentication-concepts)
8. [Password Hashing](#password-hashing)
9. [JWT Authentication](#jwt-authentication)
10. [Session-Based Authentication](#session-based-authentication)
11. [Complete Code Examples](#complete-code-examples)
12. [Key Learning Objectives](#key-learning-objectives)
13. [Best Practices](#best-practices)
14. [Advanced Patterns](#advanced-patterns)

---

## Introduction to Database Integration

Database integration is essential for building persistent web applications that can store, retrieve, and manipulate data efficiently.

### Why Databases?
- **Data Persistence**: Store data permanently beyond application lifecycle
- **Data Integrity**: Maintain data consistency and relationships
- **Scalability**: Handle large amounts of data efficiently
- **Concurrent Access**: Multiple users can access data simultaneously
- **Query Capabilities**: Complex data retrieval and filtering

### Database Types
- **SQL Databases**: MySQL, PostgreSQL, SQLite (Relational)
- **NoSQL Databases**: MongoDB, CouchDB (Document-based)
- **Key-Value Stores**: Redis, DynamoDB
- **Graph Databases**: Neo4j, Amazon Neptune

### MongoDB Advantages
- **Schema Flexibility**: Dynamic schema for rapid development
- **JSON-like Documents**: Natural fit for JavaScript applications
- **Scalability**: Built-in sharding and replication
- **Rich Query Language**: Powerful querying capabilities
- **Community Support**: Large ecosystem and documentation

---

## MongoDB and Mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema-based solutions.

### Installation and Setup
```json
{
  "name": "day-13",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.18.1"
  }
}
```

### Mongoose Benefits
- **Schema Definition**: Structure for MongoDB documents
- **Type Casting**: Automatic data type conversion
- **Validation**: Built-in and custom validation rules
- **Middleware**: Pre and post hooks for operations
- **Query Building**: Chainable query interface
- **Population**: Reference other documents

---

## Database Connection

### Basic Connection Setup
```javascript
// dbConnect.js
import mongoose from "mongoose";

export const connectMDB = async () => {
    const mongodb_uri = "mongodb+srv://admin:123@learning.hifnbqi.mongodb.net/express?retryWrites=true&w=majority&appName=learning";
    
    await mongoose.connect(mongodb_uri).then(() => {
        console.log("MongoDB connected");
    });
};
```

### Advanced Connection Configuration
```javascript
// dbConnect.js - Enhanced version
import mongoose from "mongoose";

export const connectMDB = async () => {
    const mongodb_uri = process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";
    
    try {
        const connectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
            bufferMaxEntries: 0 // Disable mongoose buffering
        };
        
        await mongoose.connect(mongodb_uri, connectionOptions);
        console.log("MongoDB connected successfully");
        
        // Connection event handlers
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });
        
        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });
        
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};
```

### Environment Variables
```javascript
// .env file
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-secret-key
SESSION_SECRET=your-session-secret

// Using environment variables
import dotenv from 'dotenv';
dotenv.config();

const mongodb_uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
```

---

## Schema and Model Definition

### Basic Schema Definition
```javascript
// models/model.js
import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});

const person = mongoose.model("person", personSchema);

export default person;
```

### Advanced Schema with Validation
```javascript
// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [120, 'Age cannot exceed 120']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    profile: {
        firstName: String,
        lastName: String,
        bio: {
            type: String,
            maxlength: [500, 'Bio cannot exceed 500 characters']
        },
        avatar: String
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Virtual properties
userSchema.virtual('fullName').get(function() {
    return `${this.profile.firstName} ${this.profile.lastName}`;
});

// Instance methods
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName,
        isActive: this.isActive
    };
};

// Static methods
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email.toLowerCase() });
};

// Middleware (hooks)
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.pre('save', async function(next) {
    // Hash password if it's modified
    if (this.isModified('password')) {
        const bcrypt = await import('bcryptjs');
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
```

### Schema Relationships
```javascript
// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [String],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    }
}, {
    timestamps: true
});

// Populate author information when querying
postSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'author',
        select: 'username email profile.firstName profile.lastName'
    });
    next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
```

---

## CRUD Operations

### Basic CRUD Implementation
```javascript
// index.js
import express from "express";
import { connectMDB } from "./dbConnect.js";
import person from "./models/model.js";

const app = express();

await connectMDB();

app.use(express.json());

// CREATE - Add new person
app.post("/person", async (req, res) => {
    try {
        const { name, age, email } = req.body;
        const newPerson = new person({ name, age, email });
        await newPerson.save();
        res.status(201).json(newPerson);
        console.log("Person created:", newPerson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ - Get all persons
app.get("/person", async (req, res) => {
    try {
        const persons = await person.find();
        res.json(persons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ - Get person by ID
app.get("/person/:id", async (req, res) => {
    try {
        const foundPerson = await person.findById(req.params.id);
        if (!foundPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.json(foundPerson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE - Update person
app.put("/person/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPerson = await person.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updatedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.json(updatedPerson);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Delete person
app.delete("/person/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPerson = await person.findByIdAndDelete(id);
        if (!deletedPerson) {
            return res.status(404).json({ error: "Person not found" });
        }
        res.json({ message: "Person deleted successfully", deletedPerson });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000");
});
```

### Advanced Query Operations
```javascript
// Advanced querying examples
app.get("/persons/search", async (req, res) => {
    try {
        const { 
            name, 
            ageMin, 
            ageMax, 
            email, 
            page = 1, 
            limit = 10, 
            sort = 'name' 
        } = req.query;
        
        // Build query object
        const query = {};
        
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }
        
        if (ageMin || ageMax) {
            query.age = {};
            if (ageMin) query.age.$gte = parseInt(ageMin);
            if (ageMax) query.age.$lte = parseInt(ageMax);
        }
        
        if (email) {
            query.email = { $regex: email, $options: 'i' };
        }
        
        // Calculate skip value for pagination
        const skip = (page - 1) * limit;
        
        // Execute query with pagination and sorting
        const persons = await person.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit))
            .select('name age email'); // Only return specific fields
        
        // Get total count for pagination info
        const total = await person.countDocuments(query);
        
        res.json({
            persons,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Aggregation pipeline example
app.get("/persons/stats", async (req, res) => {
    try {
        const stats = await person.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: "$age" },
                    minAge: { $min: "$age" },
                    maxAge: { $max: "$age" },
                    totalPersons: { $sum: 1 }
                }
            }
        ]);
        
        res.json(stats[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

## Cookies and Session Management

### Cookie Handling
```javascript
// cookie.js
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
    // Set cookie with options
    res.cookie("name", "User", {
        maxAge: 3000,     // 3 seconds
        httpOnly: true,   // Prevents XSS attacks
        secure: false,    // Set to true in production with HTTPS
        sameSite: 'lax'   // CSRF protection
    });
    
    // Read cookies
    console.log("All cookies:", req.cookies);
    console.log("Specific cookie:", req.cookies.name);
    
    res.send("Cookie received");
});

app.get("/clear", (req, res) => {
    res.clearCookie("name");
    res.send("Cookie cleared");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});
```

### Advanced Cookie Management
```javascript
// Advanced cookie handling
app.get("/set-advanced-cookie", (req, res) => {
    // Set multiple cookies with different options
    res.cookie("sessionId", "abc123", {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    
    res.cookie("preferences", JSON.stringify({
        theme: 'dark',
        language: 'en'
    }), {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: false // Accessible via JavaScript
    });
    
    res.cookie("tracking", "xyz789", {
        domain: '.example.com', // Available across subdomains
        path: '/api',           // Only sent for /api routes
        maxAge: 60 * 60 * 1000  // 1 hour
    });
    
    res.json({ message: "Advanced cookies set" });
});

// Cookie parsing and validation middleware
function validateSession(req, res, next) {
    const sessionId = req.cookies.sessionId;
    
    if (!sessionId) {
        return res.status(401).json({ error: "No session found" });
    }
    
    // Validate session in database or memory store
    // For demo purposes, we'll just check if it exists
    req.sessionValid = true;
    next();
}

app.get("/protected", validateSession, (req, res) => {
    res.json({ message: "Access granted to protected resource" });
});
```

---

## Session-Based Authentication

### Basic Session Implementation
```javascript
// session.js
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
app.use(cookieParser());

app.use(session({
    secret: "Don't-tell-anybody-bro",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,        // Set to true in production with HTTPS
        httpOnly: true,       // Prevent XSS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.get("/", (req, res) => {
    if (req.session.page_visit) {
        req.session.page_visit++;
        res.send(`You visited the page ${req.session.page_visit} times`);
    } else {
        req.session.page_visit = 1;
        res.send("Hi bro");
    }
});

app.get("/destroy", (req, res) => {
    req.session.destroy();
    res.send("Session destroyed");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});
```

### Advanced Session Management
```javascript
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

// Configure session with MongoDB store
app.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 24 * 60 * 60 // Session TTL in seconds (24 hours)
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax'
    }
}));

// Session-based authentication middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.status(401).json({ error: "Authentication required" });
    }
}

// Login route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user and verify password (implementation depends on your user model)
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // Create session
        req.session.userId = user._id;
        req.session.username = user.username;
        
        res.json({ 
            message: "Login successful", 
            user: user.getPublicProfile() 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logout route
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Could not log out" });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ message: "Logout successful" });
    });
});

// Protected route
app.get("/profile", requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.json(user.getPublicProfile());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Session info route
app.get("/session-info", (req, res) => {
    if (req.session.userId) {
        res.json({
            loggedIn: true,
            userId: req.session.userId,
            username: req.session.username,
            sessionId: req.sessionID
        });
    } else {
        res.json({
            loggedIn: false
        });
    }
});
```

---

## Password Hashing

### bcrypt Implementation
```javascript
import bcrypt from "bcryptjs";

// Hash password during registration
async function hashPassword(plainPassword) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

// Compare password during login
async function comparePassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

// Usage in registration
app.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // Validate input
        if (!username || !password || !email) {
            return res.status(400).json({ 
                error: "Username, password, and email are required" 
            });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ 
                error: "Password must be at least 6 characters long" 
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        
        if (existingUser) {
            return res.status(409).json({ 
                error: "Username or email already exists" 
            });
        }
        
        // Hash password
        const hashedPassword = await hashPassword(password);
        
        // Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        
        res.status(201).json({ 
            message: "User registered successfully",
            user: newUser.getPublicProfile()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Usage in login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // Compare password
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // Login successful
        res.json({ 
            message: "Login successful",
            user: user.getPublicProfile()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

### Advanced Password Security
```javascript
import crypto from "crypto";

// Generate salt
function generateSalt() {
    return crypto.randomBytes(32).toString('hex');
}

// Hash password with custom salt
function hashPasswordWithSalt(password, salt) {
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
    return hash.toString('hex');
}

// Password strength validation
function validatePasswordStrength(password) {
    const errors = [];
    
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }
    
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }
    
    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Rate limiting for login attempts
const loginAttempts = new Map();

function rateLimitLogin(req, res, next) {
    const ip = req.ip;
    const attempts = loginAttempts.get(ip) || { count: 0, resetTime: Date.now() };
    
    // Reset counter if time window has passed
    if (Date.now() > attempts.resetTime) {
        attempts.count = 0;
        attempts.resetTime = Date.now() + 15 * 60 * 1000; // 15 minutes
    }
    
    if (attempts.count >= 5) {
        return res.status(429).json({ 
            error: "Too many login attempts. Please try again later." 
        });
    }
    
    attempts.count++;
    loginAttempts.set(ip, attempts);
    
    next();
}

app.post("/login", rateLimitLogin, async (req, res) => {
    // Login logic here
});
```

---

## JWT Authentication

### Basic JWT Implementation
```javascript
// auth/jwt.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());

const users = [];
const JWT_SECRET = "meow"; // Use environment variable in production

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ 
                error: "Username and password are required" 
            });
        }
        
        // Check if user exists
        const existingUser = users.find(u => u.username === username);
        if (existingUser) {
            return res.status(409).json({ 
                error: "Username already exists" 
            });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword
        };
        
        users.push(newUser);
        
        res.status(201).json({ 
            message: "User registered successfully",
            userId: newUser.id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        
        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                username: user.username 
            },
            JWT_SECRET,
            { 
                expiresIn: '24h' 
            }
        );
        
        res.json({ 
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// JWT Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ error: "Access token required" });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        
        req.user = decoded;
        next();
    });
}

app.get("/dashboard", authenticateToken, (req, res) => {
    res.json({ 
        message: `Welcome ${req.user.username}, happy coding!`,
        user: req.user
    });
});

// Token refresh endpoint
app.post("/refresh-token", authenticateToken, (req, res) => {
    const newToken = jwt.sign(
        { 
            userId: req.user.userId, 
            username: req.user.username 
        },
        JWT_SECRET,
        { 
            expiresIn: '24h' 
        }
    );
    
    res.json({ token: newToken });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});
```

### Advanced JWT Implementation
```javascript
import jwt from "jsonwebtoken";
import crypto from "crypto";

// JWT utility functions
class JWTService {
    constructor() {
        this.accessSecret = process.env.JWT_ACCESS_SECRET || crypto.randomBytes(64).toString('hex');
        this.refreshSecret = process.env.JWT_REFRESH_SECRET || crypto.randomBytes(64).toString('hex');
        this.accessTokenExpiry = '15m';
        this.refreshTokenExpiry = '7d';
    }
    
    generateTokenPair(payload) {
        const accessToken = jwt.sign(payload, this.accessSecret, {
            expiresIn: this.accessTokenExpiry,
            issuer: 'your-app-name',
            audience: 'your-app-users'
        });
        
        const refreshToken = jwt.sign(payload, this.refreshSecret, {
            expiresIn: this.refreshTokenExpiry,
            issuer: 'your-app-name',
            audience: 'your-app-users'
        });
        
        return { accessToken, refreshToken };
    }
    
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, this.accessSecret);
        } catch (error) {
            throw new Error('Invalid access token');
        }
    }
    
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.refreshSecret);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    
    extractTokenFromHeader(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Invalid authorization header format');
        }
        return authHeader.substring(7);
    }
}

const jwtService = new JWTService();

// Enhanced authentication middleware
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        const token = jwtService.extractTokenFromHeader(authHeader);
        const decoded = jwtService.verifyAccessToken(token);
        
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: "Token expired",
                code: "TOKEN_EXPIRED"
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: "Invalid token",
                code: "INVALID_TOKEN"
            });
        } else {
            return res.status(401).json({ 
                error: error.message,
                code: "AUTH_ERROR"
            });
        }
    }
}

// Login with token pair generation
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Authenticate user (previous logic)
        const user = await authenticateUser(username, password);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // Generate token pair
        const payload = {
            userId: user.id,
            username: user.username,
            role: user.role
        };
        
        const { accessToken, refreshToken } = jwtService.generateTokenPair(payload);
        
        // Store refresh token in database (recommended)
        await storeRefreshToken(user.id, refreshToken);
        
        // Set refresh token as httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        
        res.json({
            message: "Login successful",
            accessToken,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Token refresh endpoint
app.post("/refresh-token", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token required" });
        }
        
        // Verify refresh token
        const decoded = jwtService.verifyRefreshToken(refreshToken);
        
        // Check if refresh token exists in database
        const isValidRefreshToken = await verifyRefreshTokenInDB(decoded.userId, refreshToken);
        if (!isValidRefreshToken) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }
        
        // Generate new token pair
        const payload = {
            userId: decoded.userId,
            username: decoded.username,
            role: decoded.role
        };
        
        const { accessToken, refreshToken: newRefreshToken } = jwtService.generateTokenPair(payload);
        
        // Update refresh token in database
        await updateRefreshToken(decoded.userId, refreshToken, newRefreshToken);
        
        // Update refresh token cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
});

// Logout endpoint
app.post("/logout", authenticateJWT, async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (refreshToken) {
            // Remove refresh token from database
            await removeRefreshToken(req.user.userId, refreshToken);
        }
        
        // Clear refresh token cookie
        res.clearCookie('refreshToken');
        
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

## Complete Code Examples

### Example 1: Full-Stack Authentication System
```javascript
// Complete authentication system with MongoDB
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many authentication attempts, please try again later."
});

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    refreshTokens: [String], // Store multiple refresh tokens
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate tokens
userSchema.methods.generateAuthTokens = function() {
    const payload = {
        userId: this._id,
        username: this.username,
        role: this.role
    };
    
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '15m'
    });
    
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
    
    return { accessToken, refreshToken };
};

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/authdb')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Authentication middleware
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: "Access token required" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user || !user.isActive) {
            return res.status(401).json({ error: "User not found or inactive" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: "Token expired", 
                code: "TOKEN_EXPIRED" 
            });
        }
        return res.status(403).json({ error: "Invalid token" });
    }
};

// Authorization middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: "Insufficient permissions" 
            });
        }
        next();
    };
};

// Routes

// Register
app.post("/auth/register", authLimiter, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ 
                error: "Username, email, and password are required" 
            });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ 
                error: "Password must be at least 6 characters long" 
            });
        }
        
        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });
        
        if (existingUser) {
            return res.status(409).json({ 
                error: "Username or email already exists" 
            });
        }
        
        // Create user
        const user = new User({ username, email, password });
        await user.save();
        
        // Generate tokens
        const { accessToken, refreshToken } = user.generateAuthTokens();
        
        // Store refresh token
        user.refreshTokens.push(refreshToken);
        await user.save();
        
        // Set refresh token cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.status(201).json({
            message: "User registered successfully",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
app.post("/auth/login", authLimiter, async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user
        const user = await User.findOne({ 
            $or: [{ username }, { email: username }],
            isActive: true
        });
        
        if (!user || !await user.comparePassword(password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        // Generate tokens
        const { accessToken, refreshToken } = user.generateAuthTokens();
        
        // Store refresh token
        user.refreshTokens.push(refreshToken);
        await user.save();
        
        // Set refresh token cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.json({
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Refresh token
app.post("/auth/refresh", async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token required" });
        }
        
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user || !user.refreshTokens.includes(refreshToken)) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }
        
        // Generate new tokens
        const { accessToken, refreshToken: newRefreshToken } = user.generateAuthTokens();
        
        // Replace old refresh token
        user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
        user.refreshTokens.push(newRefreshToken);
        await user.save();
        
        // Update refresh token cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
});

// Logout
app.post("/auth/logout", authenticateToken, async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (refreshToken) {
            req.user.refreshTokens = req.user.refreshTokens.filter(
                token => token !== refreshToken
            );
            await req.user.save();
        }
        
        res.clearCookie('refreshToken');
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logout all devices
app.post("/auth/logout-all", authenticateToken, async (req, res) => {
    try {
        req.user.refreshTokens = [];
        await req.user.save();
        
        res.clearCookie('refreshToken');
        res.json({ message: "Logged out from all devices" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected routes
app.get("/profile", authenticateToken, (req, res) => {
    res.json({
        user: {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role,
            createdAt: req.user.createdAt
        }
    });
});

app.get("/admin", authenticateToken, authorize('admin'), (req, res) => {
    res.json({ message: "Admin access granted" });
});

// Get all users (admin only)
app.get("/admin/users", authenticateToken, authorize('admin'), async (req, res) => {
    try {
        const users = await User.find({ isActive: true })
            .select('-password -refreshTokens')
            .sort({ createdAt: -1 });
        
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## Key Learning Objectives

After completing Days 13-14, students should understand:

### Database Integration
1. **MongoDB Basics**: Document-based NoSQL database concepts
2. **Mongoose ODM**: Schema definition, validation, and middleware
3. **CRUD Operations**: Create, Read, Update, Delete with MongoDB
4. **Query Operations**: Filtering, sorting, pagination, and aggregation
5. **Database Relationships**: References and population

### Authentication Fundamentals
1. **Password Security**: Hashing, salting, and secure storage
2. **Session Management**: Server-side session storage and cookies
3. **JWT Tokens**: Stateless authentication with JSON Web Tokens
4. **Authorization**: Role-based access control and permissions
5. **Security Best Practices**: Rate limiting, input validation, and secure headers

### Cookies and Sessions
1. **Cookie Mechanics**: Setting, reading, and clearing cookies
2. **Session Storage**: In-memory and persistent session stores
3. **Security Considerations**: HttpOnly, Secure, and SameSite attributes
4. **Session Lifecycle**: Creation, validation, and destruction

### Advanced Security
1. **Token Management**: Access and refresh token patterns
2. **Rate Limiting**: Preventing brute force attacks
3. **Input Validation**: Sanitizing and validating user input
4. **Error Handling**: Secure error responses and logging

---

## Best Practices

### Database Security
```javascript
// Environment variables for sensitive data
const config = {
    mongodb: {
        uri: process.env.MONGODB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        }
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessExpiry: '15m',
        refreshExpiry: '7d'
    }
};

// Input validation and sanitization
import validator from 'validator';
import mongoSanitize from 'express-mongo-sanitize';

app.use(mongoSanitize()); // Prevent NoSQL injection

function validateUserInput(userData) {
    const errors = [];
    
    if (!userData.username || !validator.isLength(userData.username, { min: 3, max: 20 })) {
        errors.push('Username must be 3-20 characters long');
    }
    
    if (!userData.email || !validator.isEmail(userData.email)) {
        errors.push('Valid email is required');
    }
    
    if (!userData.password || !validator.isLength(userData.password, { min: 6 })) {
        errors.push('Password must be at least 6 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}
```

### Security Headers and Middleware
```javascript
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"]
        }
    }
}));

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compression());

// Request logging
import morgan from 'morgan';

app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400
}));
```

---

## Advanced Patterns

### Database Transaction Pattern
```javascript
// Using MongoDB transactions for data consistency
async function createUserWithProfile(userData, profileData) {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();
        
        // Create user
        const user = new User(userData);
        await user.save({ session });
        
        // Create profile
        const profile = new Profile({
            ...profileData,
            userId: user._id
        });
        await profile.save({ session });
        
        await session.commitTransaction();
        
        return { user, profile };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}
```

### Advanced Authentication Flow
```javascript
// Multi-factor authentication setup
class AuthService {
    static async generateMFA(userId) {
        const secret = speakeasy.generateSecret({
            name: 'Your App Name',
            length: 20
        });
        
        await User.findByIdAndUpdate(userId, {
            mfaSecret: secret.base32,
            mfaEnabled: false
        });
        
        return {
            secret: secret.base32,
            qrCode: await qrcode.toDataURL(secret.otpauth_url)
        };
    }
    
    static async verifyMFA(userId, token) {
        const user = await User.findById(userId);
        
        return speakeasy.totp.verify({
            secret: user.mfaSecret,
            encoding: 'base32',
            token: token
        });
    }
    
    static async enableMFA(userId, token) {
        const isValid = await this.verifyMFA(userId, token);
        
        if (isValid) {
            await User.findByIdAndUpdate(userId, {
                mfaEnabled: true
            });
            return true;
        }
        
        return false;
    }
}
```

This comprehensive documentation covers database integration with MongoDB, authentication systems, session management, and security best practices essential for building secure full-stack applications.