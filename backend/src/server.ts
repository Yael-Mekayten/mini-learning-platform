import dotenv from "dotenv";

import app from "./index";
dotenv.config();
console.log("API KEY prefix:", process.env.OPENAI_API_KEY?.slice(0, 10));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});