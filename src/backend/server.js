import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: ["http://localhost:5173", "https://lesson-gpt-eta.vercel.app"],
}));

app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate content
app.post("/quiz", async (req, res) => {
  try {
    const file = req.files?.file;
    if (!file) return res.status(400).send("No file uploaded");
  
    const contents = [
      {
        text: `Generate an interactive lesson like Duolingo and Briliant for this lesson. 
                Produce JSON matching this specification:
                Step = { "id": integer, "question": string, "options": array, "answer": string, "explanation": string }
                Return: array<Step>
                each question should have 4 options`,
      },
      {
        inlineData: {
          mimeType: file.mimetype,
          data: file.data.toString("base64"),
        },
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });
    // Extract JSON part from response
    const match = result.text.match(/\[\s*{[\s\S]*?}\s*\]/);
    if (!match) return res.status(500).send("Gemini did not return valid JSON");

    const quiz = JSON.parse(match[0]);
    res.json({ steps: quiz });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating quiz");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
