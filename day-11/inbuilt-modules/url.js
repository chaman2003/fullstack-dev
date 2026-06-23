const url=require("url")

const myUrl= new URL ("https://www.localhost.com:8080/path/search?query=meow")
console.log(myUrl)
console.log("Host",myUrl.host)
console.log("Path",myUrl.pathname)
console.log("Port",myUrl.port)
console.log("Query",myUrl.searchParams.get("query"))
