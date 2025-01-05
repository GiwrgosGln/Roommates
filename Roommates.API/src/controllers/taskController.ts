import { Response } from "express";
import { TaskService } from "../services/taskService";
import { AuthRequest } from "../types/auth";
import { UserService } from "../services/userService";

const userService = new UserService();
const taskService = new TaskService();

export class TaskController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const user = await userService.findByEmail(req.user!.email);
      const task = await taskService.createTask(req.body, user.id);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ message: "Error creating task" });
    }
  }
  static async getHouseholdTasks(req: AuthRequest, res: Response) {
    try {
      const tasks = await taskService.getHouseholdTasks(
        Number(req.params.householdId),
        req.user!.email
      );
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving tasks" });
    }
  }

  static async setCompleted(req: AuthRequest, res: Response) {
    try {
      const task = await taskService.setTaskCompleted(
        Number(req.params.taskId),
        Number(req.params.householdId)
      );
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: "Error completing task" });
    }
  }
}
