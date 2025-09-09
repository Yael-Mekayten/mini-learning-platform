// src/controllers/promptsController.ts
import { Response } from "express";
import { promptsService } from "../services/promptsService";
import { AuthRequest } from "../middleware/authMiddleware";

// יצירת פרומפט חדש
export const createPrompt = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId, subCategoryId, prompt } = req.body;

    // לוקח userId מה-JWT ולא מה-body
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newPrompt = await promptsService.createPrompt({
      userId,
      categoryId: Number(categoryId),
      subCategoryId: Number(subCategoryId),
      prompt,
    });

    res.json(newPrompt);
  } catch (error) {
    console.error("Error creating prompt:", error);
    res.status(400).json({ error: "Could not create prompt" });
  }
};

// שליפת כל הפרומפטים של משתמש
export const getUserPrompts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const prompts = await promptsService.getPromptsByUser(userId);
    res.json(prompts);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    res.status(400).json({ error: "Could not fetch prompts" });
  }
};
