import { Router } from "express";
import { createPrompt, getUserPrompts } from "../controllers/promptsController";
import { validatePrompt } from "../middleware/validatePrompt";

const router = Router();

router.get("/user/:userId", getUserPrompts); // GET /prompts/user/:userId



router.post("/", validatePrompt, createPrompt);

export default router;

