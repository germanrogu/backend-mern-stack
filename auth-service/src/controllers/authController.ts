import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";
import logger from "../utils/logger";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    logger.error("Error registering user", { error: error.message });
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, user } = await authService.loginUser(req.body);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error: any) {
    logger.error("Error during login", { error: error.message });
    next(error);
  }
};
