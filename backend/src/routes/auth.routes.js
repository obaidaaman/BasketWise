
import { Router } from "express";
import { login, signUp, me, refresh, logout } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, signupSchema } from "../validators/auth.validator.js";
const router = Router();

router.post("/signup", validate(signupSchema), signUp);
router.post("/login", validate(loginSchema), login);
router.get("/me", authenticate, me);
router.get("/refresh", refresh);
router.get("/logout", logout);


export default router;