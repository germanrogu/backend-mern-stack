import dotenv from "dotenv";
import app from "./app";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`API Gateway running on port ${PORT}`);
});
