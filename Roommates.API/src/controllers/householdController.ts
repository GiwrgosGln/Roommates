import { Request, Response } from "express";
import { HouseholdService } from "../services/householdService";

const householdService = new HouseholdService();

export class HouseholdController {
  static async create(req: Request, res: Response) {
    try {
      const household = await householdService.create(req.body);
      return res.status(201).json(household);
    } catch (error) {
      return res.status(500).json({ message: "Error creating household" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const household = await householdService.findById(Number(req.params.id));
      if (!household) {
        return res.status(404).json({ message: "Household not found" });
      }
      return res.status(200).json(household);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving household" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const household = await householdService.update(
        Number(req.params.id),
        req.body
      );
      if (!household) {
        return res.status(404).json({ message: "Household not found" });
      }
      return res.status(200).json(household);
    } catch (error) {
      return res.status(500).json({ message: "Error updating household" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await householdService.delete(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting household" });
    }
  }
}
