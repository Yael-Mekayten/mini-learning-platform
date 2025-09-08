import prisma from "../prisma";

export const getAllUsersWithPromptsService = async () => {
  return prisma.user.findMany({
    include: {
      prompts: {
        include: {
          category: true,
          subCategory: true
        }
      }
    }
  });
};
