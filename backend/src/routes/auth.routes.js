import express from "express";
import { Router } from "express";
import { login,signUp, me, refresh } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me",authenticate, me);
router.get("/refresh", refresh )
export default router;