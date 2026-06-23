# Day 5: Advanced JavaScript Features - Complete Documentation

## Table of Contents

1. [Introduction to Advanced JavaScript Features](#introduction-to-advanced-javascript-features)
2. [Async/Await - Modern Asynchronous Programming](#asyncawait---modern-asynchronous-programming)
3. [Fetch API - Modern HTTP Client](#fetch-api---modern-http-client)
4. [DOM Manipulation - Document Object Model](#dom-manipulation---document-object-model)
5. [Event Handling](#event-handling)
6. [Browser Storage](#browser-storage)
7. [The 'this' Keyword](#the-this-keyword)
8. [Weather App Project](#weather-app-project)
9. [Complete Code Examples](#complete-code-examples)
10. [Key Learning Objectives](#key-learning-objectives)
11. [Best Practices](#best-practices)
12. [Common Patterns and Use Cases](#common-patterns-and-use-cases)

---

## Introduction to Advanced JavaScript Features

Day 5 focuses on advanced JavaScript features that enable modern web development. This includes async/await for cleaner asynchronous code, the Fetch API for HTTP requests, DOM manipulation for dynamic web pages, event handling for user interactions, browser storage for data persistence, and understanding the 'this' keyword in different contexts.

### What You'll Learn:
- **Async/Await**: Modern asynchronous programming syntax
- **Fetch API**: Making HTTP requests to APIs
- **DOM Manipulation**: Dynamically updating web pages
- **Event Handling**: Responding to user interactions
- **Browser Storage**: Persisting data locally
- **'this' Context**: Understanding JavaScript's context system
- **Real Project**: Building a functional weather application

---

## Async/Await - Modern Asynchronous Programming

Async/await provides a cleaner, more readable way to write asynchronous JavaScript code compared to promises and callbacks.

### Basic Async/Await Syntax
```javascript
// Function that returns a promise
function greet() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Bow Bow");
        }, 2000);
    });
}

function greetMeow() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Meow Meow");
        }, 3000);
    });
}

// Async function without explicit then/catch
async function greetBro1() {
    let greeting = await greet();
    console.log("Greet done");
    console.log(greeting); // "Bow Bow" after 2 seconds
}

// Async function with then/catch chains
async function greetBro2() {
    await greet()
        .then(greet => console.log(greet))
        .catch(error => console.log(error));
   
    await greetMeow()
        .then(greet => console.log(greet))
        .catch(error => console.log(error));
}

// Execute functions
greetBro1();
greetBro2();
```

### Error Handling with Async/Await
```javascript
// Using try-catch with async/await
async function fetchDataSafely() {
    try {
        let result = await someAsyncOperation();
        console.log("Success:", result);
        return result;
    } catch (error) {
        console.error("Error occurred:", error);
        return null;
    }
}

// Multiple async operations
async function sequentialOperations() {
    try {
        let step1 = await firstOperation();
        let step2 = await secondOperation(step1);
        let step3 = await thirdOperation(step2);
        return step3;
    } catch (error) {
        console.error("Operation failed:", error);
        throw error; // Re-throw if needed
    }
}
```

### Parallel vs Sequential Execution
```javascript
// Sequential execution (slower)
async function sequential() {
    let result1 = await greet();      // Wait 2 seconds
    let result2 = await greetMeow();  // Wait 3 more seconds
    console.log(result1, result2);    // Total: 5 seconds
}

// Parallel execution (faster)
async function parallel() {
    let [result1, result2] = await Promise.all([
        greet(),      // Start both simultaneously
        greetMeow()
    ]);
    console.log(result1, result2); // Total: 3 seconds (longest operation)
}

// Parallel with individual handling
async function parallelIndividual() {
    let promise1 = greet();
    let promise2 = greetMeow();
    
    let result1 = await promise1;
    let result2 = await promise2;
    
    console.log(result1, result2);
}
```

---

## Fetch API - Modern HTTP Client

The Fetch API provides a modern, promise-based interface for making HTTP requests, replacing the older XMLHttpRequest.

### Basic Fetch Syntax
```javascript
async function weather() {
    const url = "https://api.weatherapi.com/v1/current.json?key=62f3a367512d4266b6225520241003&q=London";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log(data);
        console.log(data.current.feelslike_c);
    } catch (error) {
        console.error("Failed to fetch weather:", error);
    }
}

weather();
```

### Fetch with Error Handling
```javascript
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Network error:", error.message);
        } else {
            console.error("Fetch error:", error.message);
        }
        return null;
    }
}
```

### Different HTTP Methods
```javascript
// GET request (default)
async function getData() {
    const response = await fetch('/api/data');
    return await response.json();
}

// POST request
async function postData(data) {
    const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// PUT request
async function updateData(id, data) {
    const response = await fetch(`/api/data/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

// DELETE request
async function deleteData(id) {
    const response = await fetch(`/api/data/${id}`, {
        method: 'DELETE'
    });
    return response.ok;
}
```

### Fetch with Headers and Authentication
```javascript
async function fetchWithAuth(url, token) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
    }
    
    return await response.json();
}
```

---

## DOM Manipulation - Document Object Model

DOM manipulation allows JavaScript to dynamically change the content, structure, and styling of web pages.

### Selecting Elements
```javascript
// Get element by ID
const element = document.getElementById("dt");
element.textContent = "Hello world";

// Get elements by class name (returns HTMLCollection)
const elements = document.getElementsByClassName("dtt");
elements[0].textContent = "Bow Bow";

// Modern query selectors (preferred)
const singleElement = document.querySelector("#dt");
const multipleElements = document.querySelectorAll(".dtt");

// More specific selectors
const button = document.querySelector("button#submitBtn");
const inputs = document.querySelectorAll("input[type='text']");
```

### Modifying Content
```javascript
// Text content (safe - escapes HTML)
element.textContent = "Safe text content";

// Inner HTML (can include HTML tags)
element.innerHTML = "<strong>Bold text</strong>";

// Outer HTML (replaces entire element)
element.outerHTML = "<div>New element</div>";

// Attributes
element.setAttribute("class", "new-class");
element.getAttribute("id");
element.removeAttribute("data-old");

// Modern property access
element.id = "newId";
element.className = "newClass";
element.value = "newValue"; // For form inputs
```

### Creating and Manipulating Elements
```javascript
// Create new element
const newDiv = document.createElement("div");
newDiv.textContent = "New content";
newDiv.className = "dynamic-element";

// Add to DOM
document.body.appendChild(newDiv);

// Insert at specific position
const parent = document.getElementById("parent");
const firstChild = parent.firstElementChild;
parent.insertBefore(newDiv, firstChild);

// Remove element
newDiv.remove(); // Modern method
// or
parent.removeChild(newDiv); // Older method
```

### Styling Elements
```javascript
const button = document.getElementById("button");

// Individual style properties
button.style.color = "red";
button.style.backgroundColor = "blue";
button.style.fontSize = "16px";

// Multiple styles at once
button.style.cssText = "color: red; background-color: blue; font-size: 16px;";

// CSS classes (preferred for styling)
button.classList.add("active");
button.classList.remove("inactive");
button.classList.toggle("hidden");
button.classList.contains("active"); // Returns boolean
```

---

## Event Handling

Events allow JavaScript to respond to user interactions and browser actions.

### Basic Event Handling
```javascript
const button = document.getElementById("button");

// Click event
button.addEventListener("click", () => {
    console.log("Button clicked");
});

// Mouse events
button.addEventListener("mouseover", () => {
    button.style.color = "blue";
});

button.addEventListener("mouseout", () => {
    button.style.color = "red";
});
```

### Event Object and Properties
```javascript
button.addEventListener("click", (event) => {
    console.log("Event type:", event.type);
    console.log("Target element:", event.target);
    console.log("Current target:", event.currentTarget);
    console.log("Mouse position:", event.clientX, event.clientY);
    
    // Prevent default behavior
    event.preventDefault();
    
    // Stop event propagation
    event.stopPropagation();
});
```

### Different Types of Events
```javascript
// Form events
const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");
});

input.addEventListener("input", (event) => {
    console.log("Input value:", event.target.value);
});

input.addEventListener("focus", () => {
    console.log("Input focused");
});

input.addEventListener("blur", () => {
    console.log("Input lost focus");
});

// Keyboard events
document.addEventListener("keydown", (event) => {
    console.log("Key pressed:", event.key);
    console.log("Key code:", event.code);
    
    if (event.key === "Enter") {
        console.log("Enter key pressed");
    }
});

// Window events
window.addEventListener("load", () => {
    console.log("Page fully loaded");
});

window.addEventListener("resize", () => {
    console.log("Window resized");
});
```

### Event Delegation
```javascript
// Handle events for dynamically created elements
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("dynamic-button")) {
        console.log("Dynamic button clicked");
    }
});

// More specific delegation
const container = document.getElementById("container");
container.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        console.log("Button in container clicked:", event.target.textContent);
    }
});
```

---

## Browser Storage

Browser storage allows web applications to store data locally on the user's device.

### Local Storage
```javascript
// Store data (persists until manually cleared)
localStorage.setItem('chaman', 'topper');
localStorage.setItem('user', JSON.stringify({
    name: 'John',
    age: 30,
    preferences: ['coding', 'reading']
}));

// Retrieve data
console.log(localStorage.getItem("chaman")); // "topper"

const user = JSON.parse(localStorage.getItem('user'));
console.log(user.name); // "John"

// Remove specific item
localStorage.removeItem('chaman');

// Clear all localStorage
localStorage.clear();

// Check if item exists
if (localStorage.getItem('user')) {
    console.log("User data exists");
}
```

### Session Storage
```javascript
// Store data (persists only for session)
sessionStorage.setItem('harish', 'topper');
sessionStorage.setItem('tempData', JSON.stringify({
    sessionId: '12345',
    startTime: Date.now()
}));

// Retrieve data
console.log(sessionStorage.getItem("harish")); // "topper"

// Session storage has same methods as localStorage
sessionStorage.removeItem('tempData');
sessionStorage.clear();
```

### Cookies
```javascript
// Set cookie with expiration
document.cookie = "name=Chaman; max-age=5"; // Expires in 5 seconds
document.cookie = "theme=dark; max-age=86400"; // Expires in 1 day
document.cookie = "session=abc123; path=/; secure"; // Secure cookie

// Read cookies
console.log(document.cookie); // All cookies as string

// Helper functions for cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
```

### Storage Event Handling
```javascript
// Listen for storage changes (works across tabs)
window.addEventListener('storage', (event) => {
    console.log('Storage changed:');
    console.log('Key:', event.key);
    console.log('Old value:', event.oldValue);
    console.log('New value:', event.newValue);
    console.log('URL:', event.url);
});
```

---

## The 'this' Keyword

The 'this' keyword refers to different objects depending on the context in which it's used.

### Global Context
```javascript
// In global scope (non-strict mode)
console.warn("this in global scope");
console.log(this); // Window object in browser

// In strict mode
"use strict";
console.log(this); // undefined
```

### Object Context
```javascript
console.warn("this in object");
const obj = {
    name: "Chaman",
    age: "22",
    greet() {
        console.log(this.age); // "22" - refers to obj
        console.log(this.name); // "Chaman"
    }
};
obj.greet();

// Method with nested function
const person = {
    name: "John",
    hobbies: ["reading", "coding"],
    showHobbies() {
        console.log(this.name); // "John"
        
        this.hobbies.forEach(function(hobby) {
            console.log(this.name); // undefined (function context)
        });
        
        // Solution: arrow function
        this.hobbies.forEach(hobby => {
            console.log(this.name); // "John" (inherited from parent)
        });
    }
};
```

### Function Context
```javascript
console.warn("this in Function");

function show() {
    console.log(this); // Window object (non-strict) or undefined (strict)
}
show();

// Call, apply, bind to set 'this'
const objContext = { name: "Custom Object" };

function greet() {
    console.log(`Hello, ${this.name}`);
}

greet.call(objContext);    // "Hello, Custom Object"
greet.apply(objContext);   // Same as call
const boundGreet = greet.bind(objContext);
boundGreet();              // "Hello, Custom Object"
```

### Arrow Functions
```javascript
console.warn("this in arrow function");

// Arrow functions inherit 'this' from enclosing scope
let person = (name) => {
    console.log(this.name); // Inherits from global/parent scope
};

const objectWithArrow = {
    name: "Object",
    regularMethod() {
        console.log(this.name); // "Object"
        
        const arrowMethod = () => {
            console.log(this.name); // "Object" (inherited)
        };
        arrowMethod();
    }
};
```

### Constructor Context
```javascript
console.warn("this in constructor");

// Function constructor
function Fruit(name) {
    this.name = name;
    this.getName = function() {
        return this.name;
    };
}

const apple = new Fruit("Apple");
console.log(apple.getName()); // "Apple"

// Class constructor
class Vegetable {
    constructor(name) {
        this.name = name;
    }
    
    getName() {
        return this.name;
    }
}

const carrot = new Vegetable("Carrot");
console.log(carrot.getName()); // "Carrot"
```

---

## Weather App Project

A comprehensive weather application demonstrating all the concepts covered in Day 5.

### HTML Structure (index.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Weather</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>Weather</h1>
        <input type="text" id="city" placeholder="Enter city" oninput="searchCities()">
        <div id="suggestions"></div>
        <button onclick="getWeather()">Search</button>
        <div id="result"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### JavaScript Functionality (script.js)
```javascript
const key = '62f3a367512d4266b6225520241003';

async function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const result = document.getElementById('result');
        
        if (data.error) {
            result.innerHTML = '<p>City not found</p>';
        } else {
            const cityName = data.location.name;
            const condition = data.current.condition.text;
            const icon = data.current.condition.icon;
            const temp = data.current.temp_c;
            
            result.innerHTML = `
                <div class="weather">
                    <h2>${cityName}</h2>
                    <img src="https:${icon}" alt="${condition}">
                    <p class="temp">${temp}°C</p>
                    <p>${condition}</p>
                </div>
            `;
            
            // Save to localStorage
            const weatherData = {
                city: cityName,
                temperature: temp,
                condition: condition,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('lastWeatherSearch', JSON.stringify(weatherData));
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('result').innerHTML = '<p>Error fetching weather data</p>';
    }
}

async function searchCities() {
    const text = document.getElementById('city').value;
    const suggestions = document.getElementById('suggestions');
    
    if (text.length < 2) {
        suggestions.style.display = 'none';
        return;
    }
    
    try {
        const url = `https://api.weatherapi.com/v1/search.json?key=${key}&q=${text}`;
        const response = await fetch(url);
        const cities = await response.json();
        
        suggestions.innerHTML = cities.map(city => 
            `<div onclick="selectCity('${city.name}')">${city.name}, ${city.country}</div>`
        ).join('');
        
        suggestions.style.display = cities.length > 0 ? 'block' : 'none';
    } catch (error) {
        console.error('Error searching cities:', error);
        suggestions.style.display = 'none';
    }
}

function selectCity(name) {
    document.getElementById('city').value = name;
    document.getElementById('suggestions').style.display = 'none';
    getWeather();
}

// Load last search on page load
window.addEventListener('load', () => {
    const lastSearch = localStorage.getItem('lastWeatherSearch');
    if (lastSearch) {
        const data = JSON.parse(lastSearch);
        console.log('Last search:', data);
        // Optionally populate the search field with last city
    }
});

// Handle Enter key in search input
document.getElementById('city').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeather();
    }
});
```

### CSS Styling (style.css)
```css
body {
    background: linear-gradient(135deg, #8C52FF, #5CE1E6);
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
}

#app {
    background: rgba(255, 255, 255, 0.3);
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    backdrop-filter: blur(10px);
    position: relative;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    max-width: 400px;
    width: 100%;
}

