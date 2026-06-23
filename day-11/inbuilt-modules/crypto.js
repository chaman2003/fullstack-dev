const crypto=require("crypto")

const hash=crypto.createHash("sha256") //sha1,256,512
hash.update("hello")
console.log(hash.digest("base64")) //base64,hex,bin,base64url
// console.log(hash.digest("hex"))
// console.log(hash.digest("bin"))
// console.log(hash.digest("base64url"))
