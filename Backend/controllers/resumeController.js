// controllers/resumeController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createRequire } from 'module';

// 1. Load the stable library (v1.1.1)
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const analyzeResume = async (req, res) => {
    try {
        console.log("1. Request received.");

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "Server Error: API Key missing" });
        }

        if (!req.file || !req.body.jobDescription) {
            return res.status(400).json({ error: "Resume file and Job Description are required" });
        }

        // 2. Extract Text (Works perfectly with v1.1.1)
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;
        
        console.log("2. PDF Text Extracted. Length:", resumeText.length);

        // 3. Initialize Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
        res.status(500).json({ error: "Analysis Failed", details: error.message });
    }
};

export const healthCheck = (req, res) => {
    res.json({ status: "OK" });
};