h1 {
    color: white;
    margin-bottom: 20px;
    font-size: 2.5em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

input {
    padding: 12px 15px;
    border: none;
    border-radius: 8px;
    width: 200px;
    margin-bottom: 10px;
    font-size: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

#suggestions {
    position: absolute;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    display: none;
    width: 200px;
    left: 50%;
    transform: translateX(-50%);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
}

#suggestions div {
    padding: 12px 15px;
    cursor: pointer;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s;
}

#suggestions div:hover {
    background: #f8f9fa;
}

#suggestions div:last-child {
    border-bottom: none;
}

button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    cursor: pointer;
    margin-left: 10px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

button:active {
    transform: translateY(0);
}

.weather {
    color: white;
    margin-top: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(5px);
}

.weather h2 {
    margin: 0 0 15px 0;
    font-size: 1.8em;
}

.temp {
    font-size: 3em;
    margin: 15px 0;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.weather img {
    width: 80px;
    height: 80px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
}

.weather p:last-child {
    font-size: 1.2em;
    margin: 10px 0 0 0;
    opacity: 0.9;
}

/* Responsive design */
@media (max-width: 480px) {
    #app {
        margin: 10px;
        padding: 20px;
    }
    
    input {
        width: 160px;
    }
    
    #suggestions {
        width: 160px;
    }
    
    .temp {
        font-size: 2.5em;
    }
}
```

---

## Complete Code Examples

### Example 1: Async/Await (18async-await.html)
```javascript
/**
 * Demonstrates async/await patterns for asynchronous programming
 */

