// Generate content
import { GoogleGenAI, Type } from "@google/genai";
import * as fs from 'fs';
import { Buffer } from 'buffer';

const ai = new GoogleGenAI({ apiKey: "AIzaSyBgZh7NFUiZSkzcOk__8LaQO0Vq8DYbquA" });

async function main() {
    const contents = [
        { text: `Generate an interactive lesson like Duolingo and Briliant for this lesson. 
                Produce JSON matching this specification:
                Step = { "id": integer, "question": string, "options": array, "answer": string, "explanation": string }
                Return: array<Step>` },
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: Buffer.from(fs.readFileSync("/Users/noahchen/Downloads/Session\ 11\ \(2025\)\ -\ Copy.pdf")).toString("base64")
            }
        }
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents
    });
    console.log(response.text);
}

main();