import { pool } from '../config/dababase';
import bcrypt from 'bcrypt';

export interface IUser {
  id: number;
  userid: string;             // e.g., "USMYBE171224DBWFKLM2GFKERKJH"
  email: string;
  password: string;           // hashed password
  sso_enabled: boolean;
  is_applied_ts: boolean;
  is_profile_created: boolean;
  fcmtoken: string | null;
  profileinfo: any;           // additional profile info stored as JSON
  created_at: Date;
  updated_at: Date;
}

export class User {
  // Find a user by email
  static async findByEmail(email: string): Promise<IUser | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    if (result.rows.length > 0) {
      return result.rows[0] as IUser;
    }
    return null;
  }

  // Compare a plain text password with the hashed password
  static async comparePassword(plainText: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashed);
  }

  // Update the FCM token for a user
  static async updateFCMToken(userid: string, fcmtoken: string): Promise<void> {
    const query = 'UPDATE users SET fcmtoken = $1, updated_at = CURRENT_TIMESTAMP WHERE userid = $2';
    await pool.query(query, [fcmtoken, userid]);
  }
}
