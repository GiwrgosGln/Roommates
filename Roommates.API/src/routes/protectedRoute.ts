import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { UserService } from "../services/userService";

const router = Router();

const userService = new UserService();

router.get(
  "/protected",
  authenticateToken as any,
  (req: AuthRequest, res: Response) => {
    const userEmail = req.user?.email;

    res.json({
      message: "You have access to this protected resource",
      user: userEmail,
    });
  }
);

router.get(
  "/user/profile",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    const userEmail = req.user?.email;
    if (userEmail) {
      const userDetails = await userService.getUserProfile(userEmail);
      res.json(userDetails);
    } else {
      res.status(400).json({ error: "User email not found" });
    }
  }
);

export default router;
