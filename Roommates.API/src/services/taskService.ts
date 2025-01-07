import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TaskService {
  async createTask(taskData: {
    title: string;
    description?: string;
    household_id: number;
    created_by_id: number;
  }) {
    return prisma.tasks.create({
      data: taskData,
      include: {
        users: true,

        households: true,
      },
    });
  }

  async getHouseholdTasks(householdId: number) {
    return prisma.tasks.findMany({
      where: {
        household_id: householdId,
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
