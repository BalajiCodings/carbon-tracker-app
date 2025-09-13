// routes/awareness.js
import express from "express";
import {
  getAwarenessContent,
  addAwarenessContent,
  updateAwarenessContent,
  deleteAwarenessContent,
} from "../controllers/awarenessController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Public route → any logged-in user can view awareness content
router.get("/", authMiddleware, getAwarenessContent);

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, addAwarenessContent);
router.put("/:id", authMiddleware, adminMiddleware, updateAwarenessContent);
router.delete("/:id", authMiddleware, adminMiddleware, deleteAwarenessContent);

export default router;
