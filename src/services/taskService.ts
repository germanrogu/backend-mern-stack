import Task from "../models/Task";

export const createTask = async (data: {
  title: string;
  description: string;
  assignedTo: string;
  createdBy: string;
}) => {
  const task = new Task(data);
  return await task.save();
};

export const getUserTasks = async (userId: string) => {
  return await Task.find({ assignedTo: userId }).populate(
    "assignedTo",
    "username email"
  );
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  return await Task.findByIdAndUpdate(taskId, { status }, { new: true });
};

export const deleteTask = async (taskId: string) => {
  return await Task.findByIdAndDelete(taskId);
};
