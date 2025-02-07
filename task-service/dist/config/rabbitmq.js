"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config();
const rabbitMQUrl = process.env.RABBITMQ_URL || "";
const connectRabbitMQ = async () => {
    try {
        const connection = await amqplib_1.default.connect(rabbitMQUrl);
        const channel = await connection.createChannel();
        logger_1.default.info("Connected to RabbitMQ in Task Service");
        return { connection, channel };
    }
    catch (error) {
        logger_1.default.error("Error connecting to RabbitMQ:", error);
        throw error;
    }
};
exports.connectRabbitMQ = connectRabbitMQ;
