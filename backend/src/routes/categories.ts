import { Router } from "express";
import {
  createCategory,
  getCategories,
  createSubCategory
} from "../controllers/categoriesController";

const router = Router();

router.post("/", createCategory);              // POST /categories
router.get("/", getCategories);                // GET /categories
router.post("/:categoryId/subcategories", createSubCategory);

export default router;
