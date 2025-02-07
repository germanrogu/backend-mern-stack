import User, { IUser } from "../models/User";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const jwtSecret: Secret = process.env.JWT_SECRET || "defaultsecret";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";
const jwtExpiresInNum = parseInt(jwtExpiresIn, 10);

// Validación con Zod
const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "user"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerUser = async (userData: unknown): Promise<IUser> => {
  const parsedData = registerSchema.parse(userData);
  const { username, email, password, role } = parsedData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const user = new User({ username, email, password, role });
  await user.save();
  return user;
};

export const loginUser = async (loginData: unknown) => {
  const parsedData = loginSchema.parse(loginData);
  const { email, password } = parsedData;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const options: SignOptions = {
    expiresIn: jwtExpiresInNum,
  };
  const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, options);
  return { token, user };
};
