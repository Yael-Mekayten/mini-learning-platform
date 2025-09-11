import { Request, Response } from "express";
import { authService } from "../services/authService";

// רישום משתמש חדש
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await authService.register(name, email, password);
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

// התחברות
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.login(email, password);

    // שומרים token ב־cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    const { id, name, role } = user;
    res.json({ success: true, user: { id, name, email: user.email, role } });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(400).json({ success: false, error: (error as Error).message });
  }
};

// מי מחובר
export const me = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, error: "Not authenticated" });

    const user = await authService.getMe(token);
    const { id, name, email, role } = user;

    res.json({ success: true, user: { id, name, email, role } });
  } catch (error) {
    res.status(401).json({ success: false, error: (error as Error).message });
  }
};

// התנתקות
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};