function greet() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Bow Bow");
        }, 2000);
    });
}

function greetmeow() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Meow Meow");
        }, 3000);
    });
}

// Without explicit then/catch
async function greetbro1() {
    let greeting = await greet();
    console.log("Greet done");
    console.log(greeting);
}

// With then/catch chains
async function greetbro2() {
    await greet()
        .then(greet => console.log(greet))
        .catch(error => console.log(error));
   
    await greetmeow()
        .then(greet => console.log(greet))
        .catch(error => console.log(error));
}

greetbro1();
greetbro2();
```

### Example 2: Fetch API (19fetchapi.html)
```javascript
/**
 * Weather API fetch example
 */

async function weather() {
    const url = "https://api.weatherapi.com/v1/current.json?key=62f3a367512d4266b6225520241003&q=London";
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        console.log(`Temperature feels like: ${data.current.feelslike_c}°C`);
        
        return data;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
}

weather();
```

### Example 3: DOM Manipulation (20dom.html)
```javascript
/**
 * Basic DOM manipulation examples
 */

// Select elements and modify content
const titleElement = document.getElementById("dt");
titleElement.textContent = "Hello world";

const classElements = document.getElementsByClassName("dtt");
classElements[0].textContent = "Bow Bow";

// Modern query selectors
const modernSelect = document.querySelector("#dt");
const allElements = document.querySelectorAll(".dtt");

