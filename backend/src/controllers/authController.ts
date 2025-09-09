import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userService } from "../services/usersService";

if (!process.env.JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET in environment variables");
}
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.createUser(name, email, password);
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(400).json({ success: false, error: "Could not register user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ success: false, error: "Invalid password" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(400).json({ success: false, error: "Could not login" });
  }
};
