import { Router } from "express";
import { handleLogin } from "../controllers/AuthController";
import { handleGoogleLogin } from "../controllers/AuthController";

const router = Router();

/**
 * @route   POST /api/auth/login
 */
router.post("/login", handleLogin);

/**
 * @route   POST /api/auth/login/google
 */
router.post("/login/google", handleGoogleLogin);

export default router;
