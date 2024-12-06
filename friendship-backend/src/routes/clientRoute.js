import express from "express";
import * as clientController from "../controllers/clientController.js";

const router = express.Router();

// GET: Retrieve all clients
router.get("/clients", clientController.getClients);

// GET: Retrieve a specific client by ID
router.get("/clients/:id", clientController.getClientById); 

// POST: Add a new client
router.post("/clients", clientController.createClient);

// PUT: Update client details
router.put("/clients/:id", clientController.updateClient);

// DELETE: Delete a client
router.delete("/clients/:id", clientController.deleteClient);

// POST: Log in a client
router.post("/clients/login", clientController.loginClient);

export default router;
