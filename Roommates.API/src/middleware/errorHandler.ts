import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res.status(409).json({ message: "Unique constraint violation" });
      case "P2025":
        return res.status(404).json({ message: "Record not found" });
      default:
        return res.status(400).json({ message: error.message });
    }
  }

  return res.status(500).json({ message: "Internal server error" });
};
