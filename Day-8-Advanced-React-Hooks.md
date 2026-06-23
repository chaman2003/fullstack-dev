# Day 8: Advanced React Hooks - Complete Documentation

## Table of Contents

1. [Introduction to Advanced React Hooks](#introduction-to-advanced-react-hooks)
2. [useRef Hook - DOM References and Mutable Values](#useref-hook---dom-references-and-mutable-values)
3. [useMemo Hook - Performance Optimization](#usememo-hook---performance-optimization)
4. [useCallback Hook - Function Memoization](#usecallback-hook---function-memoization)
5. [useContext Hook - Global State Management](#usecontext-hook---global-state-management)
6. [React.memo - Component Memoization](#reactmemo---component-memoization)
7. [Advanced useState Patterns](#advanced-usestate-patterns)
8. [Performance Optimization Strategies](#performance-optimization-strategies)
9. [Complete Code Examples](#complete-code-examples)
10. [Key Learning Objectives](#key-learning-objectives)
11. [Best Practices](#best-practices)
12. [Common Patterns and Use Cases](#common-patterns-and-use-cases)

---

## Introduction to Advanced React Hooks

Day 8 focuses on advanced React hooks that provide performance optimizations and more sophisticated state management capabilities. These hooks help build more efficient and scalable React applications.

### Advanced Hooks Overview
- **useRef**: Access DOM elements and store mutable values
- **useMemo**: Memoize expensive calculations
- **useCallback**: Memoize function references
- **useContext**: Access context values without prop drilling
- **React.memo**: Memoize component rendering

### Performance Concepts
- **Memoization**: Caching results to avoid unnecessary recalculations
- **Re-rendering**: Understanding when and why components re-render
- **Optimization**: Techniques to improve app performance
- **Memory Management**: Efficient use of browser memory

---

## useRef Hook - DOM References and Mutable Values

useRef returns a mutable ref object whose `.current` property is initialized to the passed argument and persists for the full lifetime of the component.

### Basic useRef for DOM Access
```jsx
import React, { useRef } from 'react';

function Ref() {
    const inputRef = useRef(null);
    
    const handleClick = () => {
        // Direct DOM manipulation
        inputRef.current.style.backgroundColor = "red";
        inputRef.current.focus();
    };
    
    return (
        <div>
            <button onClick={handleClick}>Style Input</button>
            <input type="text" ref={inputRef} />
        </div>
    );
}

export default Ref;
```

### useRef for Counting Renders
```jsx
import { useEffect, useRef, useState } from 'react';

function Uref() {
    const [value, setValue] = useState(0);
    const renderCount = useRef(0);
    
    // Count renders without causing re-renders
    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    });
    
    const inputRef = useRef();
    const buttonRef = useRef();
    
    const handleButtonClick = () => {
        console.log(inputRef.current);
        inputRef.current.style.background = "blue";
        inputRef.current.focus();
    };
    
    // Direct manipulation (be careful with this)
    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.textContent = "Modified by useRef";
        }
    }, []);
    
    return (
        <div>
            <button onClick={() => setValue(prev => prev + 1)}>+</button>
            <h1>Value: {value}</h1>
            <button onClick={() => setValue(prev => prev - 1)}>-</button>
            <h2>Render Count: {renderCount.current}</h2>
            
            {/* DOM manipulation */}
            <input type="text" ref={inputRef} placeholder="I'll turn blue!" />
            <button onClick={handleButtonClick}>Style Input</button>
            <button ref={buttonRef}>Original Text</button>
        </div>
    );
}

export default Uref;
```

### useRef vs useState for Mutable Values
```jsx
function RefVsState() {
    const [stateCount, setStateCount] = useState(0);
    const refCount = useRef(0);
    
    const incrementState = () => {
        setStateCount(prev => prev + 1); // Causes re-render
    };
    
    const incrementRef = () => {
        refCount.current += 1; // No re-render
        console.log('Ref count:', refCount.current);
    };
    
    return (
        <div>
            <h2>State Count: {stateCount}</h2>
            <h2>Ref Count: {refCount.current}</h2>
            <button onClick={incrementState}>Increment State</button>
            <button onClick={incrementRef}>Increment Ref</button>
        </div>
    );
}
```

### Advanced useRef Patterns
```jsx
function AdvancedRefExample() {
    const intervalRef = useRef();
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    const startTimer = () => {
        if (!isRunning) {
            intervalRef.current = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
            setIsRunning(true);
        }
    };
    
    const stopTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };
    
    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setCount(0);
        setIsRunning(false);
    };
    
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
    
    return (
        <div>
            <h1>Timer: {count}</h1>
            <button onClick={startTimer} disabled={isRunning}>Start</button>
            <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}
```

---

## useMemo Hook - Performance Optimization

useMemo memoizes the result of a computation and only recalculates when its dependencies change.

### Basic useMemo Usage
```jsx
import React, { useMemo, useState } from 'react';

function Umemo() {
    const [num, setNum] = useState(0);
    const [count, setCount] = useState(0);
    
    const cube = (number) => {
        console.log("Expensive calculation running...");
        return Math.pow(number, 3);
    };
    
    // Without memo (recalculates on every render)
    // const result = cube(num);
    
    // With memo (only recalculates when num changes)
    const result = useMemo(() => cube(num), [num]);
    
    return (
        <div>
            <input 
                type="number" 
                value={num} 
                onChange={(e) => setNum(parseInt(e.target.value) || 0)} 
            />
            <h1>Cube of {num} is {result}</h1>
            
            <button onClick={() => setCount(count + 1)}>
                Counter: {count}
            </button>
        </div>
    );
}

export default Umemo;
```

### Complex useMemo Examples
```jsx
function ComplexMemoExample() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    
    // Expensive filtering and sorting
    const processedUsers = useMemo(() => {
        console.log('Processing users...');
        
        let filtered = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        return filtered.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'age') return a.age - b.age;
            return 0;
        });
    }, [users, searchTerm, sortBy]);
    
    // Expensive calculation
    const userStats = useMemo(() => {
        console.log('Calculating stats...');
        return {
            total: users.length,
            averageAge: users.reduce((sum, user) => sum + user.age, 0) / users.length || 0,
            filtered: processedUsers.length
        };
    }, [users, processedUsers]);
    
    return (
        <div>
            <input 
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Sort by Name</option>
                <option value="age">Sort by Age</option>
            </select>
            
            <div>
                <p>Total Users: {userStats.total}</p>
                <p>Average Age: {userStats.averageAge.toFixed(1)}</p>
                <p>Filtered Results: {userStats.filtered}</p>
            </div>
            
            {processedUsers.map(user => (
                <div key={user.id}>
                    {user.name} - {user.age} years
                </div>
            ))}
        </div>
    );
}
```

### When to Use useMemo
```jsx
function MemoGuidelines() {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState('');
    
    // ❌ Don't memo simple calculations
    const doubledCount = useMemo(() => count * 2, [count]); // Unnecessary
    
    // ✅ Do memo expensive calculations
    const expensiveValue = useMemo(() => {
        // Simulate expensive operation
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
            result += Math.random();
        }
        return result;
    }, [count]); // Only recalculate when count changes
    
    // ✅ Do memo complex object/array creation
    const userConfig = useMemo(() => ({
        theme: 'dark',
        language: 'en',
        preferences: {
            notifications: true,
            autoSave: false
        }
    }), []); // Only create once
    
    return (
        <div>
            <h2>Count: {count}</h2>
            <h3>Doubled: {doubledCount}</h3>
            <h3>Expensive: {expensiveValue.toFixed(2)}</h3>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
        </div>
    );
}
```

---

## useCallback Hook - Function Memoization

useCallback memoizes a function and only recreates it when its dependencies change, preventing unnecessary re-renders of child components.

### Basic useCallback Usage
```jsx
import React, { useCallback, useState } from 'react';
import Header from './components/Header';

function Ucallback() {
    const [count, setCount] = useState(0);
    
    const add = () => {
        setCount(count + 1);
    };
    
    // Memoize function to prevent Header re-renders
    const memoizedFunction = useCallback(() => {
        console.log('Callback function called');
    }, []); // Empty dependency array
    
    return (
        <>
            <Header memoizedFunction={memoizedFunction} />
            <div>
                <h1>Count: {count}</h1>
                <button onClick={add}>+</button>
            </div>
        </>
    );
}

export default Ucallback;
```

### useCallback with Dependencies
```jsx
function CallbackWithDeps() {
    const [count, setCount] = useState(0);
    const [multiplier, setMultiplier] = useState(2);
    
    // Function recreated only when dependencies change
    const calculateValue = useCallback((value) => {
        console.log('Calculating...');
        return value * multiplier;
    }, [multiplier]);
    
    // Function with multiple dependencies
    const complexCalculation = useCallback(() => {
        return count * multiplier + Math.random();
    }, [count, multiplier]);
    
    return (
        <div>
            <h2>Count: {count}</h2>
            <h2>Multiplier: {multiplier}</h2>
            <h2>Result: {calculateValue(count)}</h2>
            
            <button onClick={() => setCount(c => c + 1)}>
                Increment Count
            </button>
            <button onClick={() => setMultiplier(m => m + 1)}>
                Increment Multiplier
            </button>
            
            <ExpensiveChild onCalculate={complexCalculation} />
        </div>
    );
}

const ExpensiveChild = React.memo(({ onCalculate }) => {
    console.log('ExpensiveChild rendered');
    
    return (
        <div>
            <button onClick={onCalculate}>Calculate</button>
        </div>
    );
});
```

### useCallback vs useMemo
```jsx
function CallbackVsMemo() {
    const [count, setCount] = useState(0);
    
    // useMemo memoizes the RESULT of a function
    const memoizedValue = useMemo(() => {
        return count * 2;
    }, [count]);
    
    // useCallback memoizes the FUNCTION itself
    const memoizedCallback = useCallback((value) => {
        return value * 2;
    }, []);
    
    return (
        <div>
            <h2>Memoized Value: {memoizedValue}</h2>
            <button onClick={() => console.log(memoizedCallback(count))}>
                Use Memoized Callback
            </button>
            <button onClick={() => setCount(c => c + 1)}>
                Increment
            </button>
        </div>
    );
}
```

---

## useContext Hook - Global State Management

useContext provides a way to pass data through the component tree without having to pass props down manually at every level.

### Basic Context Setup
```jsx
import { createContext, useContext } from 'react';

// Create context
export const UserContext = createContext();

// Context provider component
const ContextProvider = ({ children }) => {
    const phone = "+91 6361005641";
    const user = {
        name: "Chaman",
        email: "chaman@example.com",
        phone: phone
    };
    
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export default ContextProvider;
```

### Using Context in Components
```jsx
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function UserProfile() {
    const user = useContext(UserContext);
    
    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
        </div>
    );
}

function ContactInfo() {
    const user = useContext(UserContext);
    
    return (
        <div>
            <h3>Contact: {user.phone}</h3>
        </div>
    );
}

// App component
function App() {
    return (
        <ContextProvider>
            <UserProfile />
            <ContactInfo />
        </ContextProvider>
    );
}
```

### Advanced Context with State Management
```jsx
import { createContext, useContext, useReducer } from 'react';

// Action types
const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    RESET: 'reset'
};

// Reducer function
const counterReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return { count: state.count + 1 };
        case ACTIONS.DECREMENT:
            return { count: state.count - 1 };
        case ACTIONS.RESET:
            return { count: 0 };
        default:
            return state;
    }
};

// Create context
const CounterContext = createContext();

// Provider component
export const CounterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });
    
    const increment = () => dispatch({ type: ACTIONS.INCREMENT });
    const decrement = () => dispatch({ type: ACTIONS.DECREMENT });
    const reset = () => dispatch({ type: ACTIONS.RESET });
    
    const value = {
        count: state.count,
        increment,
        decrement,
        reset
    };
    
    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    );
};

// Custom hook for using counter context
export const useCounter = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error('useCounter must be used within CounterProvider');
    }
    return context;
};

// Components using the context
function CounterDisplay() {
    const { count } = useCounter();
    return <h1>Count: {count}</h1>;
}

function CounterControls() {
    const { increment, decrement, reset } = useCounter();
    
    return (
        <div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}
```

### Multiple Contexts
```jsx
// Theme context
const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Auth context
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// App with multiple providers
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CounterProvider>
                    <MainApp />
                </CounterProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

// Component using multiple contexts
function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logout } = useContext(AuthContext);
    const { count } = useCounter();
    
    return (
        <header style={{ 
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            color: theme === 'light' ? '#333' : '#fff'
        }}>
            <h1>My App</h1>
            <p>Count: {count}</p>
            {user ? (
                <div>
                    Welcome, {user.name}!
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <button>Login</button>
            )}
            <button onClick={toggleTheme}>
                Toggle Theme ({theme})
            </button>
        </header>
    );
}
```

---

## React.memo - Component Memoization

React.memo is a higher order component that memoizes the result of a component and only re-renders when its props change.

### Basic React.memo Usage
```jsx
import React from 'react';

function Header({ title, count }) {
    console.log("Header rendered");
    
    return (
        <div>
            <h1>{title}</h1>
            <p>Count: {count}</p>
        </div>
    );
}

export default React.memo(Header);
```

### React.memo with Custom Comparison
```jsx
const UserCard = React.memo(({ user, settings }) => {
    console.log('UserCard rendered');
    
    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Theme: {settings.theme}</p>
        </div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison function
    // Return true if props are equal (skip re-render)
    // Return false if props are different (re-render)
    
    return (
        prevProps.user.id === nextProps.user.id &&
        prevProps.user.name === nextProps.user.name &&
        prevProps.settings.theme === nextProps.settings.theme
    );
});
```

### React.memo Best Practices
```jsx
// ✅ Good use case - expensive component with frequent parent updates
const ExpensiveChart = React.memo(({ data, config }) => {
    console.log('Rendering expensive chart...');
    
    // Expensive rendering logic
    return (
        <div>
            <canvas>Chart with {data.length} points</canvas>
        </div>
    );
});

// ❌ Bad use case - simple component that changes frequently
const SimpleButton = React.memo(({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
});

// ✅ Better approach - memo with useCallback for functions
function ParentComponent() {
    const [count, setCount] = useState(0);
    const [chartData, setChartData] = useState([]);
    
    const handleClick = useCallback(() => {
        console.log('Button clicked');
    }, []);
    
    return (
        <div>
            <ExpensiveChart data={chartData} config={{ theme: 'dark' }} />
            <SimpleButton onClick={handleClick}>
                Click me ({count})
            </SimpleButton>
            <button onClick={() => setCount(c => c + 1)}>
                Update Count
            </button>
        </div>
    );
}
```

---

## Advanced useState Patterns

Building on Day 7's useState knowledge with more sophisticated patterns.

### Complex State Management
```jsx
function Ustate() {
    // Multiple state variables
    const [color, setColor] = useState("secret🤫");
    
    const [specs, setSpecs] = useState({
        processor: "idk",
        ram: "idk", 
        storage: "idk",
        pcolor: "idk"
    });
    
    const [count, setCount] = useState(0);
    
    const changeColor = () => {
        setColor('Blue');
    };
    
    const revealSpecs = () => {
        setSpecs({
            processor: "Mediatek",
            ram: "12gb",
            storage: "512gb",
            pcolor: "Yellow, Black, White"
        });
    };
    
    const addToCart = () => {
        setCount(prevCount => prevCount + 1);
    };
    
    return (
        <div>
            <h1>My favourite color is {color}</h1>
            <button onClick={changeColor}>Reveal color</button>
            
            <h1>Phone is Poco💣</h1>
            <h2>{specs.processor}, {specs.ram}, {specs.storage}</h2>
            <button onClick={revealSpecs}>Show more info</button>
            <h4>Color Options are: {specs.pcolor}</h4>
            
            <h1>Liked the Product?</h1>
            <h2>🛒{count} added to cart</h2>
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
}

export default Ustate;
```

### State Updater Patterns
```jsx
function StatePatterns() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        preferences: {
            theme: 'light',
            notifications: true
        }
    });
    
    // ✅ Correct way to update nested object
    const updateUserName = (newName) => {
        setUser(prevUser => ({
            ...prevUser,
            name: newName
        }));
    };
    
    // ✅ Correct way to update nested preferences
    const updateTheme = (newTheme) => {
        setUser(prevUser => ({
            ...prevUser,
            preferences: {
                ...prevUser.preferences,
                theme: newTheme
            }
        }));
    };
    
    // ✅ Using functional updates for multiple changes
    const resetUser = () => {
        setUser(prevUser => ({
            name: '',
            email: '',
            preferences: {
                theme: 'light',
                notifications: true
            }
        }));
    };
    
    return (
        <div>
            <input 
                value={user.name}
                onChange={(e) => updateUserName(e.target.value)}
                placeholder="Name"
            />
            <button onClick={() => updateTheme('dark')}>
                Dark Theme
            </button>
            <button onClick={resetUser}>Reset</button>
            
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
}
```

---

## Performance Optimization Strategies

### Comprehensive Performance Example
```jsx
function OptimizedApp() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedUser, setSelectedUser] = useState(null);
    
    // Memoize expensive filtering and sorting
    const filteredUsers = useMemo(() => {
        console.log('Filtering users...');
        return users
            .filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => {
                const order = sortOrder === 'asc' ? 1 : -1;
                return a.name.localeCompare(b.name) * order;
            });
    }, [users, filter, sortOrder]);
    
    // Memoize event handlers
    const handleUserSelect = useCallback((user) => {
        setSelectedUser(user);
    }, []);
    
    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);
    
    return (
        <div>
            <SearchBar 
                filter={filter} 
                onFilterChange={handleFilterChange}
            />
            <UserList 
                users={filteredUsers}
                onUserSelect={handleUserSelect}
            />
            {selectedUser && (
                <UserDetails user={selectedUser} />
            )}
        </div>
    );
}

const SearchBar = React.memo(({ filter, onFilterChange }) => {
    console.log('SearchBar rendered');
    
    return (
        <input
            type="text"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Search users..."
        />
    );
});

const UserList = React.memo(({ users, onUserSelect }) => {
    console.log('UserList rendered');
    
    return (
        <div>
            {users.map(user => (
                <UserItem
                    key={user.id}
                    user={user}
                    onSelect={onUserSelect}
                />
            ))}
        </div>
    );
});

const UserItem = React.memo(({ user, onSelect }) => {
    const handleClick = useCallback(() => {
        onSelect(user);
    }, [user, onSelect]);
    
    return (
        <div onClick={handleClick}>
            {user.name} - {user.email}
        </div>
    );
});
```

---

## Complete Code Examples

### Example 1: Advanced useEffect with Cleanup
```jsx
function Ueffect() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    
    // No dependency - runs after every render
    useEffect(() => {
        const timer = setTimeout(() => {
            setCount1(prevCount => prevCount + 1);
        }, 2000);
        
        return () => clearTimeout(timer);
    });
    
    // Empty dependency - runs only once
    useEffect(() => {
        const timer = setTimeout(() => {
            setCount2(prevCount => prevCount + 1);
        }, 2000);
        
        return () => clearTimeout(timer);
    }, []);
    
    // With dependency - runs when count3 changes
    useEffect(() => {
        const timer = setTimeout(() => {
            setCount3(prevCount => prevCount + 1);
        }, 2000);
        
        return () => clearTimeout(timer);
    }, [count3]);
    
    return (
        <div>
            <h1>Rendered {count1} times (no dependency)</h1>
            <h1>Rendered {count2} times (empty dependency)</h1>
            <h1>Rendered {count3} times (with dependency)</h1>
        </div>
    );
}

export default Ueffect;
```

### Example 2: Complete Performance-Optimized Component
```jsx
import React, { useState, useMemo, useCallback, useRef, useContext } from 'react';

const ThemeContext = createContext();

function PerformanceDemo() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const inputRef = useRef();
    
    // Expensive computation memoized
    const processedItems = useMemo(() => {
        console.log('Processing items...');
        return items
            .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => {
                if (sortBy === 'name') return a.name.localeCompare(b.name);
                if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
                return 0;
            });
    }, [items, filter, sortBy]);
    
    // Memoized event handlers
    const handleAddItem = useCallback(() => {
        const name = inputRef.current.value;
        if (name.trim()) {
            setItems(prev => [...prev, {
                id: Date.now(),
                name: name.trim(),
                date: new Date().toISOString()
            }]);
            inputRef.current.value = '';
        }
    }, []);
    
    const handleDeleteItem = useCallback((id) => {
        setItems(prev => prev.filter(item => item.id !== id));
    }, []);
    
    return (
        <ThemeContext.Provider value={{ theme: 'dark' }}>
            <div>
                <div>
                    <input ref={inputRef} placeholder="Add new item" />
                    <button onClick={handleAddItem}>Add</button>
                </div>
                
                <SearchFilter 
                    filter={filter} 
                    onFilterChange={setFilter}
                />
                
                <SortControls 
                    sortBy={sortBy} 
                    onSortChange={setSortBy}
                />
                
                <ItemList 
                    items={processedItems}
                    onDelete={handleDeleteItem}
                />
            </div>
        </ThemeContext.Provider>
    );
}

const SearchFilter = React.memo(({ filter, onFilterChange }) => {
    console.log('SearchFilter rendered');
    
    return (
        <input
            type="text"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Filter items..."
        />
    );
});

const SortControls = React.memo(({ sortBy, onSortChange }) => {
    console.log('SortControls rendered');
    
    return (
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
        </select>
    );
});

const ItemList = React.memo(({ items, onDelete }) => {
    console.log('ItemList rendered');
    
    return (
        <div>
            {items.map(item => (
                <ItemComponent
                    key={item.id}
                    item={item}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
});

const ItemComponent = React.memo(({ item, onDelete }) => {
    const theme = useContext(ThemeContext);
    
    const handleDelete = useCallback(() => {
        onDelete(item.id);
    }, [item.id, onDelete]);
    
    return (
        <div style={{ 
            backgroundColor: theme.theme === 'dark' ? '#333' : '#fff',
            color: theme.theme === 'dark' ? '#fff' : '#333'
        }}>
            <span>{item.name}</span>
            <span>{new Date(item.date).toLocaleDateString()}</span>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
});
```

---

## Key Learning Objectives

After completing Day 8, students should understand:

### Advanced Hook Usage
1. **useRef Applications**: DOM manipulation, mutable values, timer management
2. **useMemo Optimization**: Expensive calculations, object/array memoization
3. **useCallback Functions**: Function memoization, preventing re-renders
4. **useContext Management**: Global state, avoiding prop drilling

### Performance Optimization
1. **Memoization Concepts**: When and why to use memoization
2. **Re-render Prevention**: React.memo, useCallback, useMemo
3. **Memory Management**: Cleanup functions, reference management
4. **Profiling**: Identifying performance bottlenecks

### Component Architecture
1. **Component Composition**: Breaking down complex components
2. **State Management**: Local vs global state decisions
3. **Context Patterns**: Provider setup, custom hooks
4. **Optimization Strategies**: Balancing performance and complexity

### Best Practices
1. **Hook Dependencies**: Proper dependency array management
2. **Function References**: Stable function references
3. **Context Design**: Avoiding over-use of context
4. **Performance Monitoring**: Measuring optimization impact

---

## Best Practices

### useRef Best Practices
- **Don't overuse for DOM manipulation**: Prefer React's declarative approach
- **Use for mutable values**: That don't need to trigger re-renders
- **Clean up timers and intervals**: Prevent memory leaks
- **Avoid conditional refs**: Ensure refs are always defined

### useMemo Best Practices
- **Profile before optimizing**: Measure performance impact
- **Include all dependencies**: Avoid stale closures
- **Don't memo everything**: Simple calculations may not benefit
- **Consider object/array creation**: New objects on every render

### useCallback Best Practices
- **Use with React.memo**: Prevent child component re-renders
- **Include all dependencies**: Functions should be pure
- **Don't overuse**: Not all functions need memoization
- **Combine with useMemo**: For complex optimization strategies

### useContext Best Practices
- **Avoid overuse**: Not everything needs to be global
- **Split contexts**: Separate concerns into different contexts
- **Provide fallbacks**: Handle missing context gracefully
- **Use custom hooks**: Encapsulate context logic

### Performance Optimization
- **Measure first**: Use React DevTools Profiler
- **Optimize bottlenecks**: Focus on expensive operations
- **Balance complexity**: Don't over-optimize simple components
- **Consider bundle size**: Optimization libraries add weight

---

## Common Patterns and Use Cases

### Custom Hook for API Data
```jsx
function useApiData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef();
    
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            abortControllerRef.current = new AbortController();
            
            const response = await fetch(url, {
                signal: abortControllerRef.current.signal
            });
            
            if (!response.ok) throw new Error('Failed to fetch');
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [url]);
    
    useEffect(() => {
        fetchData();
        
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [fetchData]);
    
    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);
    
    return { data, loading, error, refetch };
}
```

### Performance-Optimized List Component
```jsx
const VirtualizedList = React.memo(({ items, renderItem, itemHeight = 50 }) => {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef();
    const containerHeight = 400;
    
    const visibleRange = useMemo(() => {
        const start = Math.floor(scrollTop / itemHeight);
        const end = Math.min(
            start + Math.ceil(containerHeight / itemHeight) + 1,
            items.length
        );
        return { start, end };
    }, [scrollTop, itemHeight, items.length, containerHeight]);
    
    const visibleItems = useMemo(() => {
        return items.slice(visibleRange.start, visibleRange.end);
    }, [items, visibleRange]);
    
    const handleScroll = useCallback((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);
    
    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{
                height: containerHeight,
                overflow: 'auto',
                position: 'relative'
            }}
        >
            <div style={{ height: items.length * itemHeight }}>
                <div
                    style={{
                        transform: `translateY(${visibleRange.start * itemHeight}px)`
                    }}
                >
                    {visibleItems.map((item, index) => (
                        <div
                            key={visibleRange.start + index}
                            style={{ height: itemHeight }}
                        >
                            {renderItem(item, visibleRange.start + index)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
```

This comprehensive Day 8 documentation covers all advanced React hooks and performance optimization techniques, providing practical examples and best practices for building efficient React applications.