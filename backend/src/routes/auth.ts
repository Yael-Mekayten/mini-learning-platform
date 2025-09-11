import { Router } from "express";
import { register, login, me } from "../controllers/authController";

console.log('🔧 Loading auth routes...');
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);

console.log('✅ Auth routes configured: /register, /login, /me');

export default router;

