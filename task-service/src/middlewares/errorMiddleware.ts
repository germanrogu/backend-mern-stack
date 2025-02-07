import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Unhandled error: ", err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
};

export default errorMiddleware;
