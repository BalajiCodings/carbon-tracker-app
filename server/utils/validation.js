// utils/validation.js
import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  body("householdMembers")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Household members must be between 1 and 20"),
];

export const loginValidation = [
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const deviceValidation = [
  body("deviceName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Device name must be between 1 and 100 characters"),
  body("wattage").isFloat({ min: 0, max: 10000 }).withMessage("Wattage must be between 0 and 10000 watts"),
  body("activityTime").isFloat({ min: 0, max: 24 }).withMessage("Activity time must be between 0 and 24 hours"),
  body("emissionFactor")
    .optional()
    .isFloat({ min: 0, max: 2 })
    .withMessage("Emission factor must be between 0 and 2"),
];

export const resourceValidation = [
  body("title").trim().isLength({ min: 1, max: 200 }).withMessage("Title must be between 1 and 200 characters"),
  body("type").isIn(["video", "article", "document"]).withMessage("Type must be video, article, or document"),
  body("url").isURL().withMessage("Please provide a valid URL"),
  body("category").trim().isLength({ min: 1, max: 50 }).withMessage("Category must be between 1 and 50 characters"),
  body("description").optional().trim().isLength({ max: 500 }).withMessage("Description must be less than 500 characters"),
];

/**
 * Profile update validation
 * - name: optional 2..50
 * - email: optional valid
 * - householdMembers: optional integer 1..
 */
export const profileValidation = [
  body("name").optional().trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").optional().isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("householdMembers")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("householdMembers must be an integer between 1 and 50"),
];

/**
 * Change password validation
 * - currentPassword required
 * - newPassword required + same pattern as registration
 */
export const changePasswordValidation = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("New password must contain at least one uppercase letter, one lowercase letter, and one number"),
];
