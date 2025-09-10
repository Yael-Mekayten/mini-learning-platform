

import { Router } from "express";
import { register, login, me, logout } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// ✅ מי מחובר – חייב JWT ב־cookie
router.get("/me", authMiddleware, me);

// ✅ התנתקות
router.post("/logout", logout);

export default router;
