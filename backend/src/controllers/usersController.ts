import { Request, Response } from "express";
import { userService } from "../services/usersService";

// שליפת כל המשתמשים (Admin בלבד)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(400).json({ success: false, error: "Could not fetch users" });
  }
};

export const getAllUsersWithPrompts = async (req: Request, res: Response) => {
  try {
    console.log('👥 Admin requesting users with prompts');
    const users = await userService.getAllUsersWithPrompts();
    console.log('✅ Found users:', users.length);
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("❌ Error fetching users with prompts:", error);
    res.status(500).json({ success: false, error: "Could not fetch users with prompts" });
  }
};
