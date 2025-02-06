import express from "express";
import authenticate from "../middleware/authMiddleware";
import {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/taskController";

const router = express.Router();

router.post("/", authenticate, createTaskController);
router.get("/", authenticate, getTasksController);
router.patch("/:taskId", authenticate, updateTaskController);
router.delete("/:taskId", authenticate, deleteTaskController);

export default router;
