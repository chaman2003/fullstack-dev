# Day 4: Advanced JavaScript - Complete Documentation

## Table of Contents

1. [Introduction to Advanced JavaScript](#introduction-to-advanced-javascript)
2. [Error Handling](#error-handling)
3. [Arrays and Array Methods](#arrays-and-array-methods)
4. [Destructuring](#destructuring)
5. [Spread and Rest Operators](#spread-and-rest-operators)
6. [JSON (JavaScript Object Notation)](#json-javascript-object-notation)
7. [Callbacks](#callbacks)
8. [Promises](#promises)
9. [Complete Code Examples](#complete-code-examples)
10. [Key Learning Objectives](#key-learning-objectives)
11. [Best Practices](#best-practices)
12. [Common Patterns and Use Cases](#common-patterns-and-use-cases)

---

## Introduction to Advanced JavaScript

Day 4 builds upon the JavaScript fundamentals covered in Day 3, introducing advanced concepts essential for modern web development. This includes error handling, advanced array manipulation, ES6+ features like destructuring and spread/rest operators, asynchronous programming with callbacks and promises, and data interchange with JSON.

### What You'll Learn:
- **Error Management**: Robust error handling techniques
- **Array Mastery**: Advanced array methods and manipulation
- **Modern Syntax**: ES6+ features for cleaner code
- **Asynchronous Programming**: Callbacks and promises
- **Data Handling**: JSON serialization and parsing

---

## Error Handling

Proper error handling is crucial for building robust applications that gracefully handle unexpected situations.

### Try-Catch-Finally Structure
```javascript
try {
    // Code that might throw an error
    throw new Error("Custom error message");
} catch (error) {
    // Handle the error
    console.log(error);           // Standard error output
    console.error("Error:", error); // Error-level output (red in console)
    console.warn("Warning");      // Warning-level output (yellow in console)
} finally {
    // Always executes, regardless of error occurrence
    console.log("Cleanup operations");
}
```

### Error Types and Handling
```javascript
// Built-in Error Types
try {
    // ReferenceError
    console.log(undefinedVariable);
} catch (error) {
    console.log(error.name);    // "ReferenceError"
    console.log(error.message); // "undefinedVariable is not defined"
}

// TypeError
try {
    null.someMethod();
} catch (error) {
    console.log(error.name); // "TypeError"
}

// SyntaxError (caught at parse time)
// eval("var a = ;"); // Would throw SyntaxError
```

### Custom Error Creation
```javascript
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

try {
    throw new CustomError("Something went wrong!");
} catch (error) {
    if (error instanceof CustomError) {
        console.log("Custom error handled:", error.message);
    }
}
```

### Practical Error Handling
```javascript
function safeDivision(a, b) {
    try {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    } catch (error) {
        console.error("Math error:", error.message);
        return null;
    }
}

console.log(safeDivision(10, 2)); // 5
console.log(safeDivision(10, 0)); // null (with error message)
```

---

## Arrays and Array Methods

Arrays are fundamental data structures in JavaScript with numerous built-in methods for manipulation and processing.

### Array Creation
```javascript
// Array literal notation (preferred)
let fruits = ["apple", "banana", "mango"];

// Array constructor
let numbers = new Array(1, 2, 3, 4, 5);

// Empty array
let empty = [];
```

### Basic Array Operations
```javascript
let fruits = ["apple", "banana", "mango"];

// Accessing elements (zero-indexed)
console.log(fruits[0]);     // "apple"
console.log(fruits.length); // 3

// Modifying elements
fruits[1] = "orange";
console.log(fruits); // ["apple", "orange", "mango"]
```

### Array Manipulation Methods

#### Adding and Removing Elements
```javascript
let fruits = ["apple", "banana"];

// Add to end
fruits.push("mango");        // ["apple", "banana", "mango"]

// Remove from end
let last = fruits.pop();     // Returns "mango", array becomes ["apple", "banana"]

// Add to beginning
fruits.unshift("kiwi");      // ["kiwi", "apple", "banana"]

// Remove from beginning
let first = fruits.shift();  // Returns "kiwi", array becomes ["apple", "banana"]
```

#### Array Search Methods
```javascript
let numbers = [1, 2, 3, 4, 5, 2, 1];

// Find index of element
console.log(numbers.indexOf(2));     // 1 (first occurrence)
console.log(numbers.lastIndexOf(2)); // 5 (last occurrence)
console.log(numbers.indexOf(10));    // -1 (not found)

// Check if element exists
console.log(numbers.includes(3));    // true
console.log(numbers.includes(10));   // false
```

### Advanced Array Methods

#### Iteration Methods
```javascript
let numbers = [1, 2, 3, 4, 5];

// Traditional for loop
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// For...of loop (ES6)
for (let num of numbers) {
    console.log(num);
}

// forEach method
numbers.forEach(num => console.log(num));

// forEach with index
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});
```

#### Transformation Methods
```javascript
let numbers = [1, 2, 3, 4, 5];

// map(): Transform each element
let squared = numbers.map(num => num * num);
console.log(squared); // [1, 4, 9, 16, 25]

// filter(): Keep elements that pass test
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce(): Reduce to single value
let sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// find(): Find first matching element
let found = numbers.find(num => num > 3);
console.log(found); // 4

// findIndex(): Find index of first matching element
let foundIndex = numbers.findIndex(num => num > 3);
console.log(foundIndex); // 3
```

#### Array Manipulation Methods
```javascript
let fruits = ["apple", "banana", "orange", "grape"];

// slice(): Extract section (non-destructive)
let citrus = fruits.slice(1, 3); // ["banana", "orange"]
console.log(fruits); // Original unchanged

// splice(): Change contents (destructive)
let removed = fruits.splice(2, 1, "mango"); // Remove 1 at index 2, add "mango"
console.log(fruits);  // ["apple", "banana", "mango", "grape"]
console.log(removed); // ["orange"]

// join(): Convert to string
let fruitString = fruits.join(", ");
console.log(fruitString); // "apple, banana, mango, grape"
```

#### Sorting and Reversing
```javascript
let numbers = [3, 1, 4, 1, 5, 9];
let letters = ["c", "a", "b"];

// sort(): Sort elements (modifies original)
numbers.sort(); // [1, 1, 3, 4, 5, 9] (lexicographic by default)
letters.sort(); // ["a", "b", "c"]

// Custom numeric sort
numbers.sort((a, b) => a - b); // Ascending: [1, 1, 3, 4, 5, 9]
numbers.sort((a, b) => b - a); // Descending: [9, 5, 4, 3, 1, 1]

// reverse(): Reverse array order
numbers.reverse();
console.log(numbers); // [1, 1, 3, 4, 5, 9]
```

#### Array Combination
```javascript
let fruits = ["apple", "banana"];
let vegetables = ["carrot", "broccoli"];

// concat(): Combine arrays
let produce = fruits.concat(vegetables);
console.log(produce); // ["apple", "banana", "carrot", "broccoli"]

// Spread operator (ES6)
let combined = [...fruits, ...vegetables, "spinach"];
console.log(combined); // ["apple", "banana", "carrot", "broccoli", "spinach"]
```

#### Array Flattening
```javascript
let nested = [1, [2, [3, 4]], 5];

// flat(): Flatten one level
let flat1 = nested.flat(); // [1, 2, [3, 4], 5]

// flat(depth): Flatten specific depth
let flat2 = nested.flat(2); // [1, 2, 3, 4, 5]

// flatMap(): Map then flatten
let numbers = [1, 2, 3];
let doubled = numbers.flatMap(x => [x, x * 2]);
console.log(doubled); // [1, 2, 2, 4, 3, 6]
```

---

## Destructuring

Destructuring is a convenient way to extract values from arrays or properties from objects into distinct variables.

### Array Destructuring
```javascript
let fruits = ["apple", "banana", "mango"];

// Basic destructuring
let [first, second, third] = fruits;
console.log(first);  // "apple"
console.log(second); // "banana"
console.log(third);  // "mango"

// Skip elements
let [firstFruit, , thirdFruit] = fruits;
console.log(firstFruit); // "apple"
console.log(thirdFruit); // "mango"

// Default values
let [a, b, c, d = "default"] = fruits;
console.log(d); // "default" (since fruits[3] is undefined)
```

### Object Destructuring
```javascript
let person = {
    name: "chaman",
    age: 22,
    sex: "male"
};

// Basic destructuring
let { name, age, sex } = person;
console.log(name); // "chaman"
console.log(age);  // 22

// Renaming variables
let { name: personName, age: personAge } = person;
console.log(personName); // "chaman"

// Default values
let { name, age, city = "Unknown" } = person;
console.log(city); // "Unknown"
```

### Nested Destructuring
```javascript
let man = {
    id: "69420",
    info: {
        name: "chaman",
        age: 22,
        sex: "male",
        location: {
            area: "konankunte",
            state: "karnataka"
        }
    }
};

// Extract nested values
let {
    id,
    info: {
        name,
        age,
        sex,
        location: { area }
    }
} = man;

console.log(id);   // "69420"
console.log(name); // "chaman"
console.log(area); // "konankunte"
```

### Function Parameter Destructuring
```javascript
// Object destructuring in function parameters
function greetPerson({ name, age }) {
    console.log(`Hello ${name}, you are ${age} years old`);
}

greetPerson({ name: "John", age: 30 });

// Array destructuring in function parameters
function sumFirstTwo([a, b]) {
    return a + b;
}

console.log(sumFirstTwo([1, 2, 3, 4])); // 3
```

---

## Spread and Rest Operators

The spread (...) and rest (...) operators provide powerful ways to work with arrays and objects.

### Spread Operator

#### Array Spreading
```javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5, 6]; // Expands arr1 elements
console.log(arr2); // [1, 2, 3, 4, 5, 6]

// Copying arrays
let original = [1, 2, 3];
let copy = [...original]; // Shallow copy
copy.push(4);
console.log(original); // [1, 2, 3] (unchanged)
console.log(copy);     // [1, 2, 3, 4]

// Function arguments
function sum(a, b, c) {
    return a + b + c;
}
let numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6
```

#### Object Spreading
```javascript
let obj1 = { name: "Chaman", age: 23 };
let obj2 = {
    ...obj1,
    sex: "Male",
    location: "Bangalore"
};
console.log(obj2);
// { name: "Chaman", age: 23, sex: "Male", location: "Bangalore" }

// Overriding properties
let updated = { ...obj1, age: 25 };
console.log(updated); // { name: "Chaman", age: 25 }
```

### Rest Operator

#### Array Rest
```javascript
let numbers = [1, 2, 3, 4, 5];
let [first, second, ...rest] = numbers;
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]
```

#### Object Rest
```javascript
let person = {
    name: "Chaman",
    age: 23,
    sex: "Male",
    location: "Bangalore"
};

let { name, ...rest } = person;
console.log(name); // "Chaman"
console.log(rest); // { age: 23, sex: "Male", location: "Bangalore" }
```

#### Function Rest Parameters
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Mixed parameters
function greet(greeting, ...names) {
    return `${greeting} ${names.join(", ")}`;
}

console.log(greet("Hello", "John", "Jane", "Bob"));
// "Hello John, Jane, Bob"
```

---

## JSON (JavaScript Object Notation)

JSON is a lightweight, text-based data interchange format widely used for API communication and data storage.

### JSON.stringify() - Object to JSON
```javascript
function stringify() {
    const person = {
        name: "Chaman",
        age: 25,
        city: "Delhi",
        hobbies: ["reading", "coding"],
        address: {
            street: "123 Main St",
            zip: "12345"
        }
    };
    
    return JSON.stringify(person);
    // Returns: '{"name":"Chaman","age":25,"city":"Delhi","hobbies":["reading","coding"],"address":{"street":"123 Main St","zip":"12345"}}'
}

console.log(stringify());
```

### JSON.parse() - JSON to Object
```javascript
function parsing() {
    let jsonString = '{"name":"Chaman","age":25,"city":"Delhi"}';
    let person = JSON.parse(jsonString);
    
    console.log(person);        // Object: {name: "Chaman", age: 25, city: "Delhi"}
    console.log(person.name);   // "Chaman"
    console.log(typeof person); // "object"
}

parsing();
```

### Advanced JSON Operations
```javascript
// JSON with replacer function
let data = {
    name: "John",
    age: 30,
    password: "secret123",
    email: "john@example.com"
};

// Exclude sensitive data
let jsonString = JSON.stringify(data, (key, value) => {
    if (key === "password") return undefined;
    return value;
});

// JSON with spacing for readability
let prettyJson = JSON.stringify(data, null, 2);
console.log(prettyJson);

// JSON parse with reviver function
let parsed = JSON.parse(jsonString, (key, value) => {
    if (key === "age") return value + 1;
    return value;
});
```

### JSON Data Validation
```javascript
function safeJsonParse(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Invalid JSON:", error.message);
        return null;
    }
}

// Valid JSON
let result1 = safeJsonParse('{"name":"John"}');
console.log(result1); // {name: "John"}

// Invalid JSON
let result2 = safeJsonParse('{name:"John"}'); // Missing quotes around key
console.log(result2); // null (with error message)
```

---

## Callbacks

Callbacks are functions passed as arguments to other functions, enabling asynchronous programming and event handling.

### Basic Callback Pattern
```javascript
function greet(name) {
    console.log(`Hello ${name}`);
}

function getUserName(callback) {
    const name = "chaman";
    callback(name); // Execute the callback with the name
}

getUserName(greet); // Outputs: "Hello chaman"
```

### Asynchronous Callbacks
```javascript
function fetchData(callback) {
    console.log("Fetching data...");
    
    // Simulate async operation with setTimeout
    setTimeout(() => {
        const data = { id: 1, name: "Sample Data" };
        callback(data);
    }, 2000);
}

function handleData(data) {
    console.log("Data received:", data);
}

fetchData(handleData);
// Outputs: "Fetching data..." immediately
// Then after 2 seconds: "Data received: {id: 1, name: 'Sample Data'}"
```

### Event Callbacks
```javascript
// Simulating event handling with callbacks
function addEventListener(event, callback) {
    console.log(`Listening for ${event} event...`);
    
    // Simulate event trigger after delay
    setTimeout(() => {
        callback({ type: event, timestamp: Date.now() });
    }, 1000);
}

addEventListener("click", (event) => {
    console.log(`Event triggered:`, event);
});
```

### Callback Hell and Solutions
```javascript
// Callback Hell Example (anti-pattern)
function step1(callback) {
    setTimeout(() => {
        console.log("Step 1 complete");
        callback();
    }, 1000);
}

function step2(callback) {
    setTimeout(() => {
        console.log("Step 2 complete");
        callback();
    }, 1000);
}

function step3(callback) {
    setTimeout(() => {
        console.log("Step 3 complete");
        callback();
    }, 1000);
}

// Nested callbacks (difficult to read and maintain)
step1(() => {
    step2(() => {
        step3(() => {
            console.log("All steps complete");
        });
    });
});
```

---

## Promises

Promises provide a cleaner way to handle asynchronous operations compared to callbacks.

### Promise States
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### Basic Promise Creation
```javascript
let proposal = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
        resolve("Maduve Hagona"); // Success message
    } else {
        reject("I also thought u as a friend"); // Failure message
    }
});

// Consuming the promise
proposal
    .then(result => console.log("Success:", result))
    .catch(error => console.log("Error:", error));
```

### Promise Chaining
```javascript
let firstStep = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
        resolve("Ninna mele ishta ide"); // "I like you"
    } else {
        reject("Ninna mele ishta illa"); // "I don't like you"
    }
});

// Chain multiple operations
firstStep
    .then(response => {
        console.log("Step 1:", response);
        return "Matte meeting arrange madona"; // Return for next then
    })
    .then(nextStep => {
        console.log("Step 2:", nextStep);
        return "Gift kodthini"; // Return for next then
    })
    .then(finalStep => {
        console.log("Step 3:", finalStep);
    })
    .catch(error => {
        console.log("Error at any step:", error);
    });
```

### Real-World Promise Examples
```javascript
// Simulating API call
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "John Doe",
                    email: "john@example.com"
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

// Using the promise
fetchUserData(1)
    .then(user => {
        console.log("User data:", user);
        return fetchUserPosts(user.id); // Return another promise
    })
    .then(posts => {
        console.log("User posts:", posts);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });

function fetchUserPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "First Post" },
                { id: 2, title: "Second Post" }
            ]);
        }, 500);
    });
}
```

### Promise Utility Methods
```javascript
// Promise.all() - Wait for all promises
let promise1 = Promise.resolve(3);
let promise2 = new Promise(resolve => setTimeout(() => resolve('foo'), 1000));
let promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log(values); // [3, "foo", 42]
    });

