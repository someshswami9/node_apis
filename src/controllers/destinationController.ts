// src/controllers/destinationController.ts
import { Request, Response } from 'express';
import {pool} from '../config/dababase';

export const fetchDestinations = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT *FROM destination_list ORDER BY CASE WHEN name = \'Portal 1 Institute of Technology [E]\' THEN 0 ELSE 1 END,name ASC;');
    // Respond with the data wrapped in an object with a "data" key
    res.json({ data: result.rows });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
