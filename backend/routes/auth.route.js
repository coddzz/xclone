import express from "express"

const route = express.Router();

route.get("/signup", (req, res) =>{
    res.send("SignUp Page")
})
route.get("/login", (req, res) =>{
    res.send("Login Page")
})
route.get("/about", (req, res) =>{
    res.send("About Page")
})


export default route;