"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URI || "";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        logger_1.default.info("MongoDB connected for Task Service");
    }
    catch (error) {
        logger_1.default.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
