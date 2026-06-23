const fs=require('fs')

const readablestream = fs.createReadStream('output.txt',{encoding:"utf-8"})
readablestream.on("data",(chunk)=>{
    console.log(chunk)
})

readablestream.on("end",()=>{
    console.log("End of the file")
})

readablestream.on ("error",(err)=>{
    console.log(err)
})

const writablestream=fs.createWriteStream("writeOutput.txt")
writablestream.write("Hello")
writablestream.write("World!")
writablestream.end()
writablestream.on("finish",()=>{
    console.log("Write completed")
})
