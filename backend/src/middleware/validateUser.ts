import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateUser = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("phone").isString().notEmpty().withMessage("Phone is required"),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
