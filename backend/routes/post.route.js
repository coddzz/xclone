import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createPost, deletePost, getAllPosts, likeUnlikePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/likes/:id", protectRoute, likeUnlikePost);
router.get("/all", protectRoute, getAllPosts);

export default router;
