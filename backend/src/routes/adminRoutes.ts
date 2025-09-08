import { Router } from "express";
import { getAllUsersWithPrompts } from "../controllers/adminController";

const router = Router();

// GET /admin/users
router.get("/users", getAllUsersWithPrompts);

export default router;
