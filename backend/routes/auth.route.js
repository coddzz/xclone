import express from "express"
import {signup,login,about} from "../controllers/auth.controller.js"

const route = express.Router();

route.get("/signup", signup)
route.get("/login", login)
route.get("/about", about)

export default route;