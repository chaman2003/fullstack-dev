# Complete Fullstack Development Course - Master Documentation

## Master Table of Contents

### **Frontend Development Foundation (Days 1-5)**
1. [Day 1: HTML Fundamentals](#day-1-html-fundamentals)
2. [Day 2: CSS Styling and Design](#day-2-css-styling-and-design)
3. [Day 3: JavaScript Basics](#day-3-javascript-basics)
4. [Day 4: Advanced JavaScript](#day-4-advanced-javascript)
5. [Day 5: Modern JavaScript and APIs](#day-5-modern-javascript-and-apis)

### **React Development Framework (Days 6-10)**
6. [Day 6: React Introduction](#day-6-react-introduction)
7. [Day 7: React Hooks Fundamentals](#day-7-react-hooks-fundamentals)
8. [Day 8: Advanced React Hooks](#day-8-advanced-react-hooks)
9. [Day 9: React Router and Navigation](#day-9-react-router-and-navigation)
10. [Day 10: React Code Splitting and Performance](#day-10-react-code-splitting-and-performance)

### **Backend Development Stack (Days 11-14)**
11. [Day 11-12: Node.js and Express.js](#day-11-12-nodejs-and-expressjs)
12. [Day 13-14: Database Integration and Authentication](#day-13-14-database-integration-and-authentication)

### **Practical Application**
13. [Movie Project: Complete React Application](#movie-project-complete-react-application)

### **Course Summary and Resources**
14. [Complete Technology Stack Overview](#complete-technology-stack-overview)
15. [Development Best Practices](#development-best-practices)
16. [Career Progression Path](#career-progression-path)

---

## Course Overview

This comprehensive 14-day fullstack development course covers the complete journey from frontend fundamentals to full-stack application development. The curriculum progresses systematically through:

- **HTML5 & CSS3**: Modern web standards and responsive design
- **JavaScript ES6+**: Modern programming concepts and asynchronous operations
- **React 19**: Component-based frontend framework with hooks and routing
- **Node.js & Express.js**: Server-side JavaScript and RESTful APIs
- **MongoDB & Authentication**: Database integration and security implementation

### Learning Objectives
By completion, students will be able to:
1. Build responsive, accessible web interfaces using HTML5 and CSS3
2. Implement dynamic functionality with modern JavaScript
3. Develop component-based applications using React
4. Create server-side applications with Node.js and Express
5. Integrate databases and implement authentication systems
6. Deploy and maintain full-stack web applications

---

# Day 1: HTML Fundamentals

## Introduction to HTML5

HTML (HyperText Markup Language) is the standard markup language for creating web pages. HTML5 is the latest version, providing semantic elements, multimedia support, and improved accessibility.

### Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <!-- Page content -->
</body>
</html>
```

### Semantic HTML Elements
```html
<header>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    </nav>
</header>

<main>
    <section>
        <article>
            <h1>Article Title</h1>
            <p>Article content...</p>
        </article>
    </section>
    
    <aside>
        <h2>Related Links</h2>
    </aside>
</main>

<footer>
    <p>&copy; 2024 Company Name</p>
</footer>
```

### Forms and Input Elements
```html
<form action="/submit" method="POST">
    <fieldset>
        <legend>Personal Information</legend>
        
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4"></textarea>
        
        <button type="submit">Submit</button>
    </fieldset>
</form>
```

### Multimedia Integration
```html
<!-- Images -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- Audio -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    Your browser does not support audio.
</audio>

<!-- Video -->
<video controls width="600">
    <source src="video.mp4" type="video/mp4">
    Your browser does not support video.
</video>
```

---

# Day 2: CSS Styling and Design

## CSS3 Fundamentals

CSS (Cascading Style Sheets) controls the presentation and layout of HTML documents. CSS3 introduces advanced selectors, animations, and responsive design features.

### Selectors and Properties
```css
/* Element selector */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
}

/* Class selector */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* ID selector */
#header {
    background-color: #333;
    color: white;
    padding: 1rem;
}

/* Attribute selector */
input[type="text"] {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
}
```

### Flexbox Layout
```css
.flex-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.flex-item {
    flex: 1;
    min-width: 200px;
}
```

### CSS Grid System
```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
}

.grid-item {
    background: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
}
```

### Responsive Design
```css
/* Mobile-first approach */
.responsive-container {
    width: 100%;
    padding: 10px;
}

/* Tablet styles */
@media (min-width: 768px) {
    .responsive-container {
        width: 750px;
        margin: 0 auto;
        padding: 20px;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .responsive-container {
        width: 1000px;
        padding: 30px;
    }
}
```

---

# Day 3: JavaScript Basics

## JavaScript Fundamentals

JavaScript is a dynamic programming language that enables interactive web pages. Modern JavaScript (ES6+) provides powerful features for web development.

### Variables and Data Types
```javascript
// Variable declarations
let name = "John Doe";
const age = 30;
var city = "New York"; // Avoid var in modern JavaScript

// Data types
let number = 42;
let string = "Hello World";
let boolean = true;
let array = [1, 2, 3, 4, 5];
let object = {
    name: "Alice",
    age: 25,
    city: "Boston"
};
let nullValue = null;
let undefinedValue = undefined;
```

### Functions and Scope
```javascript
// Function declaration
function calculateArea(length, width) {
    return length * width;
}

// Arrow function
const calculatePerimeter = (length, width) => {
    return 2 * (length + width);
};

// Function scope
function outerFunction() {
    let outerVariable = "I'm outside";
    
    function innerFunction() {
        let innerVariable = "I'm inside";
        console.log(outerVariable); // Accessible
    }
    
    return innerFunction;
}
```

### Control Structures
```javascript
// Conditional statements
if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}

// Switch statement
switch (day) {
    case 'Monday':
        console.log("Start of work week");
        break;
    case 'Friday':
        console.log("TGIF!");
        break;
    default:
        console.log("Regular day");
}

// Loops
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
    console.log(fruit);
}
```

### Objects and Arrays
```javascript
// Object creation and manipulation
const person = {
    name: "Jane",
    age: 28,
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);
```

---

# Day 4: Advanced JavaScript

## Advanced Programming Concepts

### Destructuring and Spread Operator
```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, ...otherProps } = person;

// Spread operator
const newArray = [...numbers, 6, 7, 8];
const newObject = { ...person, city: "Seattle" };
```

### Promises and Async/Await
```javascript
// Promise creation
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data received");
        }, 1000);
    });
}

// Using promises
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Async/await
async function getData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

### Error Handling
```javascript
try {
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    if (error instanceof TypeError) {
        console.error("Type error:", error.message);
    } else {
        console.error("Unknown error:", error);
    }
} finally {
    console.log("Cleanup operations");
}
```

### JSON and Local Storage
```javascript
// JSON operations
const user = { name: "Alice", age: 30 };
const jsonString = JSON.stringify(user);
const parsedUser = JSON.parse(jsonString);

// Local storage
localStorage.setItem('user', JSON.stringify(user));
const savedUser = JSON.parse(localStorage.getItem('user'));
```

---

# Day 5: Modern JavaScript and APIs

## Fetch API and DOM Manipulation

### Fetch API Usage
```javascript
// GET request
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// POST request
async function createUser(userData) {
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.error('Create user error:', error);
    }
}
```

### DOM Manipulation
```javascript
// Element selection
const element = document.getElementById('myElement');
const elements = document.querySelectorAll('.my-class');

// Content modification
element.textContent = "New text content";
element.innerHTML = "<strong>New HTML content</strong>";

// Style manipulation
element.style.color = "blue";
element.classList.add('active');
element.classList.toggle('visible');

// Event handling
element.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Element clicked');
});
```

### Weather Application Example
```javascript
class WeatherApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }

    async getCurrentWeather(city) {
        try {
            const response = await fetch(
                `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch weather data');
        }
    }

    displayWeather(weatherData) {
        const weatherContainer = document.getElementById('weather-container');
        weatherContainer.innerHTML = `
            <h2>${weatherData.name}</h2>
            <p>Temperature: ${weatherData.main.temp}°C</p>
            <p>Description: ${weatherData.weather[0].description}</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
        `;
    }
}
```

---

# Day 6: React Introduction

## Getting Started with React

React is a JavaScript library for building user interfaces using a component-based architecture.

### Project Setup
```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

### Component Basics
```jsx
// Functional component
function Welcome({ name }) {
    return <h1>Hello, {name}!</h1>;
}

// Component with multiple elements
function UserProfile({ user }) {
    return (
        <div className="user-profile">
            <img src={user.avatar} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}

// App component
function App() {
    const user = {
        name: "Alice Johnson",
        email: "alice@example.com",
        avatar: "avatar.jpg"
    };

    return (
        <div className="App">
            <Welcome name="React Developer" />
            <UserProfile user={user} />
        </div>
    );
}
```

### JSX and Props
```jsx
// JSX expressions
function ProductCard({ product }) {
    const isOnSale = product.price < product.originalPrice;
    
    return (
        <div className={`product-card ${isOnSale ? 'on-sale' : ''}`}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {isOnSale && <span className="sale-badge">On Sale!</span>}
            <button onClick={() => console.log(`Added ${product.name} to cart`)}>
                Add to Cart
            </button>
        </div>
    );
}
```

### Lists and Keys
```jsx
function TodoList({ todos }) {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                    <input 
                        type="checkbox" 
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <span>{todo.text}</span>
                </li>
            ))}
        </ul>
    );
}
```

---

# Day 7: React Hooks Fundamentals

## Essential React Hooks

### useState Hook
```jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(prevCount => prevCount - 1);

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <p>Hello, {name}!</p>
        </div>
    );
}
```

### useEffect Hook
```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true);
                const response = await fetch(`/api/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        }

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    // Cleanup effect
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Timer tick');
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}
```

### Custom Hooks
```jsx
// Custom hook for API calls
function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data, loading, error };
}

