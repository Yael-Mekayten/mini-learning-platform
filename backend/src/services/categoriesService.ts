import prisma from "../prisma";

export const categoryService = {
  async createCategory(name: string) {
    return prisma.category.create({ data: { name } });
  },

  async getCategories() {
    return prisma.category.findMany({
      include: { subCategories: true },
      orderBy: { name: "asc" },
    });
  },

  async createSubCategory(name: string, categoryId: number) {
    return prisma.subCategory.create({
      data: { name, categoryId },
    });
  },

  async getSubCategories(categoryId: number) {
    return prisma.subCategory.findMany({
      where: { categoryId },
      orderBy: { name: "asc" },
    });
  },
};
