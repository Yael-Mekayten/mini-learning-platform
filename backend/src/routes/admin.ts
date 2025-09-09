import { Router, Request, Response, NextFunction } from "express";
import { getAllUsersWithPrompts } from "../controllers/usersController";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// רק למנהל מותר
router.get(
  "/users",
  authMiddleware,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }
    return getAllUsersWithPrompts(req, res);
  }
);

export default router;


