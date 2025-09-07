import prisma from "../prisma";

export const categoryService = {
  async createCategory(name: string) {
    return prisma.category.create({ data: { name } });
  },

  async getCategories() {
    return prisma.category.findMany({
      include: { subCategories: true },
    });
  },

  async createSubCategory(name: string, categoryId: number) {
    return prisma.subCategory.create({
      data: { name, categoryId },
    });
  }
};
