import express from "express";
import cors from "cors";
import morgan from "morgan";
import { gatewayAuthMiddleware } from "./middlewares/authMiddleware";
import proxyRoutes from "./routes/proxyRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.use(gatewayAuthMiddleware);

app.use(proxyRoutes);

app.use(errorMiddleware);

export default app;
