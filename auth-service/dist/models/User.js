"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SALT_FACTOR = Number(process.env.SALT_FACTOR) || 10;
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    try {
        const hashedPassword = await bcrypt_1.default.hash(this.password, SALT_FACTOR);
        this.password = hashedPassword;
        next();
    }
    catch (error) {
        return next(error); // Explicitly return the error
    }
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt_1.default.compare(candidatePassword, this.password);
};
UserSchema.methods.toJSON = function () {
    const { password, ...rest } = this.toObject(); // More concise toJSON
    return rest;
};
const User = (0, mongoose_1.model)("User", UserSchema); // Store the model in a variable
exports.default = User; // Export the model variable
