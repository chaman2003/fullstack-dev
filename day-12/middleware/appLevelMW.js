import express from "express"

const app=express();


//middleware without using routes
app.use((req,res,next)=>{
    console.log('Initiated midlware at'+Date.now())
    next()
    
    res.on('finish',()=>{
        console.log("MIddlware loaded successfully")
        console.log("Finished using middleware")
})})

app.get("/",(req,res)=>{
    res.send("Hello World!")
})

//middleware using routes
app.use("/welcome",(req,res,next)=>{
    console.log('Initiated midlware at'+Date.now())
    next()
    res.on('finish',()=>{
        console.log("MIddlware loaded successfully")
        console.log("Finished using middleware")
})})
    

app.get("/welcome",(req,res)=>{
    res.send("WElcome to EXpress JS ")
})

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Your server is running at http://localhost:${PORT}`)
})