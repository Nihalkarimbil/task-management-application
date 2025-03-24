import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import ErrorHandler from "./middleware/ErrorHandler";

dotenv.config()
const app =express()
app.use(ErrorHandler)


mongoose.connect(process.env.MONGO_URI as string)
.then(()=>console.log("connected to database"))
.catch((error)=>console.log(error))

app.listen(5000,()=>{
    console.log("server running on port 5000")
})


