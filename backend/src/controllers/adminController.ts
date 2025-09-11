import { Request, Response } from "express";
import prisma from "../prisma";

// שליפת כל המשתמשים עם השיעורים (כולל קטגוריות ותתי־קטגוריות)
export const getAllUsersWithPrompts = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        prompts: {
          include: {
            category: true,
            subCategory: true,
          },
        },
      },
    });

    res.json({ success: true, data: users });
  } catch (error) {
    console.error("❌ Error fetching users with prompts:", error);
    res.status(500).json({ success: false, error: "Could not fetch users" });
  }
};
