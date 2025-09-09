import { Router } from "express";
import { getAllUsersWithPrompts } from "../controllers/usersController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";

const router = Router();

router.get("/users", authMiddleware, requireRole("ADMIN"), getAllUsersWithPrompts);

export default router;
