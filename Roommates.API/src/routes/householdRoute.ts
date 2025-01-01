import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { HouseholdController } from "../controllers/householdController";
import { validateRequest } from "../middleware/validateRequest";
import { createHouseholdSchema } from "../validators/householdValidators";

const router = Router();

router.get(
  "/household",
  authenticateToken as any,
  (req: AuthRequest, res: Response) => {
    const userEmail = req.user?.email;
    res.json({
      message: "You have access to household resources",
      user: userEmail,
    });
  }
);

router.post(
  "/household/create",
  authenticateToken as any,
  validateRequest(createHouseholdSchema),
  async (req: AuthRequest, res: Response) => {
    await HouseholdController.create(req, res);
  }
);

router.get(
  "/household/:id",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    await HouseholdController.getById(req, res);
  }
);
router.put(
  "/household/:id",
  authenticateToken as any,
  validateRequest(createHouseholdSchema),
  async (req: AuthRequest, res: Response) => {
    await HouseholdController.update(req, res);
  }
);
router.delete(
  "/household/:id",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    await HouseholdController.delete(req, res);
  }
);

export default router;
