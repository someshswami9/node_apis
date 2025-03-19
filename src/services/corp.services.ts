import {pool} from "../config/dababase";
import { Corp } from "../models/corp.model";

export class CorpService {
  static async getCorpById(id: string): Promise<Corp | null> {
    const query = `
      SELECT 
        id, 
        name, 
        primary_color, 
        secondary_color, 
        encode(logo, 'base64') AS logo, 
        created_at
      FROM corp
      WHERE id = $1
    `;
    try {
      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) return null;

      const corp: Corp = {
        id: rows[0].id,
        name: rows[0].name,
        primary_color: rows[0].primary_color,
        secondary_color: rows[0].secondary_color,
        logo: rows[0].logo, // This is already a Base64 string
        created_at: rows[0].created_at,
      };

      return corp;
    } catch (error) {
      console.error("Error fetching corp:", error);
      throw error;
    }
  }
}
