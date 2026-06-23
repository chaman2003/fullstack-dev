const fs =require ("fs")

const readablestream=fs.createReadStream("output.txt");
const writablestream=fs.createWriteStream("copyOutput.txt");

readablestream.pipe(writablestream);

writablestream.on("finish",()=>{
    console.log("Finished copying ")
})