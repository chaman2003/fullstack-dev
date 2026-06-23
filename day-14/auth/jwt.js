import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());

const users = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 10); //1
  users.push({
    username,
    password: hashedpassword, //2
  });
  res.json({ "User Registered Successfully": hashedpassword });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  const userCompare = await bcrypt.compare(password, user.password); //3
  if (!user || user.password !== !userCompare) {//4
    res.send("Invalid username or password");
  }
  const token = jwt.sign(username, "meow"); //5
  res.send(token); //6
});

app.get("/dashboard", (req, res) => {
  try {
    const token = req.header("Auth"); //7
    const decoded = jwt.verify(token, "meow"); //8
    res.send(`WElcome ${decoded.username} bro , Happy coding`); //9
  } catch (e) {
    res.send("Error detected");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Your server is running at http://localhost:${PORT}`);
});
