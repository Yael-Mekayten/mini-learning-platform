import { Router } from "express";
import { getAllUsersWithPrompts } from "../controllers/usersController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @swagger
 * /admin/test:
 *   get:
 *     summary: Test admin route
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin route test successful
 */
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Admin route works!" });
});

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users with prompts (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users with their prompts
 */
router.get("/users", authMiddleware, requireRole("ADMIN"), getAllUsersWithPrompts);

export default router;
