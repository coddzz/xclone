import express from "express"

const route= express.Router();

route.get("/hello",(req, res)=>{
    res.send("hello..!")
})

export default route;