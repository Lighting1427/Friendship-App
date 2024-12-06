-- Create a table to store user information
CREATE TABLE IF NOT EXISTS users_tb (
    id SERIAL PRIMARY KEY, -- Unique identifier for each user (auto-incrementing primary key)
    nickname VARCHAR(50) NOT NULL, -- User's nickname, maximum length of 50 characters, cannot be null
    email VARCHAR(100) NOT NULL, -- User's email, maximum length of 100 characters, cannot be null
    phone VARCHAR(15), -- User's phone number, maximum length of 15 characters, can be null
    address TEXT, -- User's address, stored as text, can be null
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the user record was created, defaults to the current time
    password TEXT NOT NULL DEFAULT 'default_password' -- User's password, stored as text, defaults to 'default_password' [Not Use]
);

-- Create a table to store posts
CREATE TABLE IF NOT EXISTS posts_tb (
    id SERIAL PRIMARY KEY, -- Unique identifier for each post (auto-incrementing primary key)
    user_id INTEGER REFERENCES users_tb(id) ON DELETE CASCADE, -- Foreign key referencing the id in users_tb
                                                               -- Deletes related posts if the associated user is deleted
    content TEXT NOT NULL, -- Content of the post, stored as text, cannot be null
    background_color VARCHAR(7), -- Background color of the post (e.g., #FFFFFF), can be null
    sticker_url TEXT, -- URL for the sticker associated with the post, can be null
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- Timestamp when the post was created, defaults to the current time
);
