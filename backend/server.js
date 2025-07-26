//const express = require("express")
import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import hello from "./routes/auth.hello.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT;


app.use("/api/auth", authRoute) //middleware
app.use("/api/auth", hello)

app.get("/", (req, res)=>{
    res.send("Hello World!!")
    console.log("Web Page Reloded!")
});

app.listen(PORT, () =>{
    console.log(`Server Is Running On PORT ${PORT}`)
})