import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  async create(userData: { email: string; password: string; name: string }) {
    return prisma.users.create({
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email },
    });
  }

  async findByName(name: string) {
    return prisma.users.findUnique({
      where: { name },
    });
  }

  async getUserProfile(email: string) {
    return prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        profile_picture: true,
        created_at: true,
        updated_at: true,
        default_household_id: true,
        household_members: {
          select: {
            role: true,
            households: {
              select: {
                id: true,
                name: true,
                created_at: true,
              },
            },
          },
        },
      },
    });
  }

  async setDefaultHousehold(userId: number, householdId: number) {
    return prisma.users.update({
      where: { id: userId },
      data: { default_household_id: householdId },
    });
  }
}
