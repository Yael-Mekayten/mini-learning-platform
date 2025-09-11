import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import prisma from "../prisma";

export const aiService = {
  async generateLesson(prompt: string, categoryId: number, subCategoryId: number) {
    try {
      // שליפת שמות הקטגוריות
      const category = await prisma.category.findUnique({ where: { id: categoryId } });
      const subCategory = await prisma.subCategory.findUnique({ where: { id: subCategoryId } });
      
      const contextPrompt = `אתה מורה מומחה בתחום ${category?.name} ובפרט ב${subCategory?.name}.
אנא ענה על השאלה הבאה בצורה מפורטת וחינוכית:

${prompt}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: contextPrompt }],
      });
      return response.choices[0]?.message?.content || "No response from AI";
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "Error generating response";
    }
  },
};
