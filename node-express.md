# Node.js & Express.js

## Days
- [Day 11 - Node.js](../day-11/)
- [Day 12 - Express.js](../day-12/)
- [Day 20 - REST APIs with Database](../day-20/)
- [Day 21 - Error Handling & Validation](../day-21/)
- [Day 22 - Notes App Backend](../day-22/)

## Node.js

JavaScript runtime for server-side development.

### Built-in Modules
| Module | Purpose |
|--------|---------|
| fs | File system (read/write files) |
| path | File paths (join, dirname, extname) |
| os | OS info (platform, memory, CPUs) |
| url | URL parsing and formatting |
| crypto | Hashing and encryption |
| http | Create HTTP servers |

### Example Server
```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});
server.listen(3000);
```

### Streams
Process data chunk by chunk for large files:
```js
const readStream = fs.createReadStream('bigfile.txt');
readStream.pipe(fs.createWriteStream('copy.txt'));
```

## Express.js

Web framework for Node.js with routing, middleware, and request handling.

### Setup
```js
import express from 'express';
const app = express();
app.use(express.json());
```

### Routing
```js
app.get('/api/items', getItems);
app.post('/api/items', createItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);
```

### Middleware
```js
app.use(cors());
app.use(morgan('dev'));
app.use((req, res, next) => { console.log('Log'); next(); });
```

### Error Handling
```js
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
```

## REST API Project
Complete Notes API with full CRUD, input validation (Joi), JWT authentication, and async error handling. See [day-22](../day-22/) for the full implementation.
