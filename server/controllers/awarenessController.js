// controllers/awarenessController.js
import Awareness from "../models/Awareness.js";

// 📌 Helper: Ensure Admin Access
const checkAdmin = (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Access denied: Admins only" });
    return false;
  }
  return true;
};

// 📌 Get all awareness content (for users)
export const getAwarenessContent = async (req, res) => {
  try {
    const content = await Awareness.find().sort({ createdAt: -1 });
    res.json({ success: true, data: content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Add awareness content (Admin only)
export const addAwarenessContent = async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const { type, title, url, description } = req.body;

    if (!type || !title || !url) {
      return res.status(400).json({ message: "type, title and url are required" });
    }

    // Validate type
    const allowedTypes = ["article", "video", "doc"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid content type" });
    }

    const newContent = new Awareness({
      type,
      title,
      url,
      description,
      createdBy: req.user._id,
    });

    await newContent.save();
    res.status(201).json({ success: true, message: "Content added successfully", data: newContent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Update awareness content (Admin only)
export const updateAwarenessContent = async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const { id } = req.params;
    const updated = await Awareness.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Content not found" });

    res.json({ success: true, message: "Content updated successfully", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 📌 Delete awareness content (Admin only)
export const deleteAwarenessContent = async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const { id } = req.params;
    const deleted = await Awareness.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Content not found" });

    res.json({ success: true, message: "Content deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
