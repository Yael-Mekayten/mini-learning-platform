import { Router } from "express";
import { createPrompt, getUserPrompts } from "../controllers/promptsController";
import { validatePrompt } from "../middleware/validatePrompt";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

/**
 * @swagger
 * /prompts:
 *   post:
 *     summary: Create a new prompt
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Prompt created successfully
 */
router.post("/", authMiddleware, validatePrompt, createPrompt);

/**
 * @swagger
 * /prompts/me:
 *   get:
 *     summary: Get user prompts
 *     tags: [Prompts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user prompts
 */
router.get("/me", authMiddleware, getUserPrompts);

export default router;
