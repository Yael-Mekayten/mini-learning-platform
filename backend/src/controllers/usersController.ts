import { Request, Response } from "express";
import { userService } from "../services/usersService";

// שליפת כל המשתמשים (Admin בלבד, אבל endpoint גנרי)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(400).json({ success: false, error: "Could not fetch users" });
  }
};