// Using the custom hook
function PostList() {
    const { data: posts, loading, error } = useApi('/api/posts');

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {posts.map(post => (
                <article key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                </article>
            ))}
        </div>
    );
}
```

---

# Day 8: Advanced React Hooks

## Advanced Hook Patterns

### useContext Hook
```jsx
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Theme provider component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use theme
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Component using theme context
function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`header ${theme}`}>
            <h1>My App</h1>
            <button onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
            </button>
        </header>
    );
}
```

### useReducer Hook
```jsx
import { useReducer } from 'react';

// Reducer function
function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, {
                    id: Date.now(),
                    text: action.payload,
                    completed: false
                }]
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        default:
            return state;
    }
}

// Component using useReducer
function TodoApp() {
    const [state, dispatch] = useReducer(todoReducer, {
        todos: [],
        filter: 'all'
    });

    const addTodo = (text) => {
        dispatch({ type: 'ADD_TODO', payload: text });
    };

    const toggleTodo = (id) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    const deleteTodo = (id) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    return (
        <div>
            <AddTodoForm onAdd={addTodo} />
            <TodoList 
                todos={state.todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />
        </div>
    );
}
```

### useCallback and useMemo
```jsx
import { useState, useCallback, useMemo } from 'react';

function ExpensiveComponent({ items, filter }) {
    const [count, setCount] = useState(0);

    // Memoize expensive calculation
    const filteredItems = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item => 
            item.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [items, filter]);

    // Memoize callback function
    const handleItemClick = useCallback((itemId) => {
        console.log(`Item ${itemId} clicked`);
        setCount(prevCount => prevCount + 1);
    }, []);

    return (
        <div>
            <p>Click count: {count}</p>
            <ItemList 
                items={filteredItems}
                onItemClick={handleItemClick}
            />
        </div>
    );
}
```

---

# Day 9: React Router and Navigation

## React Router Implementation

### Router Setup
```jsx
import { 
    createBrowserRouter, 
    RouterProvider, 
    Link, 
    useNavigate,
    useParams 
} from 'react-router-dom';

