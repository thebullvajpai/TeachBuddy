import express from "express";
import cors from "cors";
import { getAIResponse } from "./aiService.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "../")));

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const reply = await getAIResponse(userMessage);

        res.json({ reply });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI error" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});