import { query } from "../db.js";

// GET: Retrieve all clients along with their posts (example)
export const getClientsWithPosts = async () => {
    const usersResult = await query("SELECT * FROM users_tb");
    const users = usersResult.rows;

    return {
        users
    };
};

// POST: Add a new client
export const createClient = async (clientData) => {
    const { nickname, email, phone, address } = clientData;

    const result = await query(
        "INSERT INTO users_tb (nickname, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *",
        [nickname, email, phone, address]
    );

    return result.rows[0];
};

// PUT: Update client details
export const updateClient = async (id, clientData) => {
    const { nickname, phone, address } = clientData;
  
    const result = await query(
      "UPDATE users_tb SET nickname = $1, phone = $2, address = $3 WHERE id = $4 RETURNING *",
      [nickname, phone, address, id]
    );
  
    return result.rows[0];
};

// DELETE: Delete a client
export const deleteClient = async (id) => {
    const result = await query(
        "DELETE FROM users_tb WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};

// POST: Log in a client
export const loginClient = async (email) => {
    const result = await query("SELECT * FROM users_tb WHERE email = $1", [email]);
    return result.rows[0]; 
};

// GET: Retrieve client details by ID
export const getClientById = async (id) => {
    const result = await query("SELECT * FROM users_tb WHERE id = $1", [id]);
    return result.rows[0]; 
};
