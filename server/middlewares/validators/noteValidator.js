import { body } from "express-validator";

export const noteValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("password")
    .optional()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long if provided")
];
