import mongoose from "mongoose";

const personSchema= new mongoose.Schema({
    name:String,
    age:Number,
    email:String,    
})  

const person=mongoose.model("person",personSchema)

export default person 