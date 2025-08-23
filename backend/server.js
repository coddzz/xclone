//const express = require("express")
import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import connectDB from "./db/connectDB.js"
import cookieParser from "cookie-parser"

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoute) //middleware


app.get("/", (req, res)=>{
    res.send("Hello World!!")
    console.log("Web Page Reloded!")
});

app.listen(PORT, () =>{
    console.log(`Server Is Running On PORT ${PORT}`)
    connectDB();
})