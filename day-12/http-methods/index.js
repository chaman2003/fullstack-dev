import express from "express"

const app=express()

app.use(express.json())

app.post("/login",(req,res)=>{
    const {username ,email}=req.body
    res.send(`You logged in as ${username} with ${email}`)
})

app.put("/user/:id",(req,res)=>{
    const name=req.params.id;
    const {username,email}=req.body;
    // res.send(`You logged in as ${name}`)
    res.json({
        message:`username is ${name}`
    })
})

app.delete("/user/:id",(req,res)=>{
    const name=req.params.id;
    res.json({
        message:`username is ${name} and is deleted`
    })
})

app.get("/amazon/:phone/:name",(req,res)=>{
    const {phone,name}=req.params;
    
    // Check if name contains only 3 digits
    if(/^[0-9]{3}$/.test(name)) {
        res.json({
            phone,
            name
        })
    } else {
        res.status(400).json({
            error: "Name must be exactly 3 digits"
        })
    }
})

app.use((req,res)=>{
    res.send("Invalid Link") 
})

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server is running in http://localhost:${PORT}`)
})