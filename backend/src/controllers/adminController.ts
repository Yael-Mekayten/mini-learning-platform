import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllUsersWithPrompts = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        prompts: {
          include: {
            category: true,
            subCategory: true
          }
        }
      }
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users with prompts:", error);
    res.status(500).json({ error: "Could not fetch users" });
  }
};
