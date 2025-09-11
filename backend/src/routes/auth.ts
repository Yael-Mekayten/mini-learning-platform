import { Router } from "express";
import { register, login, me, logout } from "../controllers/authController";

console.log('🔧 Loading auth routes...');
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);
router.post("/logout", logout);

console.log('✅ Auth routes configured: /register, /login, /me, /logout');

export default router;

