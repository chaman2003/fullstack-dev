# Day 4 - Advanced JavaScript

Building on the basics, this day covers modern ES6+ features, asynchronous programming, and advanced patterns.

## Learning Objectives
- Destructure arrays and objects
- Use spread/rest operators
- Handle errors with try/catch
- Work with promises and async/await
- Use ES6 modules (import/export)
- Implement debounce and throttle
- Use localStorage/sessionStorage

## Concepts Covered

### Destructuring
```js
// Array
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// Object
const { name, age, ...other } = person;
```

### Spread & Rest
```js
const arr = [...oldArr, 6, 7, 8];
const obj = { ...person, city: "NYC" };
function sum(...nums) { return nums.reduce((a, b) => a + b); }
```

### Error Handling
```js
try {
  const result = riskyOperation();
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Type error:", error.message);
  } else {
    console.error("Error:", error);
  }
} finally {
  console.log("Cleanup");
}
```

### Promises
```js
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data loaded"), 1000);
});

fetchData().then(data => console.log(data)).catch(err => console.error(err));
```

### Async/Await
```js
async function getData() {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Failed:", error);
  }
}
```

### ES6 Modules
```js
// math.js
export const add = (a, b) => a + b;
export default function greet(name) { return `Hello ${name}`; }

// app.js
import greet, { add } from './math.js';
```

### Debounce & Throttle
- **Debounce**: Runs after user stops doing something (search input)
- **Throttle**: Runs at most once per interval (scroll handler)

## Files
| File | Description |
|------|-------------|
| `11errorhandling.html` | Try/catch/finally with error types |
| `12array.html` | Array methods: map, filter, reduce, find, some |
| `13destructing.html` | Array and object destructuring |
| `14spread-rest.html` | Spread operator and rest parameters |
| `15json.html` | JSON.parse, JSON.stringify, localStorage |
| `16callbacks.html` | Callback functions and callback hell |
| `17promises.html` | Promise creation, chaining, Promise.all |
| `23-modules-debounce-throttle.html` | ES6 modules + debounce/throttle with live demo |
