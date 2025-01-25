import { PrismaClient } from "@prisma/client";
import { IUtility } from "../types/utility";

const prisma = new PrismaClient();

export class UtilityService {
  async createUtility(utilityData: IUtility) {
    return prisma.utilities.create({
      data: {
        title: utilityData.title,
        amount: utilityData.amount,
        due_date: utilityData.due_date,
        household_id: utilityData.household_id,
        created_by_id: utilityData.created_by_id,
      },
      include: {
        created_by: true,
        households: true,
      },
    });
  }

  async getUnpaidUtilities(householdId: number) {
    return prisma.utilities.findMany({
      where: {
        household_id: householdId,
        paid_at: null,
      },
      include: {
        created_by: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        due_date: "asc",
      },
    });
  }

  async getAllUtilities(householdId: number) {
    return prisma.utilities.findMany({
      where: {
        household_id: householdId,
      },
      include: {
        created_by: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async markAsPaid(utilityId: number) {
    return prisma.utilities.update({
      where: {
        id: utilityId,
      },
      data: {
        paid_at: new Date(),
      },
      include: {
        created_by: true,
        households: true,
      },
    });
  }

  async deleteUtility(utilityId: number) {
    return prisma.utilities.delete({
      where: { id: utilityId },
    });
  }
}
