import { Response, NextFunction } from "express";
import * as taskService from "../services/taskService";
import logger from "../utils/logger";
import { CustomRequest } from "../middlewares/authMiddleware";

export const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error: any) {
    logger.error("Error creating task", { error: error.message });
    next(error);
  }
};

export const getAll = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json({ tasks });
  } catch (error: any) {
    logger.error("Error fetching tasks", { error: error.message });
    next(error);
  }
};

export const update = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated", task });
  } catch (error: any) {
    logger.error("Error updating task", { error: error.message });
    next(error);
  }
};

export const remove = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error: any) {
    logger.error("Error deleting task", { error: error.message });
    next(error);
  }
};
