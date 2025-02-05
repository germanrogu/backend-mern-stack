import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan("dev"));

// Rate Limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Rutas
app.use("/api/auth", authRoutes);

// Middleware de errores centralizado
app.use(errorMiddleware);

export default app;