// Layout component
function Layout() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/products">Products</Link>
            </nav>
            <Outlet />
        </div>
    );
}

// Router configuration
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'products',
                element: <Products />
            },
            {
                path: 'products/:id',
                element: <ProductDetail />
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}
```

### Navigation Components
```jsx
function Products() {
    const products = [
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Phone' },
        { id: 3, name: 'Tablet' }
    ];

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            {product.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>Product {id}</h1>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
}
```

### Protected Routes
```jsx
function ProtectedRoute({ children }) {
    const isAuthenticated = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
}

// Usage in router
{
    path: 'dashboard',
    element: (
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    )
}
```

---

# Day 10: React Code Splitting and Performance

## Performance Optimization

### Lazy Loading Components
```jsx
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Suspense>
        </Router>
    );
}
```

### React.memo and Component Optimization
```jsx
import { memo, useCallback, useMemo } from 'react';

// Memoized component
const ExpensiveChild = memo(function ExpensiveChild({ data, onUpdate }) {
    console.log('ExpensiveChild rendered');
    
    const processedData = useMemo(() => {
        return data.map(item => ({
            ...item,
            processed: true
        }));
    }, [data]);

    return (
        <div>
            {processedData.map(item => (
                <div key={item.id} onClick={() => onUpdate(item.id)}>
                    {item.name}
                </div>
            ))}
        </div>
    );
});

function Parent() {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const handleUpdate = useCallback((id) => {
        setData(prevData => 
            prevData.map(item => 
                item.id === id ? { ...item, updated: true } : item
            )
        );
    }, []);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
            <ExpensiveChild data={data} onUpdate={handleUpdate} />
        </div>
    );
}
```

---

# Day 11-12: Node.js and Express.js

## Backend Development Fundamentals

### Node.js Setup and Modules
```javascript
// Package.json
{
    "name": "express-server",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    },
    "dependencies": {
        "express": "^5.1.0",
        "cors": "^2.8.5",
        "morgan": "^1.10.0"
    }
}
```

### Express.js Server Setup
```javascript
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    res.json(users);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### RESTful API Implementation
```javascript
// In-memory data store
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

// POST new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.status(204).send();
});
```

