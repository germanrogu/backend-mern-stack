import express from "express";
import {
  registerUserHandler,
  loginUserHandler,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);

export default router;
