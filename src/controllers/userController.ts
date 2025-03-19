import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { pool } from '../config/dababase';
import { uuid } from 'uuidv4';
import bcypt from 'bcrypt';

// In a production system, these secrets and expiration times come from your .env file.
const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET ?? 'ACCESS_SECRET';
const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET ?? 'REFRESH_SECRET';
const accessTokenExpiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m';
const refreshTokenExpiresIn: string = process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate required headers
    const xApiToken = req.header('X-API-Token');
    const xAuthToken = req.header('X-Auth-Token');
    if (!xApiToken || !xAuthToken) {
      res.status(400).json({ message: 'Missing required headers.' });
      return;
    }

    // Validate form data fields
    const { userename, captcha, password, fcmToken } = req.body;
    if (!userename || !captcha || !password || !fcmToken) {
      res.status(400).json({ message: 'Missing required form fields.' });
      return;
    }

    // For this example, assume that the captcha must match the X-API-Token header value
    if (captcha !== xApiToken) {
      res.status(400).json({ message: 'Invalid captcha.' });
      return;
    }

    // Retrieve the user from the database by email (userename)
    const user = await User.findByEmail(userename);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // Prepare the JWT payload
    const payload = {
      sub: user.email,
      role: 'ROLE_USER', // Alternatively, use user.role if available
      uid: user.userid,
    };

 const accessToken = jwt.sign(
  payload,
  accessTokenSecret,
  { algorithm: 'HS256', expiresIn: accessTokenExpiresIn } as jwt.SignOptions
);
const refreshToken = jwt.sign(
  payload,
  refreshTokenSecret,
  { algorithm: 'HS256', expiresIn: refreshTokenExpiresIn } as jwt.SignOptions
);

    // Update the user's FCM token in the database
    await User.updateFCMToken(user.userid, fcmToken);

    // Construct and send the response in the specified format
    res.status(200).json({
      accessToken,
      refreshToken,
      username: user.email,
      userid: user.userid,
      ssoEnabled: user.sso_enabled,
      isApplyedTs: user.is_applied_ts,
      isProfileCreated: user.is_profile_created,
      profileinfo: user.profileinfo,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Not authorized' });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate required headers
    const xApiToken = req.header('X-API-Token');
    const xAuthToken = req.header('X-Auth-Token');
    if (!xApiToken || !xAuthToken) {
      res.status(400).json({ message: 'Missing required headers.' });
      return;
    }

    // Validate required form data fields
    const { username, captcha, password, fcmToken } = req.body;
    if (!username || !captcha || !password) {
      res.status(400).json({ message: 'Missing required form fields.' });
      return;
    }

    // Verify that the captcha matches the X-API-Token header value
    if (captcha !== xApiToken) {
      res.status(400).json({ message: 'Invalid captcha.' });
      return;
    }

    // Check if the user already exists
    const existingUser = await User.findByEmail(username);
    if (existingUser) {
      res.status(400).json({ message: 'User already exists.' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcypt.hash(password, 10);
    // Generate a new userid using UUID
    const userid = uuid();

    // Insert the new user record into the database
    const insertQuery = `
      INSERT INTO users (userid, email, password, ssoenabled, isappliedts, isprofilecreated, fcmtoken, profileinfo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    // Here we set default values for sso_enabled, is_applied_ts, is_profile_created to false,
    // and profileinfo as an empty JSON object.
    const result = await pool.query(insertQuery, [
      userid,
      username,
      hashedPassword,
      false,
      false,
      false,
      fcmToken,
      '{}' // or use JSON.stringify({}) if needed
    ]);

    const newUser = result.rows[0];

   
    // Send the signup response with tokens and user details
    res.status(200).json({
      username: newUser.email,
      userid: newUser.userid,
      ssoEnabled: newUser.sso_enabled,
      isApplyedTs: newUser.is_applied_ts,
      isProfileCreated: newUser.is_profile_created,
      profileinfo: newUser.profileinfo,
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
};