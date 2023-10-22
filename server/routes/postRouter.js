import express from "express";
import { createPost, getAllPost } from "../controllers/postController.js";
const router = express.Router();

router.route("/").get(getAllPost).post(createPost);
export { router as postRouter };
