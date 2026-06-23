import express from 'express';
import multer from 'multer';
import { storage } from './config/multer.js';

const app=express();

const upload=multer({storage,limits:{fileSize:2048000}});

//using inbuilt form
app.use(express.urlencoded({extended:true}))

//using multer for form (for forms with file upload)
// app.use(upload.array())

app.use(upload.single('image'))

app.post("/form",(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send("Form submitted")
})

app.listen(5000,()=>{
    console.log("Server is running at http://localhost:5000")
})