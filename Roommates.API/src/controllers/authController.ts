import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";
import { PasswordUtils } from "../utils/passwordUtils";

const userService = new UserService();
const authService = new AuthService();

export class AuthController {
  private static generateTokens(userData: { email: string }) {
    if (!userData || !userData.email) {
      throw new Error("Invalid user data for token generation");
    }

    const accessToken = jwt.sign(
      { email: userData.email },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
      { email: userData.email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }

  static async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const existingName = await userService.findByName(name);
      if (existingName) {
        return res.status(400).json({ message: "Name is already taken" });
      }

      const hashedPassword = await PasswordUtils.hashPassword(password);
      const newUser = await userService.create({
        email,
        password: hashedPassword,
        name,
      });

      const tokens = AuthController.generateTokens({ email: newUser.email });
      return res.status(201).json({
        message: "User created successfully",
        tokens,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error creating user" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const validPassword = await PasswordUtils.verifyPassword(
        user.password,
        password
      );

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const tokens = AuthController.generateTokens({ email: user.email });

      // Set cookies with tokens
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,

        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 1000, // 1 minute
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,

        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      // Return tokens in response body along with success message
      return res.json({
        message: "Login successful",
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error during login" });
    }
  }
  static async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      ) as JwtPayload;
      const user = await userService.findByEmail(decoded.email);

      if (!user) {
        return res
          .status(403)
          .json({ message: "Invalid or expired refresh token" });
      }

      // Remove old refresh token
      await authService.invalidateRefreshToken(refreshToken);

      // Generate new tokens
      const tokens = AuthController.generateTokens({ email: user.email });

      // Store new refresh token
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      await authService.storeRefreshToken(
        user.id,
        tokens.refreshToken,
        expiresAt
      );

      // Set new cookies
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 1000,
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,

        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      });
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }
  }
  static async logout(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (refreshToken) {
        await authService.invalidateRefreshToken(refreshToken);
      }

      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");

      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error logging out" });
    }
  }
}
