import { Request, Response, NextFunction } from "express";

// Middleware centralizado de manejo de errores
const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[ERROR] ${err.message}`);

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
};

export default errorMiddleware;
