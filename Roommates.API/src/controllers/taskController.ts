import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { AuthRequest } from "../types/auth";
import { ITask } from "../types/task";
const taskService = new TaskService();

export class TaskController {
  static async create(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const taskData: ITask = {
        title: req.body.title,
        description: req.body.description,
        household_id: req.body.household_id,
        created_by_id: req.user.id,
      };

      const task = await taskService.createTask(taskData);
      return res.status(201).json(task);
    } catch (error) {
      console.error("Task creation error:", error);
      return res.status(500).json({ message: "Error creating task" });
    }
  }

  static async setCompleted(req: Request, res: Response) {
    try {
      const task = await taskService.updateTask(Number(req.params.taskId), {
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
      const tasks = await taskService.getFilteredHouseholdTasks(
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

  static async deleteTask(req: Request, res: Response) {
    try {
      await taskService.deleteTask(Number(req.params.taskId));
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting task" });
    }
  }
}
