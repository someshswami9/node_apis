import { Request, Response } from 'express';
import { pool } from '../config/dababase';

export const getSubdomainUsers = async (req: Request, res: Response) => {

  try {
    // Extracting parameters with default values if not provided
    const { 
      page = 1, 
      limit = 10, 
      search = "", 
      sortColumn = "user_id", 
      sortOrder = "asc" 
    } = req.body || {}; // Handles empty body

    // Ensure sortColumn and sortOrder are valid
    const validSortColumns = ["user_id", "email", "org_name", "user_type"];
    const sanitizedSortColumn = validSortColumns.includes(sortColumn) ? sortColumn : "user_id";
    const sanitizedSortOrder = ["asc", "desc"].includes(sortOrder.toLowerCase()) ? sortOrder.toLowerCase() : "asc";

    // Calculate pagination offset
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // SQL Query for fetching users with optional search
    const query = `
      SELECT user_id, email, user_type, org_name, date_created
      FROM users
      WHERE $1 = '' OR email ILIKE $1 OR org_name ILIKE $1
      ORDER BY ${sanitizedSortColumn} ${sanitizedSortOrder.toUpperCase()}
      LIMIT $2 OFFSET $3
    `;

    // Execute the main query
    const result = await pool.query(query, [`%${search}%`, limit, offset]);

    // Query to get the total count for pagination
    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM users
      WHERE $1 = '' OR email ILIKE $1 OR org_name ILIKE $1
    `;
    const countResult = await pool.query(countQuery, [`%${search}%`]);

    // Prepare response
    const totalItems = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalItems / parseInt(limit));

    res.json({
      totalItems,  
      totalPages,  
      currentPage: parseInt(page),  
      limit: parseInt(limit),  
      data: result.rows,  
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};