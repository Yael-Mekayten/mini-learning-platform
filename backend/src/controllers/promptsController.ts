import { Response } from "express";
import { promptsService } from "../services/promptsService";
import { AuthRequest } from "../middleware/authMiddleware";
import { aiService } from "../services/aiService";

// יצירת פרומפט חדש
export const createPrompt = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId, subCategoryId, prompt } = req.body;

    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    // 🔥 קריאה ל-AI לקבלת תשובה
    const aiResponse = await aiService.generateLesson(prompt);

    // שמירת פרומפט + תשובה ב-DB
    const newPrompt = await promptsService.createPrompt({
      userId,
      categoryId: Number(categoryId),
      subCategoryId: Number(subCategoryId),
      prompt,
      response: aiResponse,
    });

    res.json({ success: true, data: newPrompt });
  } catch (error) {
    console.error("❌ Error creating prompt:", error);
    res.status(400).json({ success: false, error: "Could not create prompt" });
  }
};

export const getUserPrompts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId; // במקום לקרוא ל-param
    if (!userId) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const prompts = await promptsService.getPromptsByUser(userId);
    res.json({ success: true, data: prompts });
  } catch (error) {
    console.error("❌ Error fetching prompts:", error);
    res.status(400).json({ success: false, error: "Could not fetch prompts" });
  }
};
