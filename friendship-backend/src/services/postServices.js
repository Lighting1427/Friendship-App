import { query } from "../db.js"; // Import the query function to interact with the database

// GET: Fetch all posts
export const getPosts = async () => {
    const result = await query(`
        SELECT 
            posts_tb.id, -- Post ID
            posts_tb.user_id, -- User ID of the post creator
            users_tb.nickname AS user_name, -- Fetch user name from users_tb
            posts_tb.content, -- Content of the post
            posts_tb.background_color, -- Background color of the post
            posts_tb.sticker_url, -- Sticker URL associated with the post
            posts_tb.created_at -- Timestamp of when the post was created
        FROM posts_tb
        JOIN users_tb
        ON posts_tb.user_id = users_tb.id -- Match posts with users based on user ID
    `);
    return result.rows; // Return the list of posts
};

// POST: Add a new post
export const createPost = async (postData) => {
    const { user_id, content, background_color, sticker_url } = postData; // Extract post details from the input data

    const result = await query(
        `
        INSERT INTO posts_tb (user_id, content, background_color, sticker_url) -- Insert new post data into posts_tb
        VALUES ($1, $2, $3, $4) -- Use placeholders for dynamic values
        RETURNING *`, // Return the newly created row
        [user_id, content, background_color, sticker_url] // Provide dynamic values for the query
    );

    const post = result.rows[0]; // Retrieve the newly created post from the query result

    const userResult = await query(
        `SELECT nickname FROM users_tb WHERE id = $1`, // Query to fetch the nickname of the user who created the post
        [post.user_id] // Provide the user_id of the post's creator
    );

    const nickname = userResult.rows[0]?.nickname; // Extract the nickname from the query result

    return { ...post, user_name: nickname }; // Combine post data with the user's nickname and return
};

// PUT: Update an existing post
export const updatePost = async (id, postData) => {
    const { content, background_color, sticker_url } = postData; // Extract post details to be updated

    const result = await query(
        `
        UPDATE posts_tb 
        SET content = $1, background_color = $2, sticker_url = $3 -- Update the specified columns
        WHERE id = $4 -- Target the row to update based on the post ID
        RETURNING *`, // Return the updated row
        [content, background_color, sticker_url, id] // Provide dynamic values for the query
    );

    return result.rows[0]; // Return the updated post
};

// DELETE: Remove a post
export const deletePost = async (id) => {
    const result = await query(
        `
        DELETE FROM posts_tb 
        WHERE id = $1 -- Target the row to delete based on the post ID
        RETURNING *`, // Return the deleted row
        [id] // Provide the ID of the post to delete
    );

    return result.rows[0]; // Return the deleted post
};
