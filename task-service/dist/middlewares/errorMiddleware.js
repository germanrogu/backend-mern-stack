"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const errorMiddleware = (err, req, res, next) => {
    logger_1.default.error("Unhandled error: ", err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
};
exports.default = errorMiddleware;
