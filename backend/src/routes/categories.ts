import { Router } from "express";
import {
  createCategory,
  getCategories,
  createSubCategory
} from "../controllers/categoriesController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMiddleware";
const router = Router();

router.post("/", createCategory);              // POST /categories
router.get("/", getCategories);                // GET /categories
router.post("/:categoryId/subcategories", createSubCategory);
router.post("/categories", authMiddleware, requireRole("ADMIN"), createCategory);

export default router;
