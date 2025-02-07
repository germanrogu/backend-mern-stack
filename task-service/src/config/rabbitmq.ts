import amqp from "amqplib";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();
const rabbitMQUrl = process.env.RABBITMQ_URL || "";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();
    logger.info("Connected to RabbitMQ in Task Service");
    return { connection, channel };
  } catch (error) {
    logger.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};
