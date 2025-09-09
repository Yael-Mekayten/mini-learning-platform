import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("❌ Missing OPENAI_API_KEY in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiService = {
  async generateLesson(prompt: string) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });
      return response.choices[0]?.message?.content || "No response from AI";
    } catch (error) {
      console.error("❌ Error generating AI response:", error);
      return "Error generating response";
    }
  },
};