// Promise.race() - First promise to resolve/reject
Promise.race([promise1, promise2, promise3])
    .then(value => {
        console.log(value); // 3 (first to resolve)
    });

// Promise.allSettled() - All promises completed (regardless of outcome)
Promise.allSettled([promise1, promise2, Promise.reject("error")])
    .then(results => {
        console.log(results);
        // Array of objects with status and value/reason
    });
```

---

## Complete Code Examples

### Example 1: Error Handling (11errorhandling.html)
```javascript
/**
 * Comprehensive error handling demonstration
 */

// Custom error with try-catch-finally
try {
    throw new Error("New Error");
} catch (error) {
    console.log(error);         // Standard output
    console.error("Error:", error); // Error output (red)
    console.warn("Warning");    // Warning output (yellow)
} finally {
    console.log("Error caught successfully");
}

// Handling edge cases
try {
    let a = 10 / 0;  // Results in Infinity, not an error
    let b = a;
    console.log(b);  // Outputs: Infinity
} catch (error) {
    console.log("infinity is seen");
}
```

### Example 2: Advanced Array Operations (12array.html)
```javascript
/**
 * Complete array methods demonstration
 */

// Array creation methods
let a = [6, 9, 420, 7];
let b = new Array(6, 9, 420, 7, 8, 9, 10);

