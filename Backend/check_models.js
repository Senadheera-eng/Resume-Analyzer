// check_models.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

async function listModels() {
    try {
        if (!process.env.GEMINI_API_KEY) {
            console.log("❌ ERROR: API Key missing in .env");
            return;
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Note: We use the API directly to ask "What do you have?"
        // This bypasses the specific model error.
        
        console.log("Checking available models for your API key...");
        
        // This is a special internal request to list models
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
        );
        
        const data = await response.json();
        
        if (data.error) {
            console.error("❌ API ERROR:", data.error.message);
            return;
        }

        console.log("\n✅ SUCCESS! Here are the models you can use:");
        console.log("---------------------------------------------");
        
        // Filter for models that support 'generateContent'
        const validModels = data.models.filter(m => 
            m.supportedGenerationMethods.includes("generateContent")
        );

        validModels.forEach(m => {
            // We only care about Flash and Pro models
            if(m.name.includes("flash") || m.name.includes("pro")) {
                console.log(`MODEL ID: ${m.name.replace("models/", "")}`);
            }
        });
        console.log("---------------------------------------------");

    } catch (error) {
        console.error("❌ SCRIPT FAILED:", error);
    }
}

listModels();