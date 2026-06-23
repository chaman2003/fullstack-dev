const fs = require("fs");

//readFile
fs.readFile("sample.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});

//writeFile
const content = "bow bow, meow meow";
fs.writeFile("output.txt", content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Written successfully ");
});
