import { PrismaClient } from "@prisma/client";
import { IHouseholdMember } from "../types/householdMember";

const prisma = new PrismaClient();

export class HouseholdMemberService {
  async addMember(memberData: IHouseholdMember) {
    return prisma.household_members.create({
      data: {
        user_id: memberData.user_id,
        household_id: memberData.household_id,
        role: memberData.role,
      },
      include: {
        users: true,
        households: true,
      },
    });
  }

  async getMembersOfHousehold(householdId: number) {
    return prisma.household_members.findMany({
      where: {
        household_id: householdId,
      },
      include: {
        users: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async updateMemberRole(userId: number, householdId: number, role: string) {
    return prisma.household_members.update({
      where: {
        user_id_household_id: {
          user_id: userId,
          household_id: householdId,
        },
      },
      data: { role },
      include: {
        users: true,
        households: true,
      },
    });
  }

  async removeMember(userId: number, householdId: number) {
    return prisma.household_members.delete({
      where: {
        user_id_household_id: {
          user_id: userId,
          household_id: householdId,
        },
      },
    });
  }
}
