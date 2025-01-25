import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { UtilityController } from "../controllers/utilityController";
import { validateRequest } from "../middleware/validateRequest";
import { createUtilitySchema } from "../validators/utilityValidators";

const router = Router();

router.post(
  "/utilities",
  authenticateToken as any,
  validateRequest(createUtilitySchema),
  async (req: AuthRequest, res: Response) => {
    await UtilityController.create(req, res);
  }
);

router.get(
  "/household/:householdId/utilities/unpaid",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    await UtilityController.getUnpaidUtilities(req, res);
  }
);

router.get(
  "/household/:householdId/utilities/all",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    await UtilityController.getAllUtilities(req, res);
  }
);

router.patch(
  "/household/:householdId/utilities/:utilityId/paid",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    await UtilityController.markAsPaid(req, res);
  }
);

export default router;
