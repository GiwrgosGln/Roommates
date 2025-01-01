import { Request, Response } from "express";
import { HouseholdMemberService } from "../services/householdMemberService";

const householdMemberService = new HouseholdMemberService();

export class HouseholdMemberController {
  static async addMember(req: Request, res: Response) {
    try {
      const member = await householdMemberService.addMember(req.body);
      return res.status(201).json(member);
    } catch (error) {
      return res.status(500).json({ message: "Error adding household member" });
    }
  }

  static async getMembers(req: Request, res: Response) {
    try {
      const members = await householdMemberService.getMembersOfHousehold(
        Number(req.params.householdId)
      );
      return res.status(200).json(members);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving household members" });
    }
  }

  static async updateRole(req: Request, res: Response) {
    try {
      const { role } = req.body;
      const member = await householdMemberService.updateMemberRole(
        Number(req.params.userId),
        Number(req.params.householdId),
        role
      );

      if (!member) {
        return res.status(404).json({
          message: "Household member not found",
        });
      }

      return res.status(200).json(member);
    } catch (error) {
      return res.status(500).json({
        message: "Error updating member role",
      });
    }
  }

  static async removeMember(req: Request, res: Response) {
    try {
      await householdMemberService.removeMember(
        Number(req.params.userId),
        Number(req.params.householdId)
      );
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error removing household member" });
    }
  }
}