// Dynamic content creation
function createDynamicContent() {
    const container = document.createElement("div");
    container.className = "dynamic-container";
    container.innerHTML = `
        <h3>Dynamic Content</h3>
        <p>This was created with JavaScript</p>
        <button onclick="alert('Dynamic button clicked!')">Click me</button>
    `;
    
    document.body.appendChild(container);
}

createDynamicContent();
```

### Example 4: Event Handling (21events.html)
```javascript
/**
 * Comprehensive event handling examples
 */

const button = document.getElementById("button");
button.style.color = "red";

// Click event
button.addEventListener("click", (event) => {
    console.log("Button clicked");
    console.log("Event details:", {
        type: event.type,
        target: event.target.tagName,
        timestamp: new Date().toISOString()
    });
});

// Mouse events with state management
let isHovered = false;

button.addEventListener("mouseover", () => {
    button.style.color = "blue";
    button.style.transform = "scale(1.1)";
    button.style.transition = "all 0.3s ease";
    isHovered = true;
});

button.addEventListener("mouseout", () => {
    button.style.color = "red";
    button.style.transform = "scale(1)";
    isHovered = false;
});

// Keyboard events
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && isHovered) {
        button.click();
    }
});

// Form handling
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Form submission prevented for demo");
    });
}
```

### Example 5: Browser Storage (22storage.html)
```javascript
/**
 * Browser storage comprehensive examples
 */

