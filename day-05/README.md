# Day 5 - Modern JavaScript & APIs

Applying JavaScript to real-world scenarios: API calls, DOM manipulation, and a complete weather app project.

## Learning Objectives
- Make HTTP requests with Fetch API
- Manipulate the DOM dynamically
- Handle user events
- Store data in localStorage/sessionStorage
- Build a complete weather application

## Concepts Covered

### Fetch API
```js
// GET request
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();
  return users;
}

// POST request
async function createUser(data) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### DOM Manipulation
```js
const el = document.getElementById('app');
el.innerHTML = '<h1>Hello</h1>';
el.style.background = 'blue';
el.classList.toggle('hidden');
```

### Events
```js
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submitted');
});
```

### Web Storage
```js
localStorage.setItem('key', JSON.stringify(value));
const data = JSON.parse(localStorage.getItem('key'));
sessionStorage.setItem('temp', 'data'); // cleared when tab closes
```

### Weather App Project
Complete weather application that takes a city name and fetches weather data from an API. Features:
- City search input
- Real-time weather display (temperature, description, humidity)
- Dynamic DOM updates
- CSS styling for weather UI

## Files
| File | Description |
|------|-------------|
| `18async-await.html` | Async/await with try/catch |
| `19fetchapi.html` | Fetch API GET and POST |
| `20dom.html` | DOM selection, modification, styling |
| `21events.html` | Event listeners, event object, propagation |
| `22storage.html` | localStorage/sessionStorage CRUD |
| `this.html` | 'this' keyword in different contexts |
| `weather-app/index.html` | Weather app UI |
| `weather-app/script.js` | Weather app logic (fetch, DOM) |
| `weather-app/style.css` | Weather app styles |
