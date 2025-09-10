import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET in environment variables");
}
const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}



export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  // קודם נבדוק cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // אם אין cookie, נבדוק Authorization header
  if (!token) {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const [scheme, value] = authHeader.split(" ");
      if (scheme === "Bearer" && value) {
        token = value;
      }
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: "No token, unauthorized" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, error: "Invalid or expired token" });
  }
};
