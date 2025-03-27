import { Request, Response } from 'express';
import { pool } from '../config/dababase';

export const getSubdomains = async (req: Request, res: Response) => {
  try {
    let { page = 1, limit = 10, search = "", sortColumn = "subdomain", sortOrder = "asc" } = req.body;

    // Ensure valid column name and sorting order
    const validSortColumns = ["subdomain", "org_name"];
    if (!validSortColumns.includes(sortColumn)) sortColumn = "subdomain";
    if (!["asc", "desc"].includes(sortOrder.toLowerCase())) sortOrder = "asc";

    const offset = (page - 1) * limit;

    // SQL Query with Search, Sorting, and Pagination
    const query = `
      SELECT subdomain_id, subdomain, org_name 
      FROM subdomain_v5 
      WHERE org_name ILIKE $1 OR subdomain ILIKE $1
      ORDER BY ${sortColumn} ${sortOrder.toUpperCase()} 
      LIMIT $2 OFFSET $3
    `;

    const result = await pool.query(query, [`%${search}%`, limit, offset]);

    // Get Total Count for Pagination
    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM subdomain_v5 
      WHERE org_name ILIKE $1 OR subdomain ILIKE $1
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
    console.error('Error fetching subdomains:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
