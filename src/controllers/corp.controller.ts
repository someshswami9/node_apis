import { Request, Response } from "express";
import { CorpService } from "../services/corp.services";

export class CorpController {
  // Single endpoint that returns all corp information in one call
  static async getCorpInfo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;

      if (!id) {
        res.status(400).json({ error: "Corp ID is required" });
        return;
      }

      const corp = await CorpService.getCorpById(id);

      if (!corp) {
        res.status(404).json({ error: "Corp not found" });
        return;
      }

      res.json({
        id: corp.id,
        name: corp.name,
        primary_color: corp.primary_color,
        secondary_color: corp.secondary_color,
        logo: corp.logo, // Base64 encoded logo string
        created_at: corp.created_at,
      });
    } catch (error) {
      console.error("Error fetching corp info:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
