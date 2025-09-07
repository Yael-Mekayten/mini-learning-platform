import { Router } from "express";
import { createUser, getUsers } from "../controllers/usersController";

const router = Router();

router.post("/", createUser);   // POST /users
router.get("/", getUsers);      // GET /users

export default router;
