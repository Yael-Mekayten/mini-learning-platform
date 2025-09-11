import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userService } from "./usersService";

if (!process.env.JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET in environment variables");
}
const JWT_SECRET = process.env.JWT_SECRET;

export const authService = {
  async register(name: string, email: string, password: string) {
    return await userService.createUser(name, email, password);
  },

  async login(email: string, password: string) {
    const user = await userService.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  },

  async getMe(token: string) {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
    const user = await userService.getUserById(payload.userId);
    if (!user) throw new Error("User not found");

    return user;
  },
};
