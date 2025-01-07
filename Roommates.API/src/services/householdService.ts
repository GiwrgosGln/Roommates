import { PrismaClient } from "@prisma/client";
import { IHousehold } from "../types/household";

const prisma = new PrismaClient();

export class HouseholdService {
  async create(householdData: IHousehold) {
    return prisma.households.create({
      data: {
        name: householdData.name,
        address: householdData.address,
        city: householdData.city,
      },
    });
  }

  async findById(id: number) {
    return prisma.households.findUnique({
      where: { id },
      include: {
        household_members: {
          include: {
            users: true,
          },
        },
      },
    });
  }

  async update(id: number, householdData: Partial<IHousehold>) {
    return prisma.households.update({
      where: { id },
      data: {
        name: householdData.name,
        address: householdData.address,
        city: householdData.city,
      },
    });
  }

  async delete(id: number) {
    return prisma.households.delete({
      where: { id },
    });
  }
}
