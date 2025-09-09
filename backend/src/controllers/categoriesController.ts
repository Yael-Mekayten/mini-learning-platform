import { Request, Response } from "express";
import { categoryService } from "../services/categoriesService";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await categoryService.createCategory(name);
    res.json(category);
  } catch (error) {
      console.error("Error creating category:", error);

    res.status(400).json({ error: "Could not create category" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error) {
      console.error("Error creating category:", error);

    res.status(400).json({ error: "Could not fetch categories" });
  }
};

export const createSubCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const categoryId = Number(req.params.categoryId);

  try {
    const subCategory = await categoryService.createSubCategory(name, categoryId);
    res.json(subCategory);
  } catch (error) {
      console.error("Error creating category:", error);

    res.status(400).json({ error: "Could not create subcategory" });
  }
};

