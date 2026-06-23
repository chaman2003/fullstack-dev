# Day 11-12: Node.js Fundamentals and Express.js Framework - Complete Documentation

## Table of Contents

1. [Introduction to Node.js](#introduction-to-nodejs)
2. [Node.js Module System](#nodejs-module-system)
3. [Built-in Node.js Modules](#built-in-nodejs-modules)
4. [File System Operations](#file-system-operations)
5. [Streams and Pipes](#streams-and-pipes)
6. [HTTP Server Creation](#http-server-creation)
7. [Introduction to Express.js](#introduction-to-expressjs)
8. [Express Routing](#express-routing)
9. [Middleware Concepts](#middleware-concepts)
10. [Request and Response Handling](#request-and-response-handling)
11. [Complete Code Examples](#complete-code-examples)
12. [Key Learning Objectives](#key-learning-objectives)
13. [Best Practices](#best-practices)
14. [Advanced Patterns](#advanced-patterns)

---

## Introduction to Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows JavaScript to run on the server side, enabling full-stack JavaScript development.

### What is Node.js?
- **JavaScript Runtime**: Execute JavaScript outside the browser
- **Event-Driven**: Non-blocking, asynchronous event-driven architecture
- **Single-Threaded**: Uses event loop for concurrency
- **Cross-Platform**: Runs on Windows, macOS, and Linux
- **NPM Ecosystem**: Access to vast package manager and libraries

### Node.js Architecture
```javascript
// Event Loop Concept
console.log('Start');

setTimeout(() => {
    console.log('Timeout callback');
}, 0);

setImmediate(() => {
    console.log('Immediate callback');
});

process.nextTick(() => {
    console.log('Next tick callback');
});

console.log('End');

// Output order demonstrates event loop phases
// Start -> End -> Next tick callback -> Immediate callback -> Timeout callback
```

### Core Concepts
- **Non-blocking I/O**: Operations don't block the main thread
- **Event Loop**: Handles asynchronous operations
- **Callbacks**: Functions executed after async operations complete
- **Modules**: Reusable code organization system
- **Package Management**: NPM for dependency management

---

## Node.js Module System

Node.js uses CommonJS module system for organizing and sharing code across files.

### Custom Modules

#### Creating and Exporting Modules
```javascript
// greet.js - Single function export
function greet(name) {
  return `Hello, ${name}!`;
}

module.exports = greet;
```

```javascript
// math.js - Multiple exports
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;
```

#### Importing and Using Modules
```javascript
// app.js - Using custom modules
const greet = require("./greet");
const math = require("./math");

const name = "Chaman";
console.log(greet(name));

console.log("Add:", math.add(5, 3));
console.log("Sub:", math.subtract(5, 3));
console.log("Multiply:", math.multiply(5, 3));
console.log("Divide:", math.divide(5, 3));
```

### Module Export Patterns
```javascript
// Pattern 1: Single function/class export
module.exports = function Calculator() {
    this.add = (a, b) => a + b;
    this.subtract = (a, b) => a - b;
};

// Pattern 2: Object export
module.exports = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    PI: 3.14159
};

// Pattern 3: Mixed exports
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;

// Pattern 4: ES6 Module syntax (when "type": "module" in package.json)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function greet(name) {
    return `Hello, ${name}!`;
}

// Importing ES6 modules
import greet, { add, subtract } from './math.js';
```

### Module Resolution
```javascript
// Local modules
const myModule = require('./myModule');        // Same directory
const myModule = require('./utils/myModule');  // Subdirectory
const myModule = require('../myModule');       // Parent directory

// Node modules
const express = require('express');            // npm package
const fs = require('fs');                      // Built-in module

// Core modules vs local modules
const path = require('path');                  // Built-in (no ./ prefix)
const utils = require('./utils');             // Local (with ./ prefix)
```

---

## Built-in Node.js Modules

Node.js provides numerous built-in modules for common operations.

### File System (fs) Module
```javascript
const fs = require("fs");

// Asynchronous file reading
fs.readFile("sample.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

// Asynchronous file writing
const content = "bow bow, meow meow";
fs.writeFile("output.txt", content, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Written successfully");
});

// Synchronous operations (blocking)
try {
    const data = fs.readFileSync("sample.txt", "utf8");
    console.log(data);
    
    fs.writeFileSync("output.txt", "Synchronous write");
    console.log("File written synchronously");
} catch (err) {
    console.error("Error:", err);
}

// Promise-based operations
const fsPromises = fs.promises;

async function fileOperations() {
    try {
        const data = await fsPromises.readFile("sample.txt", "utf8");
        console.log(data);
        
        await fsPromises.writeFile("output.txt", "Promise-based write");
        console.log("File written with promises");
    } catch (err) {
        console.error("Error:", err);
    }
}
```

### Path Module
```javascript
const path = require("path");

const directory = "users/local";
const file = "sample.txt";

// Join paths
const fileName = path.join(directory, file);
console.log(fileName); // users/local/sample.txt

// Get file extension
console.log(path.extname(fileName)); // .txt

// Get basename
console.log(path.basename(fileName)); // sample.txt

// Get directory name
console.log(path.dirname(fileName)); // users/local

// Parse path
const parsed = path.parse(fileName);
console.log(parsed);
// {
//   root: '',
//   dir: 'users/local',
//   base: 'sample.txt',
//   ext: '.txt',
//   name: 'sample'
// }

// Resolve absolute path
console.log(path.resolve(fileName)); // Absolute path

// Check if path is absolute
console.log(path.isAbsolute('/home/user')); // true (Unix)
console.log(path.isAbsolute('C:\\Users')); // true (Windows)
```

### OS Module
```javascript
const os = require('os');

// System information
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Info:', os.cpus());
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());
console.log('Home Directory:', os.homedir());
console.log('Temporary Directory:', os.tmpdir());
console.log('Hostname:', os.hostname());
console.log('Operating System:', os.type());
console.log('OS Release:', os.release());
console.log('Uptime:', os.uptime());

// Network interfaces
console.log('Network Interfaces:', os.networkInterfaces());

// User info
console.log('User Info:', os.userInfo());
```

### URL Module
```javascript
const url = require('url');

const myURL = new URL('https://example.com:8080/path/to/resource?param=value#section');

console.log('Protocol:', myURL.protocol);     // https:
console.log('Hostname:', myURL.hostname);     // example.com
console.log('Port:', myURL.port);             // 8080
console.log('Pathname:', myURL.pathname);     // /path/to/resource
console.log('Search:', myURL.search);         // ?param=value
console.log('Hash:', myURL.hash);             // #section

// Parse URL
const parsed = url.parse('https://example.com/path?param=value');
console.log(parsed);

// Format URL
const formatted = url.format({
    protocol: 'https:',
    hostname: 'example.com',
    pathname: '/path',
    query: { param: 'value' }
});
console.log(formatted); // https://example.com/path?param=value
```

### Crypto Module
```javascript
const crypto = require('crypto');

// Generate random bytes
const randomBytes = crypto.randomBytes(16);
console.log('Random bytes:', randomBytes.toString('hex'));

// Create hash
const hash = crypto.createHash('sha256');
hash.update('Hello World');
console.log('Hash:', hash.digest('hex'));

// Create HMAC
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('data to authenticate');
console.log('HMAC:', hmac.digest('hex'));

// Generate UUID
const { v4: uuidv4 } = require('uuid'); // npm install uuid
console.log('UUID:', uuidv4());
```

---

## File System Operations

### Advanced File Operations
```javascript
const fs = require('fs');
const path = require('path');

// Check if file/directory exists
fs.access('file.txt', fs.constants.F_OK, (err) => {
    if (err) {
        console.log('File does not exist');
    } else {
        console.log('File exists');
    }
});

// Get file stats
fs.stat('file.txt', (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    
    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());
    console.log('File size:', stats.size);
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
});

// Create directory
fs.mkdir('newDirectory', { recursive: true }, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Directory created');
    }
});

// Read directory contents
fs.readdir('.', (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    
    console.log('Directory contents:', files);
});

// Watch for file changes
fs.watchFile('file.txt', (curr, prev) => {
    console.log('File changed');
    console.log('Current mtime:', curr.mtime);
    console.log('Previous mtime:', prev.mtime);
});

// Copy file
fs.copyFile('source.txt', 'destination.txt', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('File copied successfully');
    }
});

// Delete file
fs.unlink('file.txt', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('File deleted');
    }
});
```

---

## Streams and Pipes

Streams are objects that let you read data from a source or write data to a destination in continuous fashion.

### Readable Streams
```javascript
const fs = require('fs');

// Create readable stream
const readableStream = fs.createReadStream('output.txt', { encoding: "utf-8" });

readableStream.on("data", (chunk) => {
    console.log("Received chunk:", chunk);
});

readableStream.on("end", () => {
    console.log("End of the file");
});

readableStream.on("error", (err) => {
    console.log("Error:", err);
});
```

### Writable Streams
```javascript
const fs = require('fs');

// Create writable stream
const writableStream = fs.createWriteStream("writeOutput.txt");

writableStream.write("Hello ");
writableStream.write("World!");
writableStream.end();

writableStream.on("finish", () => {
    console.log("Write completed");
});

writableStream.on("error", (err) => {
    console.log("Write error:", err);
});
```

### Pipes
```javascript
const fs = require('fs');

// Simple pipe operation
const readableStream = fs.createReadStream('input.txt');
const writableStream = fs.createWriteStream('output.txt');

readableStream.pipe(writableStream);

// Pipe with error handling
readableStream
    .pipe(writableStream)
    .on('error', (err) => {
        console.error('Pipe error:', err);
    })
    .on('finish', () => {
        console.log('Pipe operation completed');
    });

// Transform stream
const { Transform } = require('stream');

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

readableStream
    .pipe(upperCaseTransform)
    .pipe(writableStream);
```

### Advanced Stream Operations
```javascript
const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');

const pipelineAsync = promisify(pipeline);

async function processFile() {
    try {
        await pipelineAsync(
            fs.createReadStream('input.txt'),
            upperCaseTransform,
            fs.createWriteStream('output.txt')
        );
        console.log('Pipeline finished');
    } catch (error) {
        console.error('Pipeline failed:', error);
    }
}

// Custom readable stream
const { Readable } = require('stream');

class NumberStream extends Readable {
    constructor(options) {
        super(options);
        this.current = 0;
        this.max = 10;
    }
    
    _read() {
        if (this.current < this.max) {
            this.push(`${this.current++}\n`);
        } else {
            this.push(null); // End stream
        }
    }
}

const numberStream = new NumberStream();
numberStream.pipe(process.stdout);
```

---

## HTTP Server Creation

### Basic HTTP Server
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World");
});

server.listen(3000, () => {
    console.log("Your server is running at http://localhost:3000");
});
```

### Advanced HTTP Server with Routing
```javascript
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === "GET" && pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <h1>Welcome to Home Page</h1>
            <p>Current time: ${new Date().toISOString()}</p>
        `);
    } else if (method === "GET" && pathname === "/api/users") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify([
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" }
        ]));
    } else if (method === "GET" && pathname.startsWith("/api/users/")) {
        const userId = pathname.split('/')[3];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id: userId, name: `User ${userId}` }));
    } else if (method === "POST" && pathname === "/api/users") {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const userData = JSON.parse(body);
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ 
                    message: "User created", 
                    user: userData,
                    id: Date.now()
                }));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
```

---

## Introduction to Express.js

Express.js is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.

### Basic Express Setup

#### CommonJS Syntax
```javascript
// package.json with "type": "commonjs" (default)
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});
```

#### ES6 Module Syntax
```javascript
// package.json with "type": "module"
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});
```

### Express Application Structure
```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Built-in middleware
app.use(express.json());                    // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public'));          // Serve static files

// Custom middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

---

## Express Routing

### Basic Routing
```javascript
import express from 'express';

const app = express();

// Basic routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/about", (req, res) => {
    res.send("Welcome to about page");
});

app.get("/help", (req, res) => {
    res.send("Welcome to help page");
});

// HTTP methods
app.post('/users', (req, res) => {
    res.send('Create user');
});

app.put('/users/:id', (req, res) => {
    res.send(`Update user ${req.params.id}`);
});

app.delete('/users/:id', (req, res) => {
    res.send(`Delete user ${req.params.id}`);
});
```

### Dynamic Routing with Parameters
```javascript
// controller.js
export const userName = (req, res) => {
    const { username } = req.params;
    res.send(`Hello, ${username}!`);
};

export const searchQuery = (req, res) => {
    const { q, category, page = 1 } = req.query;
    res.json({
        query: q,
        category: category,
        page: parseInt(page),
        results: []
    });
};

export const login = (req, res) => {
    res.send("Login page");
};

export const signup = (req, res) => {
    res.send("Signup page");
};

// router.js
import express from 'express';
import { login, signup } from './controller.js';

const router = express.Router();

router.get('/login', login);
router.get('/signup', signup);

export default router;

// main app
import express from 'express';
import router from './router.js';
import { userName, searchQuery } from './controller.js';

const app = express();

// Dynamic parameter routing
app.get("/user/:username", userName);

// Query string routing
app.get('/search', searchQuery);

// Router usage
app.use('/auth', router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});
```

### Advanced Routing Patterns
```javascript
// Route parameters with validation
app.get('/users/:id(\\d+)', (req, res) => {
    // Only matches numeric IDs
    res.send(`User ID: ${req.params.id}`);
});

// Optional parameters
app.get('/posts/:year/:month?', (req, res) => {
    const { year, month } = req.params;
    res.json({ year, month: month || 'all' });
});

// Wildcard routes
app.get('/files/*', (req, res) => {
    const filepath = req.params[0];
    res.send(`File path: ${filepath}`);
});

// Multiple route handlers
app.get('/protected', authenticate, authorize, (req, res) => {
    res.send('Protected resource');
});

function authenticate(req, res, next) {
    // Authentication logic
    next();
}

function authorize(req, res, next) {
    // Authorization logic
    next();
}

// Route with multiple methods
app.route('/users')
    .get((req, res) => {
        res.send('Get all users');
    })
    .post((req, res) => {
        res.send('Create user');
    });

// Regex routes
app.get(/.*fly$/, (req, res) => {
    res.send('Route ending with "fly"');
});
```

---

## Middleware Concepts

Middleware functions execute during the request-response cycle and can modify request/response objects.

### Application-Level Middleware
```javascript
import express from "express";

const app = express();

// Middleware without specific routes
app.use((req, res, next) => {
    console.log('Initiated middleware at ' + Date.now());
    next();
    
    res.on('finish', () => {
        console.log("Middleware loaded successfully");
        console.log("Finished using middleware");
    });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Middleware for specific routes
app.use("/welcome", (req, res, next) => {
    console.log('Welcome middleware initiated at ' + Date.now());
    next();
    
    res.on('finish', () => {
        console.log("Welcome middleware completed");
    });
});

app.get("/welcome", (req, res) => {
    res.send("Welcome to Express JS");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Your server is running at http://localhost:${PORT}`);
});
```

### Custom Middleware Examples
```javascript
// Logging middleware
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
}

// Authentication middleware
function authenticate(req, res, next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify token logic here
    req.user = { id: 1, name: 'John Doe' };
    next();
}

// Request validation middleware
function validateUser(req, res, next) {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Name and email are required' 
        });
    }
    
    next();
}

// Rate limiting middleware
const requestCounts = new Map();

function rateLimit(maxRequests = 100, windowMs = 15 * 60 * 1000) {
    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();
        
        if (!requestCounts.has(ip)) {
            requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
            return next();
        }
        
        const userData = requestCounts.get(ip);
        
        if (now > userData.resetTime) {
            userData.count = 1;
            userData.resetTime = now + windowMs;
            return next();
        }
        
        if (userData.count >= maxRequests) {
            return res.status(429).json({ 
                error: 'Too many requests' 
            });
        }
        
        userData.count++;
        next();
    };
}

// Usage
app.use(logger);
app.use('/api', rateLimit(50, 15 * 60 * 1000));
app.use('/api/protected', authenticate);
app.post('/api/users', validateUser, (req, res) => {
    res.json({ message: 'User created' });
});
```

### Error Handling Middleware
```javascript
// Error handling middleware (must be last)
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    // Development vs Production error responses
    if (process.env.NODE_ENV === 'development') {
        res.status(err.status || 500).json({
            error: err.message,
            stack: err.stack
        });
    } else {
        res.status(err.status || 500).json({
            error: 'Internal Server Error'
        });
    }
}

// Async error wrapper
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

// Usage with async routes
app.get('/async-route', asyncHandler(async (req, res) => {
    const data = await someAsyncOperation();
    res.json(data);
}));

app.use(errorHandler);
```

---

## Request and Response Handling

### Request Object Properties
```javascript
app.get('/request-info', (req, res) => {
    const requestInfo = {
        method: req.method,
        url: req.url,
        path: req.path,
        query: req.query,
        params: req.params,
        headers: req.headers,
        cookies: req.cookies,
        ip: req.ip,
        hostname: req.hostname,
        protocol: req.protocol,
        secure: req.secure,
        xhr: req.xhr,
        body: req.body,
        userAgent: req.get('User-Agent')
    };
    
    res.json(requestInfo);
});
```

### Response Methods
```javascript
app.get('/response-methods', (req, res) => {
    // Different ways to send responses
    
    // Text response
    res.send('Hello World');
    
    // JSON response
    res.json({ message: 'Success', data: [] });
    
    // Status with message
    res.status(201).send('Created');
    
    // HTML response
    res.send('<h1>HTML Response</h1>');
    
    // File download
    res.download('/path/to/file.pdf');
    
    // File attachment
    res.attachment('filename.txt').send('File content');
    
    // Redirect
    res.redirect('/other-route');
    res.redirect(301, '/permanently-moved');
    
    // Set headers
    res.set('Custom-Header', 'Value');
    res.type('application/json');
    
    // Cookie operations
    res.cookie('name', 'value', { maxAge: 900000, httpOnly: true });
    res.clearCookie('name');
    
    // End response
    res.end();
});
```

### File Upload Handling
```javascript
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Single file upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({
        message: 'File uploaded successfully',
        file: {
            filename: req.file.filename,
            originalname: req.file.originalname,
            size: req.file.size,
            path: req.file.path
        }
    });
});

// Multiple file upload
app.post('/upload-multiple', upload.array('images', 5), (req, res) => {
    res.json({
        message: 'Files uploaded successfully',
        files: req.files.map(file => ({
            filename: file.filename,
            originalname: file.originalname,
            size: file.size
        }))
    });
});
```

---

## Complete Code Examples

### Example 1: RESTful API with Express
```javascript
import express from 'express';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data store (use database in production)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let nextId = 3;

// Routes

// GET /api/users - Get all users
app.get('/api/users', (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    
    let filteredUsers = users;
    
    if (search) {
        filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
        users: paginatedUsers,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: filteredUsers.length,
            pages: Math.ceil(filteredUsers.length / limit)
        }
    });
});

// GET /api/users/:id - Get user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

// POST /api/users - Create new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Name and email are required' 
        });
    }
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ 
            error: 'Email already exists' 
        });
    }
    
    const newUser = {
        id: nextId++,
        name,
        email
    };
    
    users.push(newUser);
    
    res.status(201).json(newUser);
});

