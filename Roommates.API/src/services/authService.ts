import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthService {
  async storeRefreshToken(userId: number, token: string, expiresAt: Date) {
    return prisma.refresh_tokens.create({
      data: {
        user_id: userId,
        token,
        expires_at: expiresAt,
      },
    });
  }

  async findRefreshToken(token: string) {
    return prisma.refresh_tokens.findFirst({
      where: {
        token,
        expires_at: {
          gt: new Date(),
        },
      },
    });
  }

  async invalidateRefreshToken(token: string) {
    return prisma.refresh_tokens.deleteMany({
      where: {
        token,
      },
    });
  }

  async invalidateAllUserRefreshTokens(userId: number) {
    return prisma.refresh_tokens.deleteMany({
      where: {
        user_id: userId,
      },
    });
  }

  async cleanExpiredTokens() {
    return prisma.refresh_tokens.deleteMany({
      where: {
        expires_at: {
          lt: new Date(),
        },
      },
    });
  }
}
