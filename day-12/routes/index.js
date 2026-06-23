const express = require('express')

const app=express()

//basic routing
app.get("/",(req,res)=>{
    res.send("Hello World!")
})

app.get("/about",(req,res)=>{
    res.send("Welcome to about page")
})

app.get("/help",(req,res)=>{
    res.send("Welcome to help page")
})


//dynamic routing

//dynamic parameter routing
app.get("/user/:username",(req,res)=>{
    const username=req.params.username
    res.send(`Welcome ${username}`)
})

//query string routing
app.get('/search',(req,res)=>{
    const key=req.query.key
    res.send(`Searching for ${key}`)
})

const PORT=3000

app.listen(PORT,()=>{
    console.log(`Your server is running in http://localhost:${PORT} ` )
})