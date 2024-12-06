import * as postService from "../services/postServices.js";

// GET: Retrieve all posts
export const getPosts = async (req, res) => {
    try {
        // Fetch all posts from the service
        const posts = await postService.getPosts();
        res.status(200).json(posts); // Respond with the list of posts
    } catch (err) {
        console.error("Error fetching posts:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Respond with server error
    }
};

// POST: Add a new post
export const createPost = async (req, res) => {
    try {
        // Create a new post using data from the request body
        const newPost = await postService.createPost(req.body);
        res.status(201).json(newPost); // Respond with the created post
    } catch (err) {
        console.error("Error creating post:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Respond with server error
    }
};

// PUT: Update an existing post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params; // Extract post ID from the URL parameters
        const updatedPost = await postService.updatePost(id, req.body); // Update the post using the service
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" }); // Respond if no post is found
        }
        res.status(200).json(updatedPost); // Respond with the updated post
    } catch (err) {
        console.error("Error updating post:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Respond with server error
    }
};

// DELETE: Remove a post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params; // Extract post ID from the URL parameters
        const deletedPost = await postService.deletePost(id); // Delete the post using the service
        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" }); // Respond if no post is found
        }
        res.status(200).json(deletedPost); // Respond with the deleted post
    } catch (err) {
        console.error("Error deleting post:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error" }); // Respond with server error
    }
};

// PUT: Update client details
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params; // Extract client ID from the URL parameters
        const { nickname, phone, address } = req.body; // Extract fields to update from the request body

        // Validate required fields
        if (!nickname || !phone || !address) {
            return res.status(400).json({ message: "Missing required fields" }); // Respond with bad request
        }

        // Execute SQL query to update client details
        const result = await query(
            "UPDATE users_tb SET nickname = $1, phone = $2, address = $3 WHERE id = $4 RETURNING *",
            [nickname, phone, address, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Client not found" }); // Respond if no client is found
        }

        res.status(200).json(result.rows[0]); // Respond with the updated client details
    } catch (err) {
        console.error("Error updating client:", err); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: err.message }); // Respond with server error
    }
};
