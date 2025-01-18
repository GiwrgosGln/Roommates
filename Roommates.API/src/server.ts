import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/userRoute";
import householdRoutes from "./routes/householdRoute";
import householdMemberRoutes from "./routes/householdMemberRoute";
import taskRoutes from "./routes/taskRoute";
import cookieParser from "cookie-parser";
import pool from "./config/database";

dotenv.config();

const app = express();
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", householdRoutes);
app.use("/api", householdMemberRoutes);
app.use("/api", taskRoutes);
import { prisma } from "./lib/prisma";

app.get("/health", async (req, res) => {
  try {
    await prisma.$connect();
    res.json({
      status: "OK",
      database: "Connected",
    });
  } catch (error) {
    res.json({
      status: "OK",
      database: "Disconnected",
    });
  }
});
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

export { app };
