import * as clientService from "../services/clientServices.js";
import { query } from "../db.js"; 

// GET: Retrieve all clients
export const getClients = async (req, res) => {
    try {
        // Fetch clients and their posts from the service
        const clients = await clientService.getClientsWithPosts();
        res.status(200).json(clients); // Respond with the retrieved clients
    } catch (err) {
        console.error("Error fetching clients:", err); // Log any error encountered
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
};

// POST: Add a new client
export const createClient = async (req, res) => {
    try {
        // Create a new client using data from the request body
        const newClient = await clientService.createClient(req.body);
        res.status(201).json(newClient); // Respond with the created client
    } catch (err) {
        console.error("Error creating client:", err); // Log any error encountered
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
};

// PUT: Update an existing client
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params; // Extract the client ID from the URL parameters
        const { nickname, phone, address } = req.body; // Extract fields to update from the request body

        // Log the details for debugging
        console.log("Updating user with ID:", id);
        console.log("Received data:", req.body);

        // Execute SQL query to update client details
        const result = await query(
            "UPDATE users_tb SET nickname = $1, phone = $2, address = $3 WHERE id = $4 RETURNING *",
            [nickname, phone, address, id]
        );

        // Check if the client was found
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Client not found" }); // Client not found
        }

        res.status(200).json(result.rows[0]); // Respond with the updated client data
    } catch (err) {
        console.error("Error updating client:", err); // Log any error encountered
        res.status(500).json({ message: "Internal Server Error", error: err.message }); // Send a server error response
    }
};

// DELETE: Remove a client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params; // Extract the client ID from the URL parameters
        const deletedClient = await clientService.deleteClient(id); // Call the delete function in the service
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" }); // Client not found
        }
        res.status(200).json(deletedClient); // Respond with the deleted client data
    } catch (err) {
        console.error("Error deleting client:", err); // Log any error encountered
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
};

// POST: Client login
export const loginClient = async (req, res) => {
    try {
        const { email } = req.body; // Extract email from the request body
        const user = await clientService.loginClient(email); // Authenticate the user
        if (user) {
            res.status(200).json({ success: true, user }); // Respond with user details if found
        } else {
            res.status(404).json({ success: false, message: "User not found" }); // User not found
        }
    } catch (err) {
        console.error("Error logging in:", err); // Log any error encountered
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
};

// GET: Retrieve a client by ID
export const getClientById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the client ID from the URL parameters
        const client = await clientService.getClientById(id); // Fetch the client details by ID

        if (!client) {
            return res.status(404).json({ message: "Client not found" }); // Client not found
        }

        res.status(200).json(client); // Respond with the client details
    } catch (err) {
        console.error("Error fetching client:", err); // Log any error encountered
        res.status(500).json({ message: "Internal Server Error" }); // Send a server error response
    }
};
