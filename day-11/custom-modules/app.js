const greet=require("./greet")
const math=require("./math")

const name="Chaman"
console.log(greet(name))
console.log("Add",math.add(5,3))
console.log("Sub",math.subtract(5,3))
console.log("Multiply",math.multiply(5,3))
console.log("Divide:",math.divide(5,3))