import Device from "../models/Device.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

/**
 * ➕ Add Device (with validation + prevent duplicate refs)
 */
export const addDevice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { deviceName, wattage, activityTime, emissionFactor } = req.body;

  try {
    const device = new Device({
      user: req.user._id,
      deviceName,
      wattage,
      activityTime,
      emissionFactor,
    });
    await device.save();

    // prevent duplicate references
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { "household.devices": device._id },
    });

    res.status(201).json({ success: true, data: device });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * 📋 List Devices
 */
export const listDevices = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user._id });
    res.json({ success: true, data: devices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ✏️ Update Device (recompute kWh & emission automatically via pre-save)
 */
export const updateDevice = async (req, res) => {
  const { id } = req.params;
  const { deviceName, wattage, activityTime, emissionFactor } = req.body;

  try {
    const device = await Device.findOne({ _id: id, user: req.user._id });
    if (!device) return res.status(404).json({ message: "Device not found" });

    if (deviceName !== undefined) device.deviceName = deviceName;
    if (wattage !== undefined) device.wattage = wattage;
    if (activityTime !== undefined) device.activityTime = activityTime;
    if (emissionFactor !== undefined) device.emissionFactor = emissionFactor;

    await device.save(); // triggers pre("save") to recalc
    res.json({ success: true, data: device });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ❌ Delete Device
 */
export const deleteDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const device = await Device.findOneAndDelete({ _id: id, user: req.user._id });
    if (!device) return res.status(404).json({ message: "Device not found" });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { "household.devices": device._id },
    });

    res.json({ success: true, message: "Device removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * 📊 Energy & Emission Summary
 */
export const calculateSummary = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user._id });

    let totalEnergy = 0;
    let totalEmission = 0;

    devices.forEach((d) => {
      totalEnergy += d.kWh;
      totalEmission += d.emission;
    });

    res.json({ success: true, totalEnergy, totalEmission, devices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * 📜 Historical Data
 */
export const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, data: user.household.history });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * 🗓️ Record Today’s Summary (avoid duplicate records for the same date)
 */
export const recordToday = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user._id });

    let totalEnergy = 0;
    let totalEmission = 0;

    devices.forEach((d) => {
      totalEnergy += d.kWh;
      totalEmission += d.emission;
    });

    const user = await User.findById(req.user._id);

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const existing = user.household.history.find(
      (h) => h.date.toISOString().split("T")[0] === today
    );

    if (existing) {
      existing.totalEnergy = totalEnergy;
      existing.totalEmission = totalEmission;
    } else {
      user.household.history.push({ totalEnergy, totalEmission });
    }

    await user.save();

    res.json({ success: true, message: "Daily record saved", totalEnergy, totalEmission });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
