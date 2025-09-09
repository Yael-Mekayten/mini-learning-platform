import prisma from "../prisma";
import bcrypt from "bcryptjs";

export const userService = {
  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
  },

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async getUsers() {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async getAllUsersWithPrompts() {
    return prisma.user.findMany({
      include: {
        prompts: {
          include: {
            category: true,
            subCategory: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
