// controllers/resumeController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
// Use dynamic import of 'pdf-parse' in the handler to support both CJS and ESM exports.


const analyzeResume = async (req, res) => {
    try {
        if (!req.file || !req.body.jobDescription) {
            return res.status(400).json({ error: "Resume file and Job Description are required" });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                error: "GEMINI_API_KEY is not set. Set it in Backend/.env (GEMINI_API_KEY=YOUR_KEY) or as an environment variable and restart the server."
            });
        }

        // Use `PDFParse` class from pdf-parse v2 with the buffer as `data`.
        const { PDFParse } = await import('pdf-parse');
        const parser = new PDFParse({ data: req.file.buffer });
        const pdfData = await parser.getText();
        const resumeText = pdfData.text;

        // Initialize Gemini (Ensure your .env is loaded!)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

        res.json(JSON.parse(text));

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to analyze resume", details: error.message });
    }
};

const healthCheck = (req, res) => {
    res.json({
        geminiApiKeySet: !!process.env.GEMINI_API_KEY
    });
};

// Export the controller
export { analyzeResume, healthCheck }; 