import { Router } from "express";
import { createPrompt, getUserPrompts } from "../controllers/promptsController";
import { validatePrompt } from "../middleware/validatePrompt";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// יצירת פרומפט – מחייב התחברות (JWT)
router.post("/", authMiddleware, validatePrompt, createPrompt);

// שליפת פרומפטים של המשתמש המחובר
router.get("/me", authMiddleware, getUserPrompts);

export default router;
