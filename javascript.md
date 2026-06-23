# JavaScript

## Days
- [Day 3 - JavaScript Basics](../day-03/)
- [Day 4 - Advanced JavaScript](../day-04/)
- [Day 5 - Modern JavaScript & APIs](../day-05/)

## JavaScript Basics

Core language fundamentals: variables, functions, objects, arrays, DOM manipulation, events.

### Key Concepts
- **Variables**: `let` (mutable), `const` (immutable), `var` (function-scoped, avoid)
- **Functions**: declarations, expressions, arrow functions (`() => {}`)
- **Scope**: global, function, block. Hoisting moves declarations to top
- **DOM**: `document.getElementById()`, `querySelector()`, `classList`, `addEventListener()`
- **Arrays**: `map()`, `filter()`, `reduce()`, `find()`, `forEach()`

### Example
```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((a, b) => a + b, 0);
```

## Advanced JavaScript

ES6+ features, async programming, modules, and performance patterns.

### Key Concepts
- **Destructuring**: `const { name, age } = person`, `const [first, ...rest] = arr`
- **Spread/Rest**: `[...arr]`, `{...obj}`, `function(...args)`
- **Async**: Promises (`new Promise()`), async/await (`async function`)
- **Modules**: `export` / `import`, default vs named exports
- **Performance**: Debounce (delay execution), Throttle (limit execution rate)
- **Storage**: `localStorage` (persists), `sessionStorage` (per tab)

### Example
```js
async function fetchUsers() {
  try {
    const res = await fetch('/api/users');
    return await res.json();
  } catch (err) {
    console.error('Failed:', err);
  }
}
```

## Modern JavaScript & APIs

Fetch API, DOM manipulation, event handling, and a complete weather app project.

### Weather App
A complete weather application that:
- Takes city name as input
- Fetches weather data from OpenWeatherMap API
- Displays temperature, description, humidity
- Updates DOM dynamically
- Has live search suggestions
