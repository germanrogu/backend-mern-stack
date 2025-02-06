import { Request, Response } from "express";
import {
  createTask,
  getUserTasks,
  updateTaskStatus,
  deleteTask,
} from "../services/taskService";
import { AuthRequest } from "../middleware/authMiddleware";

export const createTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const task = await createTask({
      ...req.body,
      assignedTo: req.user?.userId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasksController = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await getUserTasks(req.user?.userId as string);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const task = await updateTaskStatus(req.params.taskId, req.body.status);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    await deleteTask(req.params.taskId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
