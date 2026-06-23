# Day 12 - Express.js

Express is a minimal web framework for Node.js. It simplifies routing, middleware, request handling, and serving files.

## Learning Objectives
- Set up an Express server
- Define routes for GET, POST, PUT, DELETE
- Use route parameters and query strings
- Create custom middleware
- Handle form data (URL-encoded and multipart)
- Serve static files
- Organize code with controllers and routers

## Concepts Covered

### Basic Setup
```js
import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('Hello World'));
app.listen(3000);
```

### Routing
```js
app.get('/users', getUsers);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
```

### Route Parameters & Query Strings
```js
// /user/123
req.params.id;    // "123"

// /search?q=hello
req.query.q;      // "hello"
```

### Middleware
```js
// runs on every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// error handling middleware (4 params)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Something broke');
});
```

### Controllers & Routers
Organize routes into separate files for clean architecture.

```js
// controller.js
export const getUsers = (req, res) => { ... };
// router.js
router.get('/users', getUsers);
// index.js
app.use(router);
```

### Form Handling
```js
// URL-encoded forms
app.use(express.urlencoded({ extended: true }));
// Multipart (file upload) with multer
app.use(upload.single('image'));
```

## Folders
| Folder | Description |
|--------|-------------|
| `basic/` | Hello world Express server |
| `routes/` | Basic route definitions |
| `controller/` | Separated controllers + router |
| `http-methods/` | GET, POST, PUT, DELETE examples |
| `middleware/` | App-level and error handling middleware |
| `handling-form-data/` | URL-encoded and multer file upload |
| `server-static-files/` | Serving static assets from folders |
