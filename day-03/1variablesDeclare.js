/**
 * Main JavaScript file for Day 3 learning examples
 * Demonstrates different variable declarations and behaviors
 */

// Print a message to the console
console.log("Hello world");

// Example of 'var' variable - can be redeclared in the same scope
var y="chaman"
var y="hi"
console.log(y) // Outputs: "hi"

// Example of 'let' variable - cannot be redeclared but can be reassigned
let x="chaman"
 x="hi"
console.log(x) // Outputs: "hi"
    // alert(x); // Commented out alert statement

// Example of 'const' variable - cannot be redeclared or reassigned
// Note: This will cause an error when executed
const z="chaman"
z="hi" // This will cause a TypeError: Assignment to constant variable
console.log(z)






