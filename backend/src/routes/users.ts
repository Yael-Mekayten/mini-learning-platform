import { Router } from "express";
import { createUser, getUsers } from "../controllers/usersController";
import { getUserPrompts } from "../controllers/promptsController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", createUser);   // POST /users
router.get("/", getUsers);      // GET /users
router.get("/:id/prompts", authMiddleware, getUserPrompts);

export default router;