// PUT /api/users/:id - Update user
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    
    res.json(users[userIndex]);
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    
    res.status(204).send();
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### Example 2: Express with Template Engine
```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set view engine (assuming EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    const data = {
        title: 'Home Page',
        message: 'Welcome to our website!',
        users: [
            { name: 'John', age: 30 },
            { name: 'Jane', age: 25 },
            { name: 'Bob', age: 35 }
        ]
    };
    
    res.render('index', data);
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About Us',
        description: 'We are a technology company...'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    // Process form submission (save to database, send email, etc.)
    console.log('Contact form submission:', { name, email, message });
    
    res.render('contact', { 
        title: 'Contact Us',
        success: 'Thank you for your message!'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Key Learning Objectives

After completing Days 11-12, students should understand:

### Node.js Fundamentals
1. **Runtime Environment**: Understanding Node.js as a JavaScript runtime
2. **Event Loop**: Asynchronous, non-blocking I/O operations
3. **Module System**: CommonJS and ES6 module patterns
4. **Built-in Modules**: File system, HTTP, path, OS, crypto, and URL modules

### File Operations
1. **File System API**: Reading, writing, and manipulating files
2. **Streams**: Working with large data efficiently
3. **Pipes**: Connecting readable and writable streams
4. **Path Manipulation**: Cross-platform path handling

### HTTP and Web Servers
1. **HTTP Module**: Creating basic web servers
2. **Request/Response**: Handling HTTP requests and responses
3. **Routing**: URL parsing and route handling
4. **Server Architecture**: Understanding server-side development

### Express.js Framework
1. **Framework Benefits**: Simplified web application development
2. **Middleware**: Request processing pipeline
3. **Routing**: Advanced route handling and organization
4. **Error Handling**: Comprehensive error management

---

## Best Practices

### Node.js Best Practices
```javascript
// Use environment variables
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/myapp';

