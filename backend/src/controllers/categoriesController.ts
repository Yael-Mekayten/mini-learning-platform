import { Request, Response } from "express";
import { categoryService } from "../services/categoriesService";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await categoryService.createCategory(name);
    res.json({ success: true, data: category });
  } catch (error) {
    console.error("❌ Error creating category:", error);
    res.status(400).json({ success: false, error: "Could not create category" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res.status(400).json({ success: false, error: "Could not fetch categories" });
  }
};

export const createSubCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const categoryId = Number(req.params.categoryId);

  try {
    const subCategory = await categoryService.createSubCategory(name, categoryId);
    res.json({ success: true, data: subCategory });
  } catch (error) {
    console.error("❌ Error creating subcategory:", error);
    res.status(400).json({ success: false, error: "Could not create subcategory" });
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
  const categoryId = Number(req.params.categoryId);
  try {
    const subCategories = await categoryService.getSubCategories(categoryId);
    res.json({ success: true, data: subCategories });
  } catch (error) {
    console.error("❌ Error fetching subcategories:", error);
    res.status(400).json({ success: false, error: "Could not fetch subcategories" });
  }
};
