import express from 'express';

const app=express();

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use("/public",express.static("public"))
app.use("/text",express.static("text"))

app.listen(5000,()=>{
    console.log("Server is running at http://localhost:5000")
})