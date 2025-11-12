import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";


export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, householdMembers } = req.body;
  try {
    const normalizedEmail = (email || "").trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      household: { members: householdMembers ?? 1 },
    });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      household: user.household,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Login
 */
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const normalizedEmail = (email || "").trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      household: user.household,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get profile
 */
export const getProfile = async (req, res) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      household: user.household,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * Update profile
 */
export const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, householdMembers } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name !== undefined) user.name = String(name).trim();

    let token;
    if (email !== undefined) {
      const normalizedEmail = String(email).trim().toLowerCase();
      if (normalizedEmail !== user.email) {
        const exists = await User.findOne({ email: normalizedEmail });
        if (exists) return res.status(400).json({ message: "Email already in use" });
        user.email = normalizedEmail;
        token = generateToken(user._id); // new token if email changes
      }
    }

    if (householdMembers !== undefined) {
      const members = Number(householdMembers);
      if (!Number.isInteger(members) || members < 1) {
        return res.status(400).json({ message: "householdMembers must be an integer >= 1" });
      }
      user.household.members = members;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      household: user.household,
      token: token || generateToken(user._id), // return token anyway
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Change password
 */
export const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
