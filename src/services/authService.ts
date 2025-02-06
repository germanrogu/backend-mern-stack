import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (userId: string, role: "admin" | "user") => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const newUser = new User({ username, email, password });
  await newUser.save();

  return {
    id: newUser._id,
    username,
    email,
    token: generateToken(newUser._id.toString(), newUser.role),
  };
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  return {
    id: user._id,
    username: user.username,
    email,
    token: generateToken(user._id.toString(), user.role),
  };
};

export { registerUser, loginUser };
