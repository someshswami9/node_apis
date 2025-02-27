// models/userModel.ts

import { pool } from "../config/dababase";

export interface User {
  userid: string;       // Custom user ID (e.g., "USER3625201")
  username: string;     // Stores the user's email
  password: string;     
  created_at?: Date;    // Automatically set by the database if not provided
}

export const createUser = async (user: User): Promise<User> => {
  const { userid, username, password } = user;
  const result = await pool.query(
    `INSERT INTO users (userid, username, password)
     VALUES ($1, $2, $3) RETURNING *`,
    [userid, username, password]
  );
  return result.rows[0];
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};

export const findUserByUserid = async (userid: string): Promise<User | null> => {
  const result = await pool.query(
    `SELECT * FROM users WHERE userid = $1`,
    [userid]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};
