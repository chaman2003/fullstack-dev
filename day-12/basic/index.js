//common js -  "type": "commonjs",
// const express = require("express") 

//module js -  "type": "module",
import express from "express"

const app=express()

app.get("/",(req,res)=>{
    res.send("Hello World!")
})

const PORT=3000

app.listen(PORT,()=>{
    console.log(`Your server is running in http://localhost:${PORT} ` )
})