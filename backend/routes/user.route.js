import express from "express";
import protectRoute from "../middleware/protectRoute";
import { getUserProfile } from "../controllers/user.controller";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);


export default router;