// Proper error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
```

### Express.js Best Practices
```javascript
// Security middleware
import helmet from 'helmet';
import cors from 'cors';

app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));

// Request logging
import morgan from 'morgan';
app.use(morgan('combined'));

// Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Input validation
import { body, validationResult } from 'express-validator';

app.post('/api/users',
    body('email').isEmail(),
    body('name').isLength({ min: 2, max: 50 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Process valid input
    }
);
```

---

## Advanced Patterns

### Custom Error Classes
```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class NotFoundError extends AppError {
    constructor(resource) {
        super(`${resource} not found`, 404);
    }
}

// Usage
app.get('/api/users/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new NotFoundError('User');
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
});
```

### Modular Application Structure
```javascript
// routes/users.js
import express from 'express';
import { UserController } from '../controllers/UserController.js';

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;

// controllers/UserController.js
import { UserService } from '../services/UserService.js';

export class UserController {
    static async getAll(req, res, next) {
        try {
            const users = await UserService.getAll(req.query);
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
    
    static async getById(req, res, next) {
        try {
            const user = await UserService.getById(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
    
    // Other methods...
}

// services/UserService.js
export class UserService {
    static async getAll(query) {
        // Business logic
        return users;
    }
    
    static async getById(id) {
        // Business logic
        return user;
    }
    
    // Other methods...
}

// app.js
import userRoutes from './routes/users.js';

app.use('/api/users', userRoutes);
```

This comprehensive documentation covers Node.js fundamentals and Express.js framework essentials, providing the foundation for building robust server-side applications and APIs.