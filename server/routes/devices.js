// routes/devices.js
import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  addDevice,
  listDevices,
  updateDevice,
  deleteDevice,
  calculateSummary,
  getHistory,
  recordToday,
} from "../controllers/deviceController.js";
import { deviceValidation } from "../utils/validation.js";

const router = express.Router();

router.post("/", authMiddleware, deviceValidation, addDevice);
router.get("/", authMiddleware, listDevices);
router.put("/:id", authMiddleware, updateDevice);
router.delete("/:id", authMiddleware, deleteDevice);

router.get("/summary", authMiddleware, calculateSummary);
router.get("/history", authMiddleware, getHistory);
router.post("/record", authMiddleware, recordToday);

export default router;
