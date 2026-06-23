import express from "express";

const app = express();

app.get("/error", (req, res) => {
  throw new Error("Cannot find the path");
});

app.use((err, req, res, next) => {
  console.log(`Error Handling - ${err.message}`);
  next();

  res.on("finish", () => {
    console.log("Finished error handling");
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Your server is running at http://localhost:${PORT}`);
});
