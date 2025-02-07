"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET || "defaultsecret";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";
const jwtExpiresInNum = parseInt(jwtExpiresIn, 10);
// Validación con Zod
const registerSchema = zod_1.z.object({
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(["admin", "user"]).optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const registerUser = async (userData) => {
    const parsedData = registerSchema.parse(userData);
    const { username, email, password, role } = parsedData;
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const user = new User_1.default({ username, email, password, role });
    await user.save();
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (loginData) => {
    const parsedData = loginSchema.parse(loginData);
    const { email, password } = parsedData;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const options = {
        expiresIn: jwtExpiresInNum,
    };
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, jwtSecret, options);
    return { token, user };
};
exports.loginUser = loginUser;
