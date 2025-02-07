import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticate, taskController.create);
router.get("/", authenticate, taskController.getAll);
router.put("/:id", authenticate, taskController.update);
router.delete("/:id", authenticate, taskController.remove);

export default router;
