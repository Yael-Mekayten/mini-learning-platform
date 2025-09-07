import { Request, Response } from "express";
import { userService } from "../services/usersService";

export const createUser = async (req: Request, res: Response) => {
  const { name, phone } = req.body;
  try {
    const user = await userService.createUser(name, phone);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Could not create user" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Could not fetch users" });
  }
};