---

# Day 13-14: Database Integration and Authentication

## MongoDB and Authentication

### Database Setup
```javascript
import mongoose from 'mongoose';

// MongoDB connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

// User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
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
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
```

### Authentication with JWT
```javascript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register user
app.post('/auth/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        
        await user.save();
        
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login user
app.post('/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ 
        message: 'Access granted',
        user: req.user 
    });
});
```

---

# Movie Project: Complete React Application

## Project Overview

The Movie Project demonstrates a complete React application with modern development practices including component architecture, routing, and state management.

### Key Features
- Movie browsing and search functionality
- React Router for navigation
- Component-based architecture
- Responsive design with CSS modules
- State management with hooks

### Project Structure
```
movie-project/
├── src/
│   ├── Components/
│   │   ├── MovieCards.jsx
│   │   └── Navbar.jsx
│   ├── Pages/
│   │   ├── Home.jsx
│   │   └── Favourites.jsx
│   ├── styles/
│   │   ├── navbar.css
│   │   ├── home.css
│   │   └── favourite.css
│   └── App.jsx
└── package.json
```

### Application Implementation
```jsx
// App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Favourites from './Pages/Favourites';

function App() {
    const router = createBrowserRouter([
        {
            element: <Navbar />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/favourites",
                    element: <Favourites />,
                },
            ]
        }
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
```

---

# Complete Technology Stack Overview

## Frontend Technologies
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript ES6+**: Modern language features
- **React 19**: Component-based UI library
- **React Router**: Client-side routing
- **Vite**: Fast build tool and development server

## Backend Technologies
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL document database
- **Mongoose**: MongoDB object modeling

## Authentication & Security
- **bcryptjs**: Password hashing
- **JSON Web Tokens**: Stateless authentication
- **Express Session**: Session management
- **CORS**: Cross-origin resource sharing

## Development Tools
- **ESLint**: Code linting and quality
- **npm**: Package management
- **Git**: Version control
- **VS Code**: Development environment

---

# Development Best Practices

## Code Organization
1. **Component Structure**: Logical separation of components, pages, and utilities
2. **File Naming**: Consistent naming conventions
3. **Import Organization**: Clean import statements
4. **CSS Modules**: Component-specific styling

## Performance Optimization
1. **Code Splitting**: Lazy loading for better performance
2. **Memoization**: React.memo, useMemo, useCallback
3. **Bundle Optimization**: Tree shaking and minification
4. **Image Optimization**: Lazy loading and responsive images

## Security Practices
1. **Input Validation**: Client and server-side validation
2. **Authentication**: Secure token-based authentication
3. **Authorization**: Role-based access control
4. **Error Handling**: Secure error responses

## Testing Strategies
1. **Unit Testing**: Component and function testing
2. **Integration Testing**: API and component integration
3. **End-to-End Testing**: Full application workflows
4. **Code Coverage**: Comprehensive test coverage

---

# Career Progression Path

## Junior Developer (0-2 years)
- Master HTML, CSS, and JavaScript fundamentals
- Learn React or another frontend framework
- Understand basic backend concepts
- Practice with personal projects

## Mid-Level Developer (2-5 years)
- Advanced framework knowledge
- Full-stack development skills
- Database design and optimization
- Testing and deployment practices

## Senior Developer (5+ years)
- System architecture and design
- Performance optimization
- Code review and mentoring
- Technology leadership

## Specialization Paths
1. **Frontend Specialist**: Advanced UI/UX, performance optimization
2. **Backend Specialist**: System design, database optimization
3. **Full-Stack Architect**: Complete system design and implementation
4. **DevOps Engineer**: Deployment, scaling, and infrastructure

---

## Conclusion

This comprehensive fullstack development course provides a complete foundation for modern web development. The progression from HTML fundamentals through advanced React patterns and backend integration prepares developers for real-world application development.

### Key Takeaways
1. **Progressive Learning**: Building knowledge systematically from basics to advanced concepts
2. **Practical Application**: Real projects demonstrate concepts in action
3. **Modern Practices**: Current industry standards and best practices
4. **Complete Stack**: Frontend and backend integration skills

### Next Steps
1. Build more complex applications
2. Explore advanced topics like microservices
3. Learn cloud deployment and scaling
4. Contribute to open-source projects

### Resources for Continued Learning
- Official documentation for each technology
- Online communities and forums
- Advanced courses and certifications
- Industry blogs and tutorials

---

*This documentation serves as a comprehensive reference for the complete fullstack development journey, providing both theoretical knowledge and practical implementation examples.*