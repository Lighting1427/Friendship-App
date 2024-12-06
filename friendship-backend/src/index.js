import express from "express"; // Import Express framework
import cors from "cors"; // Import CORS middleware to handle cross-origin requests
import clientRoutes from "./routes/clientRoute.js"; // Import client-related API routes
import postRoutes from "./routes/postRoute.js"; // Import post-related API routes

const app = express(); // Initialize an Express application
const port = 3000; // Define the port number where the server will run

app.use(cors()); // Enable CORS for all incoming requests
app.use(express.json()); // Enable parsing of JSON request bodies

// Use API routes
app.use("/api", clientRoutes); // Mount client routes under the "/api" path
app.use("/api", postRoutes); // Mount post routes under the "/api" path

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log a message when the server starts successfully
});
