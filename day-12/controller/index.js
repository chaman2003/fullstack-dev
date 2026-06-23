import express from 'express'
import router from './router.js'
import { userName, searchQuery, login, signup }  from './controller.js'

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


// Routing using controllers

//dynamic parameter routing
app.get("/user/:username",userName)

//query string routing
app.get('/search',searchQuery)


//route login & signup
app.get('/login',router)
app.get('/signup',router)

const PORT=3000

app.listen(PORT,()=>{
    console.log(`Your server is running in http://localhost:${PORT} ` )
})