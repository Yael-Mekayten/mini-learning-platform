import dotenv from "dotenv";
dotenv.config();

import app from "./index";
console.log("API KEY prefix:", process.env.OPENAI_API_KEY?.slice(0, 10));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});