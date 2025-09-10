import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userService } from "../services/usersService";

if (!process.env.JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET in environment variables");
}
const JWT_SECRET = process.env.JWT_SECRET;

// רישום משתמש חדש
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

// התחברות
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

    // ✅ שומרים את ה־token ב־cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // רק ב-https בפרודקשן
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // שעה
    });

    const { id, name, role } = user;
    res.json({
      success: true,
      user: { id, name, email: user.email, role },
    });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(400).json({ success: false, error: "Could not login" });
  }
};

// בדיקה מי מחובר
export const me = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, error: "Not authenticated" });

    const payload = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    const user = await userService.getUserById(payload.userId);

    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    const { id, name, email, role } = user;
    res.json({ success: true, user: { id, name, email, role } });
  } catch (error) {
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

// התנתקות
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};