// LocalStorage operations
localStorage.setItem('chaman', 'topper');
console.log(localStorage.getItem("chaman"));

// Complex object storage
const userProfile = {
    name: "Chaman",
    preferences: {
        theme: "dark",
        notifications: true
    },
    lastLogin: new Date().toISOString()
};

localStorage.setItem('userProfile', JSON.stringify(userProfile));
const retrievedProfile = JSON.parse(localStorage.getItem('userProfile'));
console.log("User profile:", retrievedProfile);

// SessionStorage operations
sessionStorage.setItem('harish', 'topper');
console.log(sessionStorage.getItem("harish"));

// Session-specific data
const sessionData = {
    sessionId: Math.random().toString(36).substr(2, 9),
    startTime: Date.now(),
    pageViews: 1
};
sessionStorage.setItem('sessionData', JSON.stringify(sessionData));

// Cookie operations
document.cookie = "name=Chaman; max-age=5"; // 5 seconds
document.cookie = "theme=dark; max-age=86400; path=/"; // 1 day, all paths

console.log("All cookies:", document.cookie);

// Storage utility functions
const StorageManager = {
    // Safe localStorage operations
    setLocal(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error("LocalStorage error:", error);
            return false;
        }
    },
    
    getLocal(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("LocalStorage parse error:", error);
            return null;
        }
    },
    
    // Cookie helpers
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    },
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};

