import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { GoogleGenAI, Type } from "@google/genai";

import * as fs from "fs";
import { Buffer } from "buffer";

const app = express();
const port = 3001;

app.use(cors());
app.use(fileUpload());

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBgZh7NFUiZSkzcOk__8LaQO0Vq8DYbquA",
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
                Return: array<Step>`,
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
