import express from "express";
import * as postController from "../controllers/postController.js";

const router = express.Router();

// Routes for managing posts
router.get("/posts", postController.getPosts); // GET: Retrieve all posts
router.post("/posts", postController.createPost); // POST: Create a new post
router.put("/posts/:id", postController.updatePost); // PUT: Update a post by ID
router.delete("/posts/:id", postController.deletePost); // DELETE: Delete a post by ID

export default router;
