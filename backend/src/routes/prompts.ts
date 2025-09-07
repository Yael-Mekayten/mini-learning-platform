import { Router } from "express";
import { createPrompt, getUserPrompts } from "../controllers/promptsController";

const router = Router();

router.post("/", createPrompt);             // POST /prompts
router.get("/user/:userId", getUserPrompts); // GET /prompts/user/:userId

export default router;
