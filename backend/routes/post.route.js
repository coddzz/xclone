import express from 'express';
import { createPost, deletePost} from '../controllers/post.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/create', protectRoute, createPost);
router.post('/delete', protectRoute, deletePost);




export default router;