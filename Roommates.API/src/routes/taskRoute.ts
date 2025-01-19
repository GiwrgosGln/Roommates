import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { AuthRequest } from "../types/auth";
import { Response } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { createTaskSchema } from "../validators/taskValidators";
import { TaskController } from "../controllers/taskController";

const router = Router();

router.post(
  "/tasks",
  authenticateToken as any,
  validateRequest(createTaskSchema),
  async (req: AuthRequest, res: Response) => {
    await TaskController.create(req, res);
  }
);

router.get(
  "/household/:householdId/tasks",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    await TaskController.getHouseholdTasks(req, res);
  }
);

router.patch(
  "/household/:householdId/tasks/:taskId/complete",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    await TaskController.setCompleted(req, res);
  }
);

router.delete(
  "/household/:householdId/tasks/:taskId",
  authenticateToken as any,
  async (req: AuthRequest, res: Response) => {
    await TaskController.deleteTask(req, res);
  }
);

export default router;
