import express from "express";
import prisma from "./prisma";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mini Learning Platform API is running 🚀");
});
//new user creation
app.post("/users", async (req, res) => {
  const { name, phone } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, phone },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Could not create user" });
  }
});

// get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
