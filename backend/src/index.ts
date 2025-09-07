import express from "express";
import userRoutes from "./routes/users";
import categoryRoutes from "./routes/categories";
import promptRoutes from "./routes/prompts";

const app = express();
const PORT = process.env.PORT || 3000;

// ...
app.use(express.json());

app.use("/prompts", promptRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Mini Learning Platform API is running 🚀");
});

// Routes
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
