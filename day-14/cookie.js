import express from "express";

import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "User",{maxAge:3000});
  console.log(req.cookies)
  console.log(req.cookies.name)
  res.send("Cookie recieved");
});



app.get("/clear", (req, res) => {
    res.clearCookie("name")
  res.send("Cookie Cleared",res.cookie);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Your server is running at http://localhost:${PORT}`);
});
