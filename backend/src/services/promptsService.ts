import prisma from "../prisma";

export const promptsService = {
  async createPrompt(
    userId: number,
    categoryId: number,
    subCategoryId: number,
    prompt: string,
    response: string
  ) {
    return prisma.prompt.create({
      data: { userId, categoryId, subCategoryId, prompt, response },
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
