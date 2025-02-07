"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const zod_1 = require("zod");
const createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(["pending", "in-progress", "completed"]).optional(),
    assignedTo: zod_1.z.string().optional(),
    createdBy: zod_1.z.string().optional(),
});
const createTask = async (taskData) => {
    const validatedData = createTaskSchema.parse(taskData);
    const task = new Task_1.default(validatedData); // Type assertion here
    return task.save();
};
exports.createTask = createTask;
const getTasks = async (query = {}) => {
    return Task_1.default.find(query).populate("assignedTo createdBy");
};
exports.getTasks = getTasks;
const updateTask = async (id, updateData) => {
    const validatedUpdateData = createTaskSchema.partial().parse(updateData); // Validate update data partially
    return Task_1.default.findByIdAndUpdate(id, validatedUpdateData, {
        new: true,
    }); // Type assertion here
};
exports.updateTask = updateTask;
const deleteTask = async (id) => {
    return Task_1.default.findByIdAndDelete(id);
};
exports.deleteTask = deleteTask;
