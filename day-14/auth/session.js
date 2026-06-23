import express from "express";
import cookieParser from "cookie-parser";
import session, { Session } from "express-session";


const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: "Don't-tell-anybody-bro",
    resave: false,
    saveUninitialized:false,
}))

const users=[]

app.post("/register", (req, res) => {
  const {username,password}=req.body;
  users.push({
    username,
    password
  })
  res.send("User Registered Successfully")

  }
);

app.post("/login", (req, res) => {
    const {username,password}=req.body;
    const user=users.find(u=>u.username===username)
    if(!user || user.password!==password){
        res.send("Invalid username or password")
    }
        req.session.user=user;
        res.send("Login Successfully done")
    
});

app.get("/dashboard",(req,res)=>{
    if(!req.session.user){
        res.send("Not authorized bro")
    }else{
    res.send(`WElcome ${req.session.user.username} bro , Happy coding`)}
})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Your server is running at http://localhost:${PORT}`);
});