// Usage examples
StorageManager.setLocal('userSettings', { theme: 'dark', language: 'en' });
const settings = StorageManager.getLocal('userSettings');
console.log("User settings:", settings);
```

---

## Key Learning Objectives

After completing Day 5, students should understand:

### Asynchronous Programming
1. **Async/Await Syntax**: Modern way to handle asynchronous operations
2. **Promise Integration**: Combining async/await with promises
3. **Error Handling**: Try-catch blocks with async functions
4. **Parallel vs Sequential**: Optimizing async operation timing

### HTTP Communication
1. **Fetch API**: Modern alternative to XMLHttpRequest
2. **HTTP Methods**: GET, POST, PUT, DELETE operations
3. **Request Configuration**: Headers, body, authentication
4. **Response Handling**: Status codes, data parsing, error management

### DOM Interaction
1. **Element Selection**: Modern query methods
2. **Content Manipulation**: Text, HTML, attributes
3. **Dynamic Creation**: Creating and inserting elements
4. **Style Management**: CSS classes and inline styles

### User Interaction
1. **Event Types**: Mouse, keyboard, form, window events
2. **Event Object**: Properties and methods
3. **Event Delegation**: Handling dynamic content
4. **Event Prevention**: stopPropagation, preventDefault

### Data Persistence
1. **Storage Types**: LocalStorage, SessionStorage, Cookies
2. **Data Serialization**: JSON stringify/parse
3. **Storage Limits**: Size and browser differences
4. **Security Considerations**: Data sensitivity and expiration

### Context Understanding
1. **'this' Binding**: Different contexts and behaviors
2. **Arrow Functions**: Lexical this binding
3. **Method Binding**: call, apply, bind methods
4. **Constructor Context**: Class and function constructors

---

## Best Practices

### Async/Await
- **Always use try-catch** for error handling
- **Prefer async/await over .then()** for readability
- **Use Promise.all()** for parallel operations
- **Avoid blocking the main thread** with heavy async operations

### Fetch API
- **Check response.ok** before processing data
- **Handle network errors** separately from HTTP errors
- **Set appropriate timeouts** for requests
- **Use AbortController** for cancellable requests

### DOM Manipulation
- **Use modern query selectors** (querySelector/All)
- **Prefer textContent over innerHTML** for security
- **Batch DOM updates** to avoid layout thrashing
- **Use event delegation** for dynamic content

### Event Handling
- **Use addEventListener** instead of inline handlers
- **Remove event listeners** when no longer needed
- **Debounce frequent events** (scroll, resize, input)
- **Use passive listeners** for touch/scroll events

### Storage
- **Validate data** before storing
- **Handle storage quota exceeded** errors
- **Use appropriate storage type** for data lifetime
- **Encrypt sensitive data** before storing

### Code Organization
- **Separate concerns** (HTML, CSS, JavaScript)
- **Use meaningful variable names**
- **Comment complex logic**
- **Follow consistent code style**

---

## Common Patterns and Use Cases

### API Integration Pattern
```javascript
class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.weatherapi.com/v1';
    }
    
    async getCurrentWeather(city) {
        const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Weather fetch failed:', error);
            throw error;
        }
    }
    
    async searchCities(query) {
        const url = `${this.baseUrl}/search.json?key=${this.apiKey}&q=${query}`;
        
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('City search failed:', error);
            return [];
        }
    }
}
```

### State Management Pattern
```javascript
class AppState {
    constructor() {
        this.state = this.loadState();
        this.listeners = [];
    }
    
    loadState() {
        const saved = localStorage.getItem('appState');
        return saved ? JSON.parse(saved) : {
            currentCity: '',
            weatherData: null,
            favorites: []
        };
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.saveState();
        this.notifyListeners();
    }
    
    saveState() {
        localStorage.setItem('appState', JSON.stringify(this.state));
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
    }
    
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }
}
```

### Debounced Search Pattern
```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage
const debouncedSearch = debounce(async (query) => {
    if (query.length > 2) {
        const results = await searchCities(query);
        displaySuggestions(results);
    }
}, 300);

document.getElementById('searchInput').addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

This comprehensive Day 5 documentation covers all modern JavaScript features essential for building interactive web applications, including real-world examples and best practices for each concept.