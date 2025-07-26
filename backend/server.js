//const express = require("express")
import express from "express"
import dotenv from "dotenv"

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    res.send("Hello World!")
    console.log("Web Page Reloded!")
});

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})