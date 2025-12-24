// controllers/resumeController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const analyzeResume = async (req, res) => {
    try {
        console.log("1. Request received.");

        // Check Key
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
            return res.status(500).json({ error: "API Key missing" });
        }

        if (!req.file || !req.body.jobDescription) {
            return res.status(400).json({ error: "Resume file and Job Description are required" });
        }

        // 2. Parse PDF (This part is working perfectly now!)
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;
        console.log("2. PDF Text Extracted. Length:", resumeText.length);

        // 3. Google AI
        const genAI = new GoogleGenerativeAI(key);
        
        // --- FIX: Use the alias found in your own script ---
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
            You are an expert Resume ATS Scanner. Analyze this resume against the job description.
            RESUME TEXT: ${resumeText}
            JOB DESCRIPTION: ${req.body.jobDescription}
            
            Output strictly in this JSON format:
            {
                "score": 0,
                "matchSummary": "summary...",
                "missingKeywords": [],
                "strengths": [],
                "weaknesses": []
            }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();

        console.log("3. AI Response received.");
        res.json(JSON.parse(text));

    } catch (error) {
        console.error("ERROR:", error);
        
        // If it's still a quota error, we will know exactly why
        res.status(500).json({ error: "Analysis Failed", details: error.message });
    }
};

export const healthCheck = (req, res) => {
    res.json({ status: "OK" });
};