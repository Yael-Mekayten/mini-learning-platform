import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validatePrompt = [
  body("categoryId").isInt().withMessage("categoryId must be an integer"),
  body("subCategoryId").isInt().withMessage("subCategoryId must be an integer"),
  body("prompt").isString().notEmpty().withMessage("prompt is required"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