// Array manipulation
let fruits = ["apple", "banana", "mango"];
fruits.pop();           // Remove last
fruits.push("Guava");   // Add to end
fruits.unshift("kiwi"); // Add to beginning
fruits.shift();         // Remove first

// Array searching
let numbers = [1, 2, 3, 4, 5, 7, 2, 1];
console.log(numbers.indexOf(2));      // First occurrence: 1
console.log(numbers.lastIndexOf(2));  // Last occurrence: 6
console.log(numbers.includes(420));   // false

// Array iteration
numbers.forEach(num => console.log(num));

// Array transformation
let cubed = numbers.map(num => num ** 3);
let odds = numbers.filter(num => num % 2);
let sum = numbers.reduce((total, num) => total + num, 0);

// Array manipulation
let phones = ["Poco", "Samsung", "nokia", "Apple"];
let sliced = phones.slice(1, 4);  // Non-destructive
phones.splice(2, 1, "Lava");      // Destructive replacement

// Array sorting
numbers.sort((a, b) => a - b);    // Ascending
numbers.sort((a, b) => b - a);    // Descending

// Array combination
let laptops = ["Asus", "Apple", "HP", "Dell", "Acer"];
let combined = [...phones, ...laptops];

// Array flattening
let nested = [1, [2, [3]]];
let flattened = nested.flat(2);
```

### Example 3: Complete Destructuring (13destructing.html)
```javascript
/**
 * Comprehensive destructuring examples
 */

