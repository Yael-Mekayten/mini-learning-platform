import OpenAI from "openai";
console.log("OPENAI KEY:", process.env.OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiService = {
  async generateLesson(prompt: string) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // מודל קטן ומהיר
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content || "No response from AI";
  },
};
