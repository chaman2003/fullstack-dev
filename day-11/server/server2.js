const http=require("http")

const server=http.createServer((req,res)=>{
    if(req.method==="GET" && req.url==="/"){
        res.writeHead(200,{"Content-Type":"text/plain"})
        res.end("Welcome to Home Page")
    }
    else{
        res.writeHead(404,{"Content-Type":"text/plain"})
        res.end("Not Found")
    }
})


const PORT=3000;

server.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})