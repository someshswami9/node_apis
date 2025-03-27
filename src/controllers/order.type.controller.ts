import { Request, Response } from 'express';
import { pool } from '../config/dababase';

export const getOrderTypes = async (req: Request, res: Response) => {
  try {
    let { page = 1, limit = 10, search = "", sortColumn = "order_type", sortOrder = "asc" } = req.body;

    // Ensure valid column name and sorting order
    const validSortColumns = ["order_type", "email"];
    if (!validSortColumns.includes(sortColumn)) sortColumn = "order_type";
    if (!["asc", "desc"].includes(sortOrder.toLowerCase())) sortOrder = "asc";

    const offset = (page - 1) * limit;

    // SQL Query with Search, Sorting, and Pagination
    const query = `
      SELECT order_type_id, email, order_type 
      FROM order_type
      WHERE order_type ILIKE $1 OR email ILIKE $1
      ORDER BY ${sortColumn} ${sortOrder.toUpperCase()} 
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [`%${search}%`, limit, offset]);

    // Get Total Count for Pagination
    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM order_type 
       WHERE order_type ILIKE $1 OR email ILIKE $1
    `;
    const countResult = await pool.query(countQuery, [`%${search}%`]);

    const totalItems = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalItems / limit); // Calculate total pages

    res.json({
      totalItems,   // Total number of items
      totalPages,   // Total number of pages
      currentPage: page,  // Current page number
      limit,        // Items per page
      data: result.rows,  // Data list
    });
  } catch (error) {
    console.error('Error fetching order types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
