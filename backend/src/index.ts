
import express from "express";
import userRoutes from "./routes/users";
import categoryRoutes from "./routes/categories";
import promptRoutes from "./routes/prompts";
import adminRoutes from "./routes/adminRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import authRoutes from "./routes/auth";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/prompts", promptRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/admin", adminRoutes);
app.use(notFound);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

// Health check
app.get("/", (req, res) => {
  res.send("Mini Learning Platform API is running 🚀");
});

export default app;