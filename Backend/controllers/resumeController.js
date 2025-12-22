// controllers/resumeController.js
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const analyzeResume = async (req, res) => {
    try {
        if (!req.file || !req.body.jobDescription) {
            return res.status(400).json({ error: "Resume file and Job Description are required" });
        }

        // 2. Extract Text from PDF
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text;

        // 3. Prepare the Prompt
        // We must be very strict with Gemini to get JSON back
        const prompt = `
            You are an expert Resume ATS Scanner. Analyze this resume against the job description.
            
            RESUME TEXT: 
            ${resumeText}
            
            JOB DESCRIPTION: 
            ${req.body.jobDescription}
            
            Output strictly in this JSON format (no markdown code blocks, just raw JSON):
            {
                "score": 0,
                "matchSummary": "A short summary...",
                "missingKeywords": ["skill1", "skill2"],
                "strengths": ["strength1", "strength2"],
                "weaknesses": ["weakness1", "weakness2"]
            }
        `;

        // 4. Send to Gemini
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // 5. Clean and Parse Response
        let text = response.text();
        
        // Sometimes Gemini wraps JSON in markdown like \`\`\`json ... \`\`\`
        // We need to strip that out to prevent crashing
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const jsonResponse = JSON.parse(text);
        
        res.json(jsonResponse);

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to analyze resume" });
    }
};

module.exports = { analyzeResume };