import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err);

  if (err.code === "P2002") {
    return res.status(400).json({ success: false, error: "Duplicate field value" });
  }

  if (err.code === "P2025") {
    return res.status(404).json({ success: false, error: "Record not found" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ success: false, error: err.message });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
