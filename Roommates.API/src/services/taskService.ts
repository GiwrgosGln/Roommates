import { PrismaClient } from "@prisma/client";
import { ITask } from "../types/task";

const prisma = new PrismaClient();

export class TaskService {
  async createTask(taskData: ITask) {
    return prisma.tasks.create({
      data: {
        title: taskData.title,
        description: taskData.description,
        household_id: taskData.household_id,
        created_by_id: taskData.created_by_id,
      },
    });
  }

  async getFilteredHouseholdTasks(householdId: number) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return prisma.tasks.findMany({
      where: {
        household_id: householdId,
        OR: [
          { completed_at: null },
          {
            completed_at: {
              gte: sevenDaysAgo,
              not: null,
            },
          },
        ],
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async updateTask(
    taskId: number,
    taskData: {
      title?: string;
      description?: string;
      completed_at?: Date | null;
    }
  ) {
    return prisma.tasks.update({
      where: { id: taskId },
      data: taskData,
      include: {
        users: true,
        households: true,
      },
    });
  }

  async deleteTask(taskId: number) {
    return prisma.tasks.delete({
      where: { id: taskId },
    });
  }
}
