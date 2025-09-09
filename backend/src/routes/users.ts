import { Router } from "express";
import { getUsers } from "../controllers/usersController";
import { getUserPrompts } from "../controllers/promptsController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";

const router = Router();

// GET /users - Admin only
router.get("/", authMiddleware, requireRole("ADMIN"), getUsers);

// GET /users/:userId/prompts (Admin or owner)
router.get("/:userId/prompts", authMiddleware, getUserPrompts);

export default router;
