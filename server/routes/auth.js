// routes/auth.js
import express from "express";
import {
  signup,
  login,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";
import { registerValidation, loginValidation, profileValidation, changePasswordValidation } from "../utils/validation.js";

const router = express.Router();

router.post("/register", registerValidation, signup);
router.post("/login", loginValidation, login);

// Protected profile routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, profileValidation, updateProfile);
router.put("/change-password", authMiddleware, changePasswordValidation, changePassword);

export default router;
