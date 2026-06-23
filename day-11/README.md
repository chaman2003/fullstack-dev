# Day 11 - Node.js

Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript on the server side.

## Learning Objectives
- Understand Node.js architecture and event loop
- Use built-in modules (fs, path, os, url, crypto, http)
- Create custom modules with require/exports
- Work with file system streams
- Build an HTTP server from scratch
- Install and use npm packages

## Concepts Covered

### Custom Modules
```js
// greet.js
function greet(name) { return `Hello, ${name}!`; }
module.exports = greet;

// app.js
const greet = require('./greet');
console.log(greet("Chaman"));
```

### Built-in Modules
- **fs**: read/write files (`readFile`, `writeFile`)
- **path**: join paths, get extensions (`path.join`)
- **os**: system info (`os.platform()`, `os.freemem()`)
- **url**: parse URLs (`url.parse`, URL class)
- **crypto**: hashing (`crypto.createHash`)
- **http**: create servers

### File Streams
Streams process data chunk by chunk, efficient for large files.

```js
const readStream = fs.createReadStream('file.txt', { encoding: 'utf-8' });
readStream.on('data', chunk => console.log(chunk));
readStream.pipe(writeStream); // pipe from read to write
```

### HTTP Server (no framework)
```js
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  }
});
server.listen(3000);
```

### npm Packages
Install packages with `npm install`. Example uses `lodash` for utility functions and `nodemon` for auto-restart.

## Files
| File/Folder | Description |
|-------------|-------------|
| `custom-modules/` | require, exports, module.exports patterns |
| `inbuilt-modules/fs.js` | File system read/write |
| `inbuilt-modules/path.js` | Path joining and parsing |
| `inbuilt-modules/os.js` | Operating system info |
| `inbuilt-modules/url.js` | URL parsing |
| `inbuilt-modules/crypto.js` | SHA256 hashing |
| `inbuilt-modules/http.js` | Basic HTTP server |
| `file-system-stream/` | Readable/writable streams, pipe, readline |
| `npm-modules/lodash/` | Lodash example |
| `server/server1.js` | HTTP server with routing |

## How to Run
```bash
cd day-11
node server/server1.js
```
