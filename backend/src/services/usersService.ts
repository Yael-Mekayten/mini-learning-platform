import prisma from "../prisma";

export const userService = {
  async createUser(name: string, phone: string) {
    return prisma.user.create({ data: { name, phone } });
  },

  async getUsers() {
    return prisma.user.findMany();
  }
};
