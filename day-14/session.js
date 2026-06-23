import express from "express";
import cookieParser from "cookie-parser";
import session, { Session } from "express-session";

const app = express();
app.use(cookieParser());
app.use(session({
    secret: "Don't-tell-anybody-bro",
    resave: false,
    saveUninitialized:false,
  
}))

app.get("/", (req, res) => {
  if(req.session.page_visit){
  req.session.page_visit++;
  res.send("You visited the page "+req.session.page_visit+" times");
  }else{
    req.session.page_visit=1;
    res.send("Hi bro")
  }
});

app.get("/destroy", (req, res) => {
    req.session.destroy();
  res.send("Session Destroyed");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Your server is running at http://localhost:${PORT}`);
});
