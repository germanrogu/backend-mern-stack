import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
import { connectRabbitMQ } from "./config/rabbitmq";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 4001;

(async () => {
  await connectDB();
  await connectRabbitMQ();
  app.listen(PORT, () => {
    logger.info(`Auth Service listening on port ${PORT}`);
  });
})();
