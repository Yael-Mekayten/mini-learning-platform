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

// GET /categories
router.get("/", getCategories);

// POST /categories (Admin only)
router.post("/", authMiddleware, requireRole("ADMIN"), createCategory);

// GET /categories/:categoryId/subcategories
router.get("/:categoryId/subcategories", getSubCategories);

// POST /categories/:categoryId/subcategories (Admin only?)
router.post("/:categoryId/subcategories", authMiddleware, requireRole("ADMIN"), createSubCategory);

export default router;
