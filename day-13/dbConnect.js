import mongoose from "mongoose";

export const connectMDB=async()=>{
 const mongodb_uri="mongodb+srv://admin:123@learning.hifnbqi.mongodb.net/express?retryWrites=true&w=majority&appName=learning";

await mongoose.connect(mongodb_uri).then(()=>{
    console.log("Mongodb connected");
})              
}