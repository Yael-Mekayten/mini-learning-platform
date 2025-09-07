import { Request, Response } from "express";
import { promptsService } from "../services/promptsService";

export const createPrompt = async (req: Request, res: Response) => {
  const { userId, categoryId, subCategoryId, prompt } = req.body;

  try {
    // ⚠️ בשלב ראשון נשתמש ב־mock response
    const response = `AI mock response for: ${prompt}`;

    const newPrompt = await promptsService.createPrompt(
      Number(userId),
      Number(categoryId),
      Number(subCategoryId),
      prompt,
      response
    );

    res.json(newPrompt);
  } catch (error) {
    res.status(400).json({ error: "Could not create prompt" });
  }
};

export const getUserPrompts = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const prompts = await promptsService.getPromptsByUser(Number(userId));
    res.json(prompts);
  } catch (error) {
    res.status(400).json({ error: "Could not fetch prompts" });
  }
};
