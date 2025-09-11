import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users";
import categoryRoutes from "./routes/categories";
import promptRoutes from "./routes/prompts";
import adminRoutes from "./routes/admin";
import authRoutes from "./routes/auth";

import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { setupSwagger } from "./swagger";  // 👈 הוספה

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));

// Swagger Docs
setupSwagger(app);  

// Routes
app.use("/api/prompts", promptRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

console.log('✅ All routes loaded successfully');

// Health check
app.get("/", (req, res) => {
  res.send("Mini Learning Platform API is running");
});

// Not found + Error handler
app.use(notFound);
app.use(errorHandler);

export default app;
