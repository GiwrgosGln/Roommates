import { Request, Response } from "express";
import { UtilityService } from "../services/utilityService";
import { AuthRequest } from "../types/auth";
import { IUtility } from "../types/utility";

const utilityService = new UtilityService();

export class UtilityController {
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }

      const utilityData: IUtility = {
        title: req.body.title,
        amount: req.body.amount,
        due_date: new Date(req.body.due_date),
        household_id: req.body.household_id,
        created_by_id: req.user.id,
      };

      const utility = await utilityService.createUtility(utilityData);
      res.status(201).json(utility);
    } catch (error) {
      console.error("Utility creation error:", error);
      res.status(500).json({ message: "Error creating utility" });
    }
  }

  static async getUnpaidUtilities(req: Request, res: Response): Promise<void> {
    try {
      const utilities = await utilityService.getUnpaidUtilities(
        Number(req.params.householdId)
      );
      res.status(200).json(utilities);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving utilities" });
    }
  }

  static async markAsPaid(req: Request, res: Response): Promise<void> {
    try {
      const utility = await utilityService.markAsPaid(
        Number(req.params.utilityId)
      );
      if (!utility) {
        res.status(404).json({ message: "Utility not found" });
        return;
      }
      res.status(200).json(utility);
    } catch (error) {
      res.status(500).json({ message: "Error marking utility as paid" });
    }
  }
}
