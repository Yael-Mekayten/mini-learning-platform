import { Router } from "express";
import { createPrompt } from "../controllers/promptsController";
import { validatePrompt } from "../middleware/validatePrompt";

const router = Router();


router.post("/", validatePrompt, createPrompt);

export default router;

