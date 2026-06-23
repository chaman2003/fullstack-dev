# Day 3 - JavaScript Basics

JavaScript makes web pages interactive. This day covers the core language fundamentals.

## Learning Objectives
- Declare variables with let, const, and var
- Use operators, conditionals, and loops
- Write and call functions
- Work with arrays and objects
- Understand scope and hoisting
- Manipulate the DOM
- Handle events

## Concepts Covered

### Variables
```js
let name = "John";      // can reassign
const age = 30;         // cannot reassign
var city = "NYC";       // old way, function-scoped
```

### Data Types
Primitive: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`. Reference: `object`, `array`, `function`.

### Functions
```js
// declaration
function add(a, b) { return a + b; }
// arrow
const multiply = (a, b) => a * b;
```

### Objects & Arrays
```js
const person = { name: "Alice", age: 25 };
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
```

### Scope & Hoisting
- `let`/`const`: block-scoped. `var`: function-scoped.
- Hoisting: function declarations and `var` are moved to the top.
- `let`/`const` are hoisted but not initialized (Temporal Dead Zone).

### DOM Manipulation
```js
document.getElementById("myId");
document.querySelector(".myClass");
element.textContent = "New text";
element.style.color = "red";
element.classList.add("active");
```

### Events
```js
button.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked!");
});
```

## Files
| File | Description |
|------|-------------|
| `1variablesDeclare.js` | let, const, var examples |
| `2var.html` | var vs let/const scope |
| `3conditional.html` | if/else, switch, ternary |
| `4operators.html` | Arithmetic, comparison, logical operators |
| `5loops.html` | for, while, do-while, forEach |
| `6objects.html` | Object creation, methods, iteration |
| `7functions.html` | Function declarations, expressions, arrows |
| `8scope.html` | Global, function, block scope |
| `9hoisting.html` | Hoisting behavior with var and functions |
| `10closures.html` | Closure examples and use cases |
| `index.html` | All concepts overview |
