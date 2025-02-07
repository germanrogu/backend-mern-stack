"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const rabbitmq_1 = require("./config/rabbitmq");
const logger_1 = __importDefault(require("./utils/logger"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4002;
(async () => {
    await (0, db_1.connectDB)();
    await (0, rabbitmq_1.connectRabbitMQ)();
    app_1.default.listen(PORT, () => {
        logger_1.default.info(`Task Service listening on port ${PORT}`);
    });
})();
