import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const gatewayAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Implementa validaciones a nivel del Gateway si fueran necesarias.
  logger.info(`Gateway auth check for ${req.method} ${req.url}`);
  next();
};
