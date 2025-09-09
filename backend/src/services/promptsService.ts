import prisma from "../prisma";

interface CreatePromptInput {
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
  response?: string;
}

export const promptsService = {
  async createPrompt(data: CreatePromptInput) {
    return prisma.prompt.create({
      data: {
        userId: data.userId,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        prompt: data.prompt,
        response: data.response || "",
      },
      include: {
        category: true,
        subCategory: true,
      },
    });
  },

  async getPromptsByUser(userId: number) {
    return prisma.prompt.findMany({
      where: { userId },
      include: {
        category: true,
        subCategory: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