// Array destructuring
let fruits = ["apple", "banana", "Mango"];
let [first, second, third] = fruits;

// Object destructuring with nested structure
let man = {
    id: "69420",
    info: {
        name: "chaman",
        age: 22,
        sex: "male",
        location: {
            area: "konankunte",
            state: "karnataka"
        }
    }
};

let { 
    id, 
    info: { 
        name, 
        age, 
        sex, 
        location: { area } 
    } 
} = man;

// Rest pattern in destructuring
let animals = ["cat", "dog", "dinosaur", "cow", "sheep", "wolf"];
let [firstAnimal, ...restAnimals] = animals;
console.log(restAnimals); // ["dog", "dinosaur", "cow", "sheep", "wolf"]
```

### Example 4: Spread and Rest Operators (14spread-rest.html)
```javascript
/**
 * Spread and rest operators demonstration
 */

// Spread with arrays
function spreadArray() {
    let arr1 = [1, 2, 3];
    let arr2 = [...arr1, 4, 5, 6];
    console.log(arr2); // [1, 2, 3, 4, 5, 6]
}

// Spread with objects
function spreadObject() {
    let obj1 = { name: "Chaman", Age: 23 };
    let obj2 = { 
        ...obj1, 
        sex: "Male", 
        location: "Bangalore" 
    };
    console.log(obj2);
}

