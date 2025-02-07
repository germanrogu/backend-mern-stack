import dotenv from "dotenv";
dotenv.config();

export const authServiceURL =
  process.env.AUTH_SERVICE_URL || "http://localhost:4001";
export const taskServiceURL =
  process.env.TASK_SERVICE_URL || "http://localhost:4002";
