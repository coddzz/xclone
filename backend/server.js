//const express = require("express")
import express from "express"
import dotenv from "dotenv"
import cloudinary from "cloudinary"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT;


cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY
});


app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);



app.get("/", (req, res)=>{
    res.send("Hello World!!")
    console.log("Web Page Reloded!")
});


app.listen(PORT, () =>{
    console.log(`Server Is Running On PORT ${PORT}`)
    connectDB();
})