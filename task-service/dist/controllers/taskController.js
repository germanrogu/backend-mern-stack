"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getAll = exports.create = void 0;
const taskService = __importStar(require("../services/taskService"));
const logger_1 = __importDefault(require("../utils/logger"));
const create = async (req, res, next) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json({ message: "Task created successfully", task });
    }
    catch (error) {
        logger_1.default.error("Error creating task", { error: error.message });
        next(error);
    }
};
exports.create = create;
const getAll = async (req, res, next) => {
    try {
        const tasks = await taskService.getTasks();
        res.status(200).json({ tasks });
    }
    catch (error) {
        logger_1.default.error("Error fetching tasks", { error: error.message });
        next(error);
    }
};
exports.getAll = getAll;
const update = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated", task });
    }
    catch (error) {
        logger_1.default.error("Error updating task", { error: error.message });
        next(error);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const task = await taskService.deleteTask(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted" });
    }
    catch (error) {
        logger_1.default.error("Error deleting task", { error: error.message });
        next(error);
    }
};
exports.remove = remove;
