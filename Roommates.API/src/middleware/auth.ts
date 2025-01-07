import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Check Authorization header
  const authHeader = req.headers["authorization"];
  const headerToken = authHeader && authHeader.split(" ")[1];

  // Check cookies
  const cookieToken = req.cookies.accessToken;

  // Use either token
  const token = headerToken || cookieToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};