// Rest with objects
function restObject() {
    let person = { 
        name: "Chaman", 
        age: 23, 
        sex: "Male", 
        location: "Bangalore" 
    };
    let { name, ...rest } = person;
    console.log(rest); // Object without name property
}
```

---

## Key Learning Objectives

After completing Day 4, students should understand:

### Error Management
1. **Try-Catch-Finally**: Implementing robust error handling
2. **Error Types**: Understanding different JavaScript error types
3. **Custom Errors**: Creating and throwing custom error objects
4. **Error Recovery**: Graceful degradation and fallback strategies

### Array Mastery
1. **Array Methods**: All built-in array manipulation methods
2. **Functional Programming**: map, filter, reduce patterns
3. **Array Iteration**: Different ways to loop through arrays
4. **Performance Considerations**: Choosing the right method for the task

### Modern JavaScript Features
1. **Destructuring**: Extracting values from arrays and objects
2. **Spread/Rest**: Modern syntax for array and object operations
3. **Template Literals**: String interpolation and multiline strings
4. **Arrow Functions**: Concise function syntax

### Asynchronous Programming
1. **Callback Pattern**: Understanding callback-based async programming
2. **Promise Fundamentals**: Creating and consuming promises
3. **Promise Chaining**: Sequential asynchronous operations
4. **Error Handling**: Managing errors in async code

### Data Interchange
1. **JSON Operations**: Serialization and parsing
2. **Data Validation**: Safe JSON operations
3. **API Communication**: Preparing data for web APIs
4. **Storage**: Local storage and data persistence

---

## Best Practices

### Error Handling
- **Always use try-catch** for operations that might fail
- **Log errors appropriately** with sufficient context
- **Provide user-friendly error messages** in production
- **Avoid silent failures** - always handle or log errors

### Array Operations
- **Use immutable methods** when possible (map, filter vs push, splice)
- **Choose appropriate iteration method** based on use case
- **Consider performance** for large arrays
- **Use meaningful variable names** in callbacks

### Modern JavaScript
- **Prefer const and let** over var
- **Use destructuring** for cleaner variable assignment
- **Leverage spread operator** for array/object copying
- **Use template literals** for string concatenation

### Asynchronous Code
- **Prefer promises over callbacks** for better readability
- **Handle all promise rejections** to avoid unhandled promise warnings
- **Use Promise.all** for parallel async operations
- **Consider async/await** for even cleaner async code (covered in Day 5)

### JSON Operations
- **Always validate JSON** before parsing
- **Use try-catch** with JSON.parse
- **Be aware of circular references** when stringifying
- **Consider data size** when working with large JSON objects

---

## Common Patterns and Use Cases

### Array Processing Pipeline
```javascript
// Process data through multiple transformations
let rawData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let result = rawData
    .filter(num => num % 2 === 0)      // Get even numbers
    .map(num => num * num)             // Square them
    .reduce((sum, num) => sum + num, 0); // Sum them up

console.log(result); // 220
```

### Error Boundaries for Async Operations
```javascript
async function safeApiCall(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("API call failed:", error);
        return null; // or default value
    }
}
```

### Configuration Object Pattern
```javascript
function createUser(config = {}) {
    let {
        name = "Anonymous",
        age = 0,
        email = "",
        preferences = {}
    } = config;

    return {
        name,
        age,
        email,
        preferences: { theme: "light", ...preferences }
    };
}

let user = createUser({
    name: "John",
    preferences: { theme: "dark" }
});
```

### Promise-based Retry Pattern
```javascript
function retry(fn, maxAttempts = 3) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        
        function attempt() {
            attempts++;
            fn()
                .then(resolve)
                .catch(error => {
                    if (attempts >= maxAttempts) {
                        reject(error);
                    } else {
                        setTimeout(attempt, 1000); // Wait 1 second before retry
                    }
                });
        }
        
        attempt();
    });
}

// Usage
retry(() => fetchData())
    .then(data => console.log("Success:", data))
    .catch(error => console.log("Failed after retries:", error));
```

This comprehensive Day 4 documentation covers all advanced JavaScript concepts essential for modern web development, providing practical examples and best practices for each topic.