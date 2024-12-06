import pg from "pg"; // Import the pg library to interact with PostgreSQL
import dotenv from "dotenv"; // Import dotenv to load environment variables from a .env file

dotenv.config(); // Load environment variables from the .env file into process.env

// Create a new PostgreSQL client using configuration from environment variables
const db = new pg.Client({
    user: process.env.PG_USER, // Database user
    host: process.env.PG_HOST, // Database host
    database: process.env.PG_DATABASE, // Database name
    password: process.env.PG_PASSWORD, // User password
    port: process.env.PG_PORT, // Database port
});

// Immediately invoked asynchronous function to connect to the database
(async () => {
    try {
        await db.connect(); // Attempt to connect to the database
        console.log("Connected to the database"); // Log success message if connection is successful
    } catch (err) {
        console.error("Failed to connect to the database", err); // Log error message if connection fails
        process.exit(1); // Exit the process with an error code
    }
})();

// Export a reusable query function for executing SQL queries
export const query = (text, params) => db.query(text, params);
