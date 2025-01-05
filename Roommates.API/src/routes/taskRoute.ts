import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { TaskService } from "../services/taskService";

const router = Router();

const taskService = new TaskService();

router.get(
  "/household/:householdId/tasks",
  authenticateToken as any,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const householdId = parseInt(req.params.householdId);
    const userEmail = req.user?.email;

    if (!userEmail) {
      res.status(400).json({ error: "User email not found" });
      return;
    }

    const tasks = await taskService.getHouseholdTasks(householdId, userEmail);
    res.json(tasks);
  }
);

export default router;
