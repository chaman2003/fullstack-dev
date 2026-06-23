# Day 6: React Introduction - Complete Documentation

## Table of Contents

1. [Introduction to React](#introduction-to-react)
2. [React Setup and Project Structure](#react-setup-and-project-structure)
3. [JSX - JavaScript XML](#jsx---javascript-xml)
4. [Components - Building Blocks](#components---building-blocks)
5. [Props - Component Communication](#props---component-communication)
6. [Event Handling in React](#event-handling-in-react)
7. [Conditional Rendering](#conditional-rendering)
8. [Lists and Keys](#lists-and-keys)
9. [Project Structure and Organization](#project-structure-and-organization)
10. [Complete Code Examples](#complete-code-examples)
11. [Key Learning Objectives](#key-learning-objectives)
12. [Best Practices](#best-practices)
13. [Common Patterns and Use Cases](#common-patterns-and-use-cases)

---

## Introduction to React

React is a powerful JavaScript library for building user interfaces, particularly web applications. Created by Facebook (now Meta), React allows developers to create reusable UI components and manage application state efficiently.

### What is React?
- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Describe what the UI should look like for any given state
- **Virtual DOM**: Efficient updates through a virtual representation of the DOM
- **Unidirectional Data Flow**: Data flows down, events flow up

### Why React?
- **Reusability**: Write once, use anywhere
- **Performance**: Virtual DOM optimization
- **Large Ecosystem**: Vast library and tool support
- **Community**: Strong developer community and resources
- **Job Market**: High demand for React developers

### React vs Vanilla JavaScript
```javascript
// Vanilla JavaScript
const element = document.createElement('h1');
element.textContent = 'Hello World';
element.onclick = () => alert('Clicked!');
document.body.appendChild(element);

// React (more declarative)
const element = <h1 onClick={() => alert('Clicked!')}>Hello World</h1>;
```

---

## React Setup and Project Structure

Modern React development uses build tools like Vite for fast development and optimized builds.

### Project Structure Overview
```
intro/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Welcome.jsx
│   │   └── Jsx.jsx
│   ├── props/
│   │   ├── Props.jsx
│   │   ├── Props2.jsx
│   │   ├── Functionprop.jsx
│   │   ├── Ternaryprop.jsx
│   │   ├── ArrayProp.jsx
│   │   ├── ObjectProp.jsx
│   │   └── Proptypes.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

### Package.json Configuration
```json
{
  "name": "intro",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react": "^5.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^7.1.2"
  }
}
```

### Main Entry Point (main.jsx)
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Key Concepts:**
- **StrictMode**: Helps identify potential problems in development
- **createRoot**: Modern React 18+ rendering method
- **Component Import**: ES6 module syntax for importing components

---

## JSX - JavaScript XML

JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.

### Basic JSX Syntax
```jsx
function Jsx() {
    const name = 'chaman';
    return (
        <h1>Hello {name}</h1>
    );
}

export default Jsx;
```

### JSX Rules and Features
```jsx
function JsxExamples() {
    const name = 'React Developer';
    const isLoggedIn = true;
    const users = ['Alice', 'Bob', 'Charlie'];
    
    return (
        <div>
            {/* JavaScript expressions in curly braces */}
            <h1>Hello {name}</h1>
            
            {/* Mathematical expressions */}
            <p>2 + 2 = {2 + 2}</p>
            
            {/* Function calls */}
            <p>Current time: {new Date().toLocaleTimeString()}</p>
            
            {/* Conditional rendering */}
            {isLoggedIn && <p>Welcome back!</p>}
            
            {/* Array rendering */}
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
            
            {/* Inline styles (object notation) */}
            <div style={{
                backgroundColor: 'lightblue',
                padding: '10px',
                borderRadius: '5px'
            }}>
                Styled div
            </div>
            
            {/* Class names (className, not class) */}
            <div className="custom-class">
                CSS class applied
            </div>
        </div>
    );
}
```

### JSX vs HTML Differences
```jsx
// JSX differences from HTML
function JsxDifferences() {
    return (
        <div>
            {/* className instead of class */}
            <div className="container">Content</div>
            
            {/* htmlFor instead of for */}
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" />
            
            {/* Self-closing tags must have closing slash */}
            <img src="image.jpg" alt="Description" />
            <br />
            <hr />
            
            {/* camelCase for event handlers */}
            <button onClick={handleClick}>Click me</button>
            
            {/* Style object instead of string */}
            <div style={{ fontSize: '16px', color: 'blue' }}>
                Styled text
            </div>
        </div>
    );
}
```

---

## Components - Building Blocks

Components are the foundation of React applications. They encapsulate UI logic and can be reused throughout the application.

### Function Components
```jsx
// Basic function component
function Welcome() {
    return (
        <div>
            <h1>Welcome bro</h1>
        </div>
    );
}

export default Welcome;

// Arrow function component
const Welcome = () => {
    return (
        <div>
            <h1>Welcome bro</h1>
        </div>
    );
};

export default Welcome;

// Implicit return for simple components
const Welcome = () => (
    <div>
        <h1>Welcome bro</h1>
    </div>
);
```

### Component Composition
```jsx
// Parent component using child components
import Welcome from './components/Welcome.jsx'
import Jsx from './components/Jsx.jsx'

const App = () => {
    return (
        <div>
            <Welcome />
            <Jsx />
            {/* More components */}
        </div>
    );
};

export default App;
```

### Component with Logic
```jsx
function SmartComponent() {
    const currentHour = new Date().getHours();
    
    const getGreeting = () => {
        if (currentHour < 12) return 'Good Morning';
        if (currentHour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };
    
    const handleClick = () => {
        console.log('Component clicked!');
    };
    
    return (
        <div>
            <h1>{getGreeting()}!</h1>
            <p>Current time: {new Date().toLocaleTimeString()}</p>
            <button onClick={handleClick}>Interact</button>
        </div>
    );
}
```

---

## Props - Component Communication

Props (properties) allow components to receive data from their parent components, enabling component reusability and communication.

### Basic Props
```jsx
// Component receiving props
function Props(props) {
    return (
        <div>
            <h1>Bye {props.name}</h1>
        </div>
    );
}

export default Props;

// Usage in parent component
const App = () => {
    return (
        <div>
            <Props name="chaman" />
            <Props name="Alice" />
            <Props name="Bob" />
        </div>
    );
};
```

### Props Destructuring
```jsx
// Destructuring props in function parameters
const Props2 = ({ age }) => {
    return (
        <div>
            <h1>Age: {age}</h1>
        </div>
    );
};

export default Props2;

// Multiple props destructuring
const UserCard = ({ name, age, email, isOnline }) => {
    return (
        <div className="user-card">
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
            <span className={`status ${isOnline ? 'online' : 'offline'}`}>
                {isOnline ? 'Online' : 'Offline'}
            </span>
        </div>
    );
};
```

### Function Props
```jsx
// Component receiving function as prop
const Functionprop = ({ click }) => {
    return (
        <button onClick={click}>Hey bro</button>
    );
};

export default Functionprop;

// Parent component passing function
const App = () => {
    const handleClick = () => alert("Hey, it's nice!");
    
    return (
        <div>
            <Functionprop click={handleClick} />
        </div>
    );
};
```

### Array Props
```jsx
// Component handling array props
const ArrayProp = ({ fruits }) => {
    return (
        <div>
            <h2>Fruits List:</h2>
            <ol>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ol>
            <p>All fruits: {fruits.join(", ")}</p>
        </div>
    );
};

export default ArrayProp;

// Usage
const App = () => {
    const fruitsList = ["Apple", "Banana", "Mango"];
    
    return (
        <ArrayProp fruits={fruitsList} />
    );
};
```

### Object Props
```jsx
// Component handling object props
const ObjectProp = ({ user }) => {
    return (
        <div>
            <h2>Users:</h2>
            <ol>
                {user.map((person, index) => (
                    <li key={index}>
                        {person.name}, Age: {person.age}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default ObjectProp;

// Usage
const App = () => {
    const users = [
        { name: "Chaman", age: 21 },
        { name: "Rishi", age: 22 }
    ];
    
    return (
        <ObjectProp user={users} />
    );
};
```

### Props Validation and Default Values
```jsx
import PropTypes from 'prop-types';

const UserProfile = ({ name, age, email, isAdmin = false }) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
            {isAdmin && <span className="admin-badge">Admin</span>}
        </div>
    );
};

// PropTypes for type checking
UserProfile.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool
};

// Default props
UserProfile.defaultProps = {
    isAdmin: false
};

export default UserProfile;
```

---

## Event Handling in React

React provides a synthetic event system that wraps native events with consistent behavior across browsers.

### Basic Event Handling
```jsx
const EventHandling = () => {
    const handleClick = () => {
        alert("Button clicked!");
    };
    
    const handleMouseOver = (event) => {
        console.log("Mouse over:", event.target.tagName);
        event.target.style.backgroundColor = 'lightblue';
    };
    
    const handleMouseOut = (event) => {
        event.target.style.backgroundColor = 'initial';
    };
    
    return (
        <div>
            <button 
                onClick={handleClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                Interactive Button
            </button>
        </div>
    );
};
```

### Event Object Properties
```jsx
const EventDemo = () => {
    const handleEvent = (event) => {
        console.log('Event type:', event.type);
        console.log('Target element:', event.target);
        console.log('Current target:', event.currentTarget);
        console.log('Mouse position:', event.clientX, event.clientY);
        
        // Prevent default behavior
        event.preventDefault();
        
        // Stop event propagation
        event.stopPropagation();
    };
    
    return (
        <div onClick={handleEvent}>
            <button onClick={handleEvent}>Click me</button>
        </div>
    );
};
```

### Form Events
```jsx
const FormEvents = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
    };
    
    const handleInputChange = (event) => {
        console.log('Input value:', event.target.value);
    };
    
    const handleFocus = () => {
        console.log('Input focused');
    };
    
    const handleBlur = () => {
        console.log('Input lost focus');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Type something..."
            />
            <button type="submit">Submit</button>
        </form>
    );
};
```

---

## Conditional Rendering

React allows you to conditionally render elements based on certain conditions.

### Ternary Operator
```jsx
const Ternaryprop = ({ bool }) => {
    return (
        <div>
            <h1>Are you online? {bool ? "Online" : "Offline"}</h1>
        </div>
    );
};

export default Ternaryprop;

// More complex conditional rendering
const StatusIndicator = ({ user }) => {
    return (
        <div>
            <h2>{user.name}</h2>
            <p>
                Status: {user.isActive ? (
                    <span style={{color: 'green'}}>Active</span>
                ) : (
                    <span style={{color: 'red'}}>Inactive</span>
                )}
            </p>
        </div>
    );
};
```

### Logical AND Operator
```jsx
const ConditionalDisplay = ({ showMessage, user }) => {
    return (
        <div>
            {/* Show element only if condition is true */}
            {showMessage && <p>Welcome to our app!</p>}
            
            {/* Show element if user exists */}
            {user && <h2>Hello, {user.name}!</h2>}
            
            {/* Show element if array has items */}
            {user && user.notifications.length > 0 && (
                <p>You have {user.notifications.length} notifications</p>
            )}
        </div>
    );
};
```

### Conditional Rendering with Functions
```jsx
const UserDashboard = ({ user, isLoading, error }) => {
    const renderContent = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        
        if (error) {
            return <div style={{color: 'red'}}>Error: {error}</div>;
        }
        
        if (!user) {
            return <div>Please log in to continue</div>;
        }
        
        return (
            <div>
                <h1>Welcome, {user.name}!</h1>
                <p>Email: {user.email}</p>
            </div>
        );
    };
    
    return (
        <div className="dashboard">
            {renderContent()}
        </div>
    );
};
```

### Switch-like Conditional Rendering
```jsx
const StatusDisplay = ({ status }) => {
    const renderStatus = () => {
        switch (status) {
            case 'loading':
                return <div className="loading">Loading...</div>;
            case 'success':
                return <div className="success">Operation successful!</div>;
            case 'error':
                return <div className="error">Something went wrong!</div>;
            default:
                return <div>Unknown status</div>;
        }
    };
    
    return (
        <div>
            {renderStatus()}
        </div>
    );
};
```

---

## Lists and Keys

Rendering lists of data is common in React applications. Keys help React identify which items have changed.

### Basic List Rendering
```jsx
const SimpleList = () => {
    const fruits = ["Apple", "Banana", "Mango", "Orange"];
    
    return (
        <ul>
            {fruits.map((fruit, index) => (
                <li key={index}>{fruit}</li>
            ))}
        </ul>
    );
};
```

### Object List Rendering
```jsx
const UserList = () => {
    const users = [
        { id: 1, name: "Chaman", age: 21, email: "chaman@example.com" },
        { id: 2, name: "Rishi", age: 22, email: "rishi@example.com" },
        { id: 3, name: "Alice", age: 25, email: "alice@example.com" }
    ];
    
    return (
        <div>
            <h2>User List</h2>
            {users.map(user => (
                <div key={user.id} className="user-card">
                    <h3>{user.name}</h3>
                    <p>Age: {user.age}</p>
                    <p>Email: {user.email}</p>
                </div>
            ))}
        </div>
    );
};
```

### Nested Lists
```jsx
const NestedList = () => {
    const categories = [
        {
            id: 1,
            name: "Fruits",
            items: ["Apple", "Banana", "Orange"]
        },
        {
            id: 2,
            name: "Vegetables",
            items: ["Carrot", "Broccoli", "Spinach"]
        }
    ];
    
    return (
        <div>
            {categories.map(category => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    <ul>
                        {category.items.map((item, index) => (
                            <li key={`${category.id}-${index}`}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
```

### List with Actions
```jsx
const TodoList = () => {
    const todos = [
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Build a project", completed: false },
        { id: 3, text: "Deploy to production", completed: true }
    ];
    
    const handleToggle = (id) => {
        console.log(`Toggle todo ${id}`);
    };
    
    const handleDelete = (id) => {
        console.log(`Delete todo ${id}`);
    };
    
    return (
        <div>
            <h2>Todo List</h2>
            {todos.map(todo => (
                <div key={todo.id} className="todo-item">
                    <span 
                        className={todo.completed ? 'completed' : ''}
                        onClick={() => handleToggle(todo.id)}
                    >
                        {todo.text}
                    </span>
                    <button onClick={() => handleDelete(todo.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};
```

---

## Project Structure and Organization

### File Organization Best Practices
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   └── ui/             # Basic UI elements
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # API services
├── constants/          # Application constants
├── styles/             # Global styles
└── assets/             # Static assets
```

### Component Naming Conventions
```jsx
// PascalCase for component names
const UserProfile = () => { /* ... */ };
const NavigationBar = () => { /* ... */ };
const ProductCard = () => { /* ... */ };

// camelCase for functions and variables
const handleClick = () => { /* ... */ };
const isLoggedIn = true;
const userDetails = { /* ... */ };

// UPPER_CASE for constants
const API_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
```

### Import/Export Patterns
```jsx
// Named exports
export const Button = () => { /* ... */ };
export const Input = () => { /* ... */ };

// Default export
const App = () => { /* ... */ };
export default App;

// Import patterns
import React from 'react';
import { useState, useEffect } from 'react';
import App from './App';
import { Button, Input } from './components/ui';
```

---

## Complete Code Examples

### Example 1: Complete App Component
```jsx
import Functionprop from './props/Functionprop.jsx'
import Welcome from './components/Welcome.jsx'
import Jsx from './components/Jsx.jsx'
import Props from './props/Props.jsx'
import Props2 from './props/Props2.jsx'
import Ternaryprop from './props/Ternaryprop.jsx'
import ArrayProp from './props/ArrayProp.jsx'
import ObjectProp from './props/ObjectProp.jsx'

const App = () => {
    const handleAlert = () => alert("Hey, it's nice!");
    
    const userList = [
        { name: "Chaman", age: 21 },
        { name: "Rishi", age: 22 }
    ];
    
    const fruitsList = ["Apple", "Banana", "Mango"];
    
    return (
        <div className="app">
            <Welcome />
            <Jsx />
            <Functionprop click={handleAlert} />
            <Props name="chaman" />
            <Props2 age={22} />
            <Ternaryprop bool={true} />
            <ArrayProp fruits={fruitsList} />
            <ObjectProp user={userList} />
        </div>
    );
};

export default App;
```

### Example 2: Interactive Component with Multiple Features
```jsx
const InteractiveDemo = () => {
    const users = [
        { id: 1, name: "Alice", isOnline: true, role: "admin" },
        { id: 2, name: "Bob", isOnline: false, role: "user" },
        { id: 3, name: "Charlie", isOnline: true, role: "user" }
    ];
    
    const handleUserClick = (user) => {
        alert(`Clicked on ${user.name} (${user.role})`);
    };
    
    const renderUserCard = (user) => (
        <div
            key={user.id}
            className="user-card"
            onClick={() => handleUserClick(user)}
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '5px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: user.isOnline ? '#e8f5e8' : '#f5e8e8'
            }}
        >
            <h3>{user.name}</h3>
            <p>Status: {user.isOnline ? "Online" : "Offline"}</p>
            <p>Role: {user.role}</p>
            {user.role === 'admin' && (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                    👑 Admin
                </span>
            )}
        </div>
    );
    
    return (
        <div>
            <h2>Interactive User List</h2>
            <div className="user-grid">
                {users.map(renderUserCard)}
            </div>
        </div>
    );
};

export default InteractiveDemo;
```

### Example 3: Form Component with Validation
```jsx
const ContactForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        console.log('Form submitted:', data);
        alert('Form submitted successfully!');
    };
    
    const handleInputChange = (event) => {
        console.log(`${event.target.name}: ${event.target.value}`);
    };
    
    return (
        <div>
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        onChange={handleInputChange}
                    />
                </div>
                
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};
```

---

## Key Learning Objectives

After completing Day 6, students should understand:

### React Fundamentals
1. **Component Concept**: Understanding components as building blocks
2. **JSX Syntax**: Writing HTML-like code in JavaScript
3. **Virtual DOM**: How React optimizes DOM updates
4. **Component Lifecycle**: Basic understanding of component creation and rendering

### Component Development
1. **Function Components**: Modern React component pattern
2. **Component Composition**: Building UIs with multiple components
3. **Import/Export**: ES6 module system in React
4. **Component Organization**: File structure and naming conventions

### Props System
1. **Data Passing**: Parent to child communication
2. **Props Destructuring**: Clean parameter handling
3. **Function Props**: Event handling through props
4. **Props Validation**: Type checking and default values

### Event Handling
1. **Synthetic Events**: React's event system
2. **Event Handlers**: onClick, onChange, onSubmit patterns
3. **Event Object**: Accessing event properties and methods
4. **Form Events**: Handling user input and form submission

### Conditional Rendering
1. **Ternary Operators**: Simple conditional display
2. **Logical AND**: Conditional element rendering
3. **Complex Conditions**: Multiple condition handling
4. **Dynamic Content**: Rendering based on state/props

### List Rendering
1. **Array Mapping**: Converting data to JSX elements
2. **Keys**: Unique identifiers for list items
3. **Object Lists**: Rendering complex data structures
4. **Nested Lists**: Handling hierarchical data

---

## Best Practices

### Component Design
- **Single Responsibility**: Each component should have one clear purpose
- **Small Components**: Keep components focused and manageable
- **Reusability**: Design components for reuse across the application
- **Composition over Inheritance**: Combine simple components to create complex UIs

### Props Usage
- **Prop Validation**: Use PropTypes for type checking
- **Default Props**: Provide sensible defaults
- **Destructuring**: Extract props cleanly in function parameters
- **Avoid Prop Drilling**: Keep prop passing shallow when possible

### JSX Best Practices
- **Readable Structure**: Format JSX for easy reading
- **Semantic HTML**: Use appropriate HTML elements
- **Accessibility**: Include ARIA attributes and semantic markup
- **Consistent Naming**: Use camelCase for props and attributes

### Performance Considerations
- **Key Optimization**: Use stable, unique keys for list items
- **Avoid Inline Functions**: Define functions outside JSX when possible
- **Component Memoization**: Consider React.memo for expensive components
- **Bundle Size**: Import only what you need from libraries

### Code Organization
- **File Naming**: Use PascalCase for component files
- **Folder Structure**: Group related components together
- **Import Order**: External libraries, internal modules, relative imports
- **Export Patterns**: Consistent default and named exports

---

## Common Patterns and Use Cases

### Presentational vs Container Components
```jsx
// Presentational Component (UI only)
const UserCard = ({ user, onEdit, onDelete }) => (
    <div className="user-card">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
);

// Container Component (logic and data)
const UserList = () => {
    const users = [/* user data */];
    
    const handleEdit = (user) => {
        console.log('Edit user:', user);
    };
    
    const handleDelete = (id) => {
        console.log('Delete user:', id);
    };
    
    return (
        <div>
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};
```

### Higher-Order Component Pattern
```jsx
// HOC for loading state
const withLoading = (Component) => {
    return ({ isLoading, ...props }) => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return <Component {...props} />;
    };
};

// Usage
const UserProfile = ({ user }) => (
    <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
    </div>
);

const UserProfileWithLoading = withLoading(UserProfile);

// In parent component
const App = () => (
    <UserProfileWithLoading
        isLoading={false}
        user={{ name: "John", email: "john@example.com" }}
    />
);
```

### Render Props Pattern
```jsx
// Component with render prop
const DataFetcher = ({ render }) => {
    const data = { name: "John", age: 30 }; // Simulated data
    const isLoading = false;
    
    return render({ data, isLoading });
};

// Usage
const App = () => (
    <DataFetcher
        render={({ data, isLoading }) => (
            isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>{data.name}</h1>
                    <p>Age: {data.age}</p>
                </div>
            )
        )}
    />
);
```

### Compound Component Pattern
```jsx
// Compound components that work together
const Modal = ({ children, isOpen }) => {
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                {children}
            </div>
        </div>
    );
};

const ModalHeader = ({ children }) => (
    <div className="modal-header">{children}</div>
);

const ModalBody = ({ children }) => (
    <div className="modal-body">{children}</div>
);

const ModalFooter = ({ children }) => (
    <div className="modal-footer">{children}</div>
);

// Attach as properties
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

// Usage
const App = () => (
    <Modal isOpen={true}>
        <Modal.Header>
            <h2>Confirmation</h2>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this item?</p>
        </Modal.Body>
        <Modal.Footer>
            <button>Cancel</button>
            <button>Delete</button>
        </Modal.Footer>
    </Modal>
);
```

This comprehensive Day 6 documentation covers all fundamental React concepts, providing practical examples and best practices for building modern React applications.