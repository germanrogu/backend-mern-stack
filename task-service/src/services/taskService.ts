import Task, { ITask } from "../models/Task";
import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
  assignedTo: z.string().optional(),
  createdBy: z.string().optional(),
});

export const createTask = async (taskData: unknown): Promise<ITask> => {
  const validatedData = createTaskSchema.parse(taskData);
  const task = new Task(validatedData as ITask); // Type assertion here
  return task.save();
};

export const getTasks = async (query = {}) => {
  return Task.find(query).populate("assignedTo createdBy");
};

export const updateTask = async (
  id: string,
  updateData: unknown
): Promise<ITask | null> => {
  const validatedUpdateData = createTaskSchema.partial().parse(updateData); // Validate update data partially
  return Task.findByIdAndUpdate(id, validatedUpdateData, {
    new: true,
  }) as Promise<ITask | null>; // Type assertion here
};

export const deleteTask = async (id: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(id);
};
