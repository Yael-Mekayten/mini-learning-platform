import { Router } from "express";
import {
  createCategory,
  getCategories,
  createSubCategory,
  getSubCategories
} from "../controllers/categoriesController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post("/", authMiddleware, requireRole("ADMIN"), createCategory);

/**
 * @swagger
 * /categories/{categoryId}/subcategories:
 *   get:
 *     summary: Get subcategories
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of subcategories
 */
router.get("/:categoryId/subcategories", getSubCategories);

/**
 * @swagger
 * /categories/{categoryId}/subcategories:
 *   post:
 *     summary: Create subcategory (Admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 */
router.post("/:categoryId/subcategories", authMiddleware, requireRole("ADMIN"), createSubCategory);

export default router;
