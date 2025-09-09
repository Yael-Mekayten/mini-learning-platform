import { Request, Response } from "express";
import { promptsService } from "../services/promptsService";
import { aiService } from "../services/aiService";



export const getUserPrompts = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const prompts = await promptsService.getPromptsByUser(Number(userId));
    res.json(prompts);
  } catch (error) {
      console.error("Error fetching prompts:", error);  
    res.status(400).json({ error: "Could not fetch prompts" });
  }
};

export const createPrompt = async (req: Request, res: Response) => {
  const { userId, categoryId, subCategoryId, prompt } = req.body;

  try {
    // קריאה ל־OpenAI API
    const response = await aiService.generateLesson(prompt);

    const newPrompt = await promptsService.createPrompt(
      Number(userId),
      Number(categoryId),
      Number(subCategoryId),
      prompt,
      response
    );

    res.json(newPrompt);
  } catch (error) {
      console.error("Error fetching prompts:", error);  

    res.status(400).json({ error: "Could not create prompt" });
  }
};
