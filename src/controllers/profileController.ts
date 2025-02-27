import { Request, Response } from 'express';
import {pool} from '../config/dababase';
import moment from 'moment';

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userid, fullname, dob, mobileno, collegename, city } = req.body;

    if ( !fullname || !dob) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: fullname and dob are mandatory.',
      });
      return;
    }

    // Convert "27-02-2025" (DD-MM-YYYY) to "2025-02-27" (YYYY-MM-DD)
    const formattedDob = moment(dob, 'DD-MMM-YYYY').format('YYYY-MM-DD');

    // Check if profile exists
    const checkQuery = `SELECT * FROM profile WHERE userid = $1`;
    const checkResult = await pool.query(checkQuery, [userid]);
    if (checkResult.rows.length > 0) {
      res.status(200).json({
        success: false,
        message: 'Profile already created',
        isProfileCreated: true,
      });
      return;
    }

    // Insert new profile
    const query = `
      INSERT INTO profile (userid, fullname, dob, mobileno, collegename, city)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      userid,
      fullname,
      formattedDob,
      mobileno || null,
      collegename || null,
      city || null,
    ];
    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userid, fullname, dob, mobileno, collegename, city } = req.body;

    if (!userid) {
      res.status(400).json({
        success: false,
        message: 'Missing required field: userid is mandatory.',
      });
      return;
    }

    // Ensure at least one update field is provided
    if (!fullname && !dob && !mobileno && !collegename && !city) {
      res.status(400).json({
        success: false,
        message: 'At least one field (fullname, dob, mobileno, collegename, city) must be provided to update.',
      });
      return;
    }

    // Check if profile exists
    const checkQuery = `SELECT * FROM profile WHERE userid = $1`;
    const checkResult = await pool.query(checkQuery, [userid]);
    if (checkResult.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
      return;
    }

    // If dob is provided, convert it from "DD-MMM-YYYY" to "YYYY-MM-DD"
    let formattedDob = null;
    if (dob) {
      formattedDob = moment(dob, 'DD-MMM-YYYY').format('YYYY-MM-DD');
    }

    // Update the profile. Only fields provided in the request will replace existing ones.
    const updateQuery = `
      UPDATE profile 
      SET fullname = COALESCE($1, fullname),
          dob = COALESCE($2, dob),
          mobileno = COALESCE($3, mobileno),
          collegename = COALESCE($4, collegename),
          city = COALESCE($5, city)
      WHERE userid = $6
      RETURNING *
    `;
    const values = [
      fullname || null,
      formattedDob ?? null,
      mobileno || null,
      collegename || null,
      city || null,
      userid,
    ];

    const result = await pool.query(updateQuery, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

