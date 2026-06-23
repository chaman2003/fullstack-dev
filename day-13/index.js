import express from "express";

import { connectMDB } from "./dbConnect.js";
import person from "./models/model.js";

const app = express();

await connectMDB();

app.use(express.json());

// app.post("/person",(req,res)=>{
//     console.log(req.body);
//     res.send("Succesfully printed")
// })


app.post("/person", async (req, res) => {
  const { name, age, email } = req.body;
  const newPerson = await new person({ name, age, email });
  newPerson.save();
  res.send(newPerson);
  console.log(newPerson);
});

app.get("/person", async (req,res) => {
const persons =await person.find()
res.send(persons)
});

app.delete("/person/:id", async (req,res) => {
const id=req.params.id
await person.findByIdAndDelete(id)
res.send(await person.find())
});

// app.put("/person:id",async(req,res)=>{
//     const id=req.params.id;
//     const updatedPerson=req.body.name;
//     await person.findByIdAndUpdate(id,{name:updatedPerson})
//     res.send(await person.findById(id))
// })

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});
