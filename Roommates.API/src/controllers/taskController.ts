import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { AuthRequest } from "../types/auth";
const taskService = new TaskService();

export class TaskController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const taskData = {
        ...req.body,
        created_by_id: req.user?.id,
        household_id: req.body.household_id,
      };

      const task = await taskService.createTask(taskData);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(500).json({ message: "Error creating task" });
    }
  }

  static async setCompleted(req: Request, res: Response) {
    try {
      const task = await taskService.updateTask(Number(req.params.id), {
        completed_at: new Date(),
      });
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: "Error completing task" });
    }
  }

  static async getHouseholdTasks(req: Request, res: Response) {
    try {
      const tasks = await taskService.getHouseholdTasks(
        Number(req.params.householdId)
      );
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving tasks" });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const task = await taskService.updateTask(
        Number(req.params.id),
        req.body
      );
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: "Error updating task" });
    }
  }
}
