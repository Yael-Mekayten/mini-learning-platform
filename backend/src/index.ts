import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// בדיקה פשוטה
app.get("/", (req, res) => {
  res.send("Mini Learning Platform API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
