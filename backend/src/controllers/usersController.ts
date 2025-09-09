import { Request, Response } from "express";
import { userService } from "../services/usersService";

// רישום משתמש חדש
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.createUser(name, email, password);
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: "Could not create user" });
  }
};

// שליפת כל המשתמשים (למשל עבור Admin)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(400).json({ error: "Could not fetch users" });
  }
};


export const getAllUsersWithPrompts = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsersWithPrompts();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users with prompts:", error);
    res.status(500).json({ error: "Could not fetch users with prompts" });
  }
};
