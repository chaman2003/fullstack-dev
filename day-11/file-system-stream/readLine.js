const fs=require("fs")
const readline=require("readline")

const readablestream=fs.ReadStream("output.txt")
const rl= readline.createInterface({input:readablestream})
rl.on("line",(line)=>{
    console.log(line)
})

rl.on("end",()=>{
    console.log("Successfully done")
}
)