import { Router } from "express";
import { getUsers } from "../controllers/usersController";
import { getUserPrompts } from "../controllers/promptsController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", authMiddleware, requireRole("ADMIN"), getUsers);

/**
 * @swagger
 * /users/{userId}/prompts:
 *   get:
 *     summary: Get user prompts (Admin or owner)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of user prompts
 */
router.get("/:userId/prompts", authMiddleware, getUserPrompts);

export default router;
