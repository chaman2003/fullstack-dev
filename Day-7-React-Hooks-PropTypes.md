# Day 7: React Hooks and PropTypes - Complete Documentation

## Table of Contents

1. [Introduction to React Hooks](#introduction-to-react-hooks)
2. [useState Hook - State Management](#usestate-hook---state-management)
3. [useEffect Hook - Side Effects](#useeffect-hook---side-effects)
4. [PropTypes - Type Checking](#proptypes---type-checking)
5. [Component Lifecycle with Hooks](#component-lifecycle-with-hooks)
6. [Practical Examples and Patterns](#practical-examples-and-patterns)
7. [Movie List Application](#movie-list-application)
8. [Complete Code Examples](#complete-code-examples)
9. [Key Learning Objectives](#key-learning-objectives)
10. [Best Practices](#best-practices)
11. [Common Patterns and Use Cases](#common-patterns-and-use-cases)

---

## Introduction to React Hooks

React Hooks are functions that let you use state and other React features in function components. Introduced in React 16.8, hooks provide a more direct API to the React concepts you already know.

### What are Hooks?
- **Functions**: Special functions that start with "use"
- **State Management**: Allow function components to have state
- **Lifecycle Methods**: Replace class component lifecycle methods
- **Reusable Logic**: Extract and share stateful logic between components

### Rules of Hooks
1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call them from React function components or custom hooks

### Why Hooks?
```jsx
// Before Hooks (Class Component)
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    
    componentDidMount() {
        document.title = `Count: ${this.state.count}`;
    }
    
    componentDidUpdate() {
        document.title = `Count: ${this.state.count}`;
    }
    
    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Increment
                </button>
            </div>
        );
    }
}

// After Hooks (Function Component)
function Counter() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        document.title = `Count: ${count}`;
    });
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
```

---

## useState Hook - State Management

The useState hook allows function components to have local state.

### Basic useState Syntax
```jsx
import { useState } from "react";

function UseStatee() {
    // Declare state variable with initial value
    const [i, setI] = useState(1);
    
    const addValue = () => {
        setI(i + 1);
    };
    
    const subValue = () => {
        setI(i - 1);
    };
    
    return (
        <div>
            <p>i is {i}</p>
            <button onClick={addValue}>Increase</button>
            <button onClick={subValue}>Decrease</button>
        </div>
    );
}

export default UseStatee;
```

### useState with Different Data Types
```jsx
function StateExamples() {
    // String state
    const [name, setName] = useState("");
    
    // Boolean state
    const [isVisible, setIsVisible] = useState(false);
    
    // Array state
    const [items, setItems] = useState([]);
    
    // Object state
    const [user, setUser] = useState({
        name: "",
        email: "",
        age: 0
    });
    
    // Updating string state
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    // Updating boolean state
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    
    // Updating array state
    const addItem = () => {
        setItems([...items, `Item ${items.length + 1}`]);
    };
    
    const removeItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };
    
    // Updating object state
    const updateUser = (field, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [field]: value
        }));
    };
    
    return (
        <div>
            {/* String state example */}
            <input 
                type="text" 
                value={name} 
                onChange={handleNameChange}
                placeholder="Enter your name"
            />
            <p>Hello, {name}!</p>
            
            {/* Boolean state example */}
            <button onClick={toggleVisibility}>
                {isVisible ? 'Hide' : 'Show'} Content
            </button>
            {isVisible && <p>This content is visible!</p>}
            
            {/* Array state example */}
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            
            {/* Object state example */}
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => updateUser('name', e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => updateUser('email', e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                onChange={(e) => updateUser('age', parseInt(e.target.value))}
            />
            <p>User: {JSON.stringify(user, null, 2)}</p>
        </div>
    );
}
```

### Functional Updates
```jsx
function Counter() {
    const [count, setCount] = useState(0);
    
    // Regular update
    const increment = () => {
        setCount(count + 1);
    };
    
    // Functional update (safer for async operations)
    const incrementFunctional = () => {
        setCount(prevCount => prevCount + 1);
    };
    
    // Multiple updates in sequence
    const incrementThree = () => {
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Regular Increment</button>
            <button onClick={incrementFunctional}>Functional Increment</button>
            <button onClick={incrementThree}>Increment by 3</button>
        </div>
    );
}
```

### Lazy Initial State
```jsx
function ExpensiveComponent() {
    // Expensive calculation only runs once
    const [data, setData] = useState(() => {
        console.log("Expensive calculation running...");
        return Array.from({ length: 1000 }, (_, i) => i);
    });
    
    // This would run on every render (avoid this)
    // const [data, setData] = useState(expensiveCalculation());
    
    return (
        <div>
            <p>Data length: {data.length}</p>
            <button onClick={() => setData([])}>Clear Data</button>
        </div>
    );
}
```

---

## useEffect Hook - Side Effects

The useEffect hook lets you perform side effects in function components, combining componentDidMount, componentDidUpdate, and componentWillUnmount.

### Basic useEffect Usage
```jsx
import { useState, useEffect } from "react";

function UseStatee() {
    const [i, setI] = useState(1);
    
    const addValue = () => {
        setI(i + 1);
    };
    
    const subValue = () => {
        setI(i - 1);
    };
    
    // Effect with no dependency array - runs after every render
    useEffect(() => {
        console.log(`Count is now: ${i} (Missing dependency)`);
    });
    
    // Effect with empty dependency array - runs only once after initial render
    useEffect(() => {
        console.log(`Count is now: ${i} (Empty dependency) "[]"`);
    }, []);
    
    // Effect with dependency array - runs when dependencies change
    useEffect(() => {
        console.log(`Count is now: ${i} (With Dependency) "[i]"`);
    }, [i]);
    
    return (
        <div>
            <p>i is {i}</p>
            <button onClick={addValue}>click to increase</button>
            <button onClick={subValue}>click to decrease</button>
        </div>
    );
}

export default UseStatee;
```

### useEffect Dependency Patterns
```jsx
function EffectExamples() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    
    // 1. No dependency array - runs after every render
    useEffect(() => {
        console.log("Runs after every render");
    });
    
    // 2. Empty dependency array - runs only once (componentDidMount)
    useEffect(() => {
        console.log("Runs only once after initial render");
        // API calls, subscriptions, etc.
    }, []);
    
    // 3. With dependencies - runs when dependencies change
    useEffect(() => {
        console.log(`Count changed to: ${count}`);
        document.title = `Count: ${count}`;
    }, [count]);
    
    // 4. Multiple dependencies
    useEffect(() => {
        console.log(`Count: ${count}, Name: ${name}`);
    }, [count, name]);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            
            <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter name"
            />
        </div>
    );
}
```

### Cleanup with useEffect
```jsx
function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    useEffect(() => {
        let interval = null;
        
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }
        
        // Cleanup function (componentWillUnmount)
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);
    
    const startStop = () => {
        setIsRunning(!isRunning);
    };
    
    const reset = () => {
        setSeconds(0);
        setIsRunning(false);
    };
    
    return (
        <div>
            <h2>Timer: {seconds}s</h2>
            <button onClick={startStop}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
```

### Data Fetching with useEffect
```jsx
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }
                
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (userId) {
            fetchUser();
        }
    }, [userId]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found</div>;
    
    return (
        <div>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
        </div>
    );
}
```

---

## PropTypes - Type Checking

PropTypes provide runtime type checking for React props, helping catch bugs during development.

### Basic PropTypes Usage
```jsx
import PropTypes from "prop-types";
import React from "react";

const Card = ({ username = "harish", age, status }) => {
    return (
        <div>
            <h1>
                {username} <br />
                {age} <br />
                {status}
            </h1>
        </div>
    );
};

Card.propTypes = {
    username: PropTypes.string,
    age: PropTypes.number,
    status: PropTypes.string,
};

export default Card;
```

### Common PropTypes
```jsx
import PropTypes from 'prop-types';

const ComponentWithProps = ({ 
    name, 
    age, 
    isActive, 
    items, 
    user, 
    onClick, 
    children 
}) => {
    return (
        <div onClick={onClick}>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <div>User: {user.name}</div>
            {children}
        </div>
    );
};

ComponentWithProps.propTypes = {
    // Basic types
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    isActive: PropTypes.bool,
    
    // Array and object types
    items: PropTypes.array,
    user: PropTypes.object,
    
    // Function type
    onClick: PropTypes.func,
    
    // Special types
    children: PropTypes.node,
    
    // Array of specific type
    numbers: PropTypes.arrayOf(PropTypes.number),
    
    // Object with specific shape
    userDetailed: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        age: PropTypes.number
    }),
    
    // One of specific values
    status: PropTypes.oneOf(['active', 'inactive', 'pending']),
    
    // One of specific types
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    
    // Instance of a class
    date: PropTypes.instanceOf(Date),
    
    // Custom validator
    customProp: function(props, propName, componentName) {
        if (!/matchme/.test(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    }
};

// Default props
ComponentWithProps.defaultProps = {
    age: 18,
    isActive: false,
    items: [],
    user: {},
    onClick: () => {}
};
```

### PropTypes for Complex Structures
```jsx
const MovieCard = ({ movie, onWatch, onSave }) => {
    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
            <h2>{movie.title}</h2>
            <p>Hero: {movie.hero}</p>
            <img src={movie.image} alt={movie.title} style={{ width: "200px" }} />
            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => onWatch(movie.id)}>Watch</button>
                <button onClick={() => onSave(movie.id)}>Save</button>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        hero: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        genre: PropTypes.oneOf(['action', 'comedy', 'drama', 'thriller']),
        rating: PropTypes.number
    }).isRequired,
    onWatch: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

MovieCard.defaultProps = {
    movie: {
        genre: 'action',
        rating: 0
    }
};
```

---

## Component Lifecycle with Hooks

Understanding how hooks relate to class component lifecycle methods.

### Lifecycle Mapping
```jsx
function ComponentLifecycle() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // componentDidMount equivalent
    useEffect(() => {
        console.log('Component mounted');
        fetchData();
        
        // componentWillUnmount equivalent
        return () => {
            console.log('Component will unmount');
            // Cleanup subscriptions, timers, etc.
        };
    }, []);
    
    // componentDidUpdate equivalent
    useEffect(() => {
        console.log('Component updated');
        document.title = loading ? 'Loading...' : 'Data loaded';
    });
    
    // Specific update effect
    useEffect(() => {
        if (data) {
            console.log('Data changed:', data);
        }
    }, [data]);
    
    const fetchData = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setData({ message: 'Hello World' });
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <p>{data?.message}</p>
            )}
            <button onClick={fetchData}>Refresh</button>
        </div>
    );
}
```

### Conditional Effects
```jsx
function ConditionalEffects({ userId, shouldFetch }) {
    const [user, setUser] = useState(null);
    
    // Effect only runs when shouldFetch is true and userId changes
    useEffect(() => {
        if (shouldFetch && userId) {
            fetchUser(userId);
        }
    }, [userId, shouldFetch]);
    
    // Effect with cleanup based on condition
    useEffect(() => {
        let subscription;
        
        if (user) {
            subscription = subscribeToUserUpdates(user.id, (updatedUser) => {
                setUser(updatedUser);
            });
        }
        
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [user]);
    
    const fetchUser = async (id) => {
        // Fetch user logic
    };
    
    return (
        <div>
            {user ? <p>Welcome, {user.name}!</p> : <p>No user loaded</p>}
        </div>
    );
}
```

---

## Practical Examples and Patterns

### Custom Hooks
```jsx
// Custom hook for local storage
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    
    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };
    
    return [storedValue, setValue];
}

// Usage of custom hook
function Settings() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [language, setLanguage] = useLocalStorage('language', 'en');
    
    return (
        <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Current theme: {theme}
            </button>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
            </select>
        </div>
    );
}
```

### Form Handling with Hooks
```jsx
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        return newErrors;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsSubmitting(true);
        try {
            // Submit form logic
            await submitForm(formData);
            alert('Form submitted successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            alert('Failed to submit form');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            
            <div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            
            <div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                />
                {errors.message && <span className="error">{errors.message}</span>}
            </div>
            
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}
```

---

## Movie List Application

A comprehensive example combining all Day 7 concepts.

### Movie List Component
```jsx
import React from "react";
import PropTypes from "prop-types";

const Propexample = ({ movie }) => {
    return (
        <>
            <h1>Movie List</h1>
            <div style={{ 
                border: "1px solid black", 
                padding: "10px", 
                display: "grid", 
                gridTemplateColumns: "repeat(2, 1fr)", 
                gap: "10px" 
            }}>
                {movie.map((item) => (
                    <div key={item.title}>
                        <div style={{ border: "1px solid black", padding: "10px" }}>
                            <h1>Movie name is {item.title}</h1>
                            <p>Hero is {item.hero}</p>
                            <img 
                                src={item.image} 
                                alt={item.title}
                                style={{ width: "200px" }} 
                            />
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button>Watch</button>
                                <button>Save</button>
                                <button>Review</button>
                                <button>Ignore</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

Propexample.propTypes = {
    movie: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            hero: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        })
    ).isRequired
};

export default Propexample;
```

### Enhanced Movie Application with Hooks
```jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MovieApp = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Titanic",
            hero: "Leonardo DiCaprio",
            image: "https://images.nationalgeographic.org/image/upload/v1638882458/EducationHub/photos/titanic-sinking.jpg"
        },
        {
            id: 2,
            title: "Mission Impossible",
            hero: "Tom Cruise",
            image: "https://m.media-amazon.com/images/I/61E-neUYgJL._UF1000,1000_QL80_.jpg"
        },
        {
            id: 3,
            title: "Inception",
            hero: "Leonardo DiCaprio",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0mig3IIp6m7WW8uHGU4AwpFbv9QhnOmDhLA&s"
        },
        {
            id: 4,
            title: "The Matrix",
            hero: "Keanu Reeves",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/The_Matrix.png/250px-The_Matrix.png"
        }
    ]);
    
    const [favorites, setFavorites] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [filter, setFilter] = useState('all');
    
    useEffect(() => {
        console.log(`Movies updated. Total: ${movies.length}`);
    }, [movies]);
    
    useEffect(() => {
        console.log(`Favorites updated. Count: ${favorites.length}`);
    }, [favorites]);
    
    const handleWatch = (movieId) => {
        console.log(`Watching movie with ID: ${movieId}`);
        alert(`Starting to watch movie!`);
    };
    
    const handleSave = (movieId) => {
        setFavorites(prev => {
            if (prev.includes(movieId)) {
                return prev.filter(id => id !== movieId);
            } else {
                return [...prev, movieId];
            }
        });
    };
    
    const handleAddToWatchlist = (movieId) => {
        setWatchlist(prev => {
            if (prev.includes(movieId)) {
                return prev.filter(id => id !== movieId);
            } else {
                return [...prev, movieId];
            }
        });
    };
    
    const filteredMovies = movies.filter(movie => {
        if (filter === 'favorites') {
            return favorites.includes(movie.id);
        }
        if (filter === 'watchlist') {
            return watchlist.includes(movie.id);
        }
        return true;
    });
    
    return (
        <div>
            <h1>Movie Collection</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={() => setFilter('all')}
                    style={{ backgroundColor: filter === 'all' ? '#007bff' : '#6c757d' }}
                >
                    All Movies ({movies.length})
                </button>
                <button 
                    onClick={() => setFilter('favorites')}
                    style={{ backgroundColor: filter === 'favorites' ? '#007bff' : '#6c757d' }}
                >
                    Favorites ({favorites.length})
                </button>
                <button 
                    onClick={() => setFilter('watchlist')}
                    style={{ backgroundColor: filter === 'watchlist' ? '#007bff' : '#6c757d' }}
                >
                    Watchlist ({watchlist.length})
                </button>
            </div>
            
            <MovieGrid 
                movies={filteredMovies}
                favorites={favorites}
                watchlist={watchlist}
                onWatch={handleWatch}
                onSave={handleSave}
                onAddToWatchlist={handleAddToWatchlist}
            />
        </div>
    );
};

const MovieGrid = ({ 
    movies, 
    favorites, 
    watchlist, 
    onWatch, 
    onSave, 
    onAddToWatchlist 
}) => {
    return (
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "20px" 
        }}>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    isFavorite={favorites.includes(movie.id)}
                    isInWatchlist={watchlist.includes(movie.id)}
                    onWatch={onWatch}
                    onSave={onSave}
                    onAddToWatchlist={onAddToWatchlist}
                />
            ))}
        </div>
    );
};

const MovieCard = ({ 
    movie, 
    isFavorite, 
    isInWatchlist, 
    onWatch, 
    onSave, 
    onAddToWatchlist 
}) => {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#f9f9f9"
        }}>
            <h2>{movie.title}</h2>
            <p><strong>Starring:</strong> {movie.hero}</p>
            <img 
                src={movie.image} 
                alt={movie.title}
                style={{ 
                    width: "100%", 
                    maxWidth: "200px",
                    height: "auto",
                    borderRadius: "4px"
                }} 
            />
            <div style={{ 
                display: "flex", 
                gap: "10px", 
                marginTop: "10px",
                flexWrap: "wrap"
            }}>
                <button 
                    onClick={() => onWatch(movie.id)}
                    style={{ 
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px"
                    }}
                >
                    Watch
                </button>
                <button 
                    onClick={() => onSave(movie.id)}
                    style={{ 
                        backgroundColor: isFavorite ? "#dc3545" : "#007bff",
                        color: "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px"
                    }}
                >
                    {isFavorite ? "Unfavorite" : "Favorite"}
                </button>
                <button 
                    onClick={() => onAddToWatchlist(movie.id)}
                    style={{ 
                        backgroundColor: isInWatchlist ? "#ffc107" : "#6c757d",
                        color: isInWatchlist ? "black" : "white",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px"
                    }}
                >
                    {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </button>
            </div>
        </div>
    );
};

// PropTypes for all components
MovieGrid.propTypes = {
    movies: PropTypes.array.isRequired,
    favorites: PropTypes.array.isRequired,
    watchlist: PropTypes.array.isRequired,
    onWatch: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onAddToWatchlist: PropTypes.func.isRequired
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        hero: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isInWatchlist: PropTypes.bool.isRequired,
    onWatch: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onAddToWatchlist: PropTypes.func.isRequired
};

export default MovieApp;
```

---

## Complete Code Examples

### Example 1: Complete App Component
```jsx
import Propexample from "./componenets/Propexample";
import Card from "./componenets/Card";
import React from "react";
import UseStatee from "./hooks/UseStatee";

function App() {
    const movieData = [
        {
            title: "Titanic",
            hero: "Sharukh khan",
            image: "https://images.nationalgeographic.org/image/upload/v1638882458/EducationHub/photos/titanic-sinking.jpg"
        },
        {
            title: "Mission Impossible",
            hero: "Tom Cruise",
            image: "https://m.media-amazon.com/images/I/61E-neUYgJL._UF1000,1000_QL80_.jpg"
        },
        {
            title: "Inception",
            hero: "Leonardo",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0mig3IIp6m7WW8uHGU4AwpFbv9QhnOmDhLA&s"
        },
        {
            title: "The Matrix",
            hero: "Keanu Reeves",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/The_Matrix.png/250px-The_Matrix.png"
        }
    ];

    return (
        <>
            {/* Movie List Component */}
            <Propexample movie={movieData} />
            
            {/* Card Component with Props */}
            <Card age={21} status="Offline" />
            
            {/* useState and useEffect Hook Example */}
            <UseStatee />
        </>
    );
}

export default App;
```

### Example 2: Real-time Clock with Hooks
```jsx
import { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date());
    const [isRunning, setIsRunning] = useState(true);
    
    useEffect(() => {
        let interval;
        
        if (isRunning) {
            interval = setInterval(() => {
                setTime(new Date());
            }, 1000);
        }
        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isRunning]);
    
    const formatTime = (date) => {
        return date.toLocaleTimeString();
    };
    
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Digital Clock</h1>
            <div style={{ 
                fontSize: '2em', 
                fontFamily: 'monospace',
                backgroundColor: '#000',
                color: '#0f0',
                padding: '20px',
                borderRadius: '10px',
                display: 'inline-block'
            }}>
                {formatTime(time)}
            </div>
            <br />
            <button 
                onClick={() => setIsRunning(!isRunning)}
                style={{ 
                    marginTop: '20px', 
                    padding: '10px 20px',
                    fontSize: '1em'
                }}
            >
                {isRunning ? 'Pause' : 'Start'}
            </button>
        </div>
    );
};

export default Clock;
```

---

## Key Learning Objectives

After completing Day 7, students should understand:

### useState Hook
1. **State Declaration**: Using useState to add state to function components
2. **State Updates**: Updating state with setter functions
3. **Functional Updates**: Using callback functions for state updates
4. **Complex State**: Managing arrays, objects, and multiple state variables

### useEffect Hook
1. **Side Effects**: Understanding when and why to use useEffect
2. **Dependency Arrays**: Controlling when effects run
3. **Cleanup Functions**: Preventing memory leaks and cleaning up resources
4. **Effect Patterns**: Common patterns for data fetching, subscriptions, timers

### PropTypes
1. **Type Checking**: Runtime validation of component props
2. **PropTypes Library**: Using the prop-types package
3. **Common Types**: string, number, bool, array, object, func, node
4. **Advanced Validation**: shape, oneOf, oneOfType, custom validators

### Component Lifecycle
1. **Mounting**: Component initialization and setup
2. **Updating**: Responding to prop and state changes
3. **Unmounting**: Cleanup before component removal
4. **Hook Equivalents**: Mapping class lifecycle methods to hooks

### Best Practices
1. **Hook Rules**: Following the rules of hooks
2. **Dependency Management**: Proper dependency array usage
3. **Performance**: Avoiding unnecessary re-renders
4. **Code Organization**: Structuring components with hooks

---

## Best Practices

### useState Best Practices
- **Initialize with appropriate types**: Use correct initial values
- **Use functional updates**: For state depending on previous state
- **Split state logically**: Multiple useState calls for unrelated data
- **Avoid direct mutations**: Always create new objects/arrays

### useEffect Best Practices
- **Include all dependencies**: Add all values from component scope
- **Use ESLint plugin**: React hooks ESLint plugin for warnings
- **Separate concerns**: Multiple useEffect calls for different concerns
- **Clean up properly**: Always clean up subscriptions and timers

### PropTypes Best Practices
- **Define all props**: Include all expected props in propTypes
- **Use isRequired**: Mark required props appropriately
- **Provide defaults**: Use defaultProps for optional props
- **Document with comments**: Add comments for complex prop structures

### Performance Considerations
- **Avoid inline objects/functions**: Define outside render or use useCallback/useMemo
- **Optimize dependencies**: Keep dependency arrays minimal and stable
- **Consider lazy initial state**: For expensive initial state calculations
- **Use React DevTools**: Profile component re-renders

### Code Organization
- **Custom hooks**: Extract reusable stateful logic
- **Component composition**: Break down complex components
- **File structure**: Organize by feature or component type
- **Naming conventions**: Clear, descriptive names for state and functions

---

## Common Patterns and Use Cases

### Data Fetching Pattern
```jsx
function useApiData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch');
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [url]);
    
    return { data, loading, error };
}

// Usage
function UserList() {
    const { data: users, loading, error } = useApiData('/api/users');
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <ul>
            {users?.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

### Form State Management Pattern
```jsx
function useForm(initialState, validate) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    
    const handleChange = (name, value) => {
        setValues(prev => ({ ...prev, [name]: value }));
        
        if (touched[name] && errors[name]) {
            const fieldErrors = validate({ ...values, [name]: value });
            setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
        }
    };
    
    const handleBlur = (name) => {
        setTouched(prev => ({ ...prev, [name]: true }));
        const fieldErrors = validate(values);
        if (fieldErrors[name]) {
            setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
        }
    };
    
    const handleSubmit = (callback) => {
        const formErrors = validate(values);
        setErrors(formErrors);
        setTouched(Object.keys(values).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {}));
        
        if (Object.keys(formErrors).length === 0) {
            callback(values);
        }
    };
    
    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    };
}
```

### Local Storage Sync Pattern
```jsx
function useLocalStorageState(key, defaultValue) {
    const [state, setState] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    });
    
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch {
            // Handle storage errors silently
        }
    }, [key, state]);
    
    return [state, setState];
}

// Usage
function Settings() {
    const [theme, setTheme] = useLocalStorageState('theme', 'light');
    const [preferences, setPreferences] = useLocalStorageState('prefs', {});
    
    return (
        <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme ({theme})
            </button>
        </div>
    );
}
```

This comprehensive Day 7 documentation covers all fundamental React hooks and PropTypes concepts, providing practical examples and best practices for building robust React applications with state management and type checking.