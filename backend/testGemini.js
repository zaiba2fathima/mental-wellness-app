require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.API_KEY;
console.log("Using API Key:", API_KEY ? "Loaded ✅" : "❌ Not Loaded");

async function testGemini() {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "Say hello from Gemini AI";

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        console.log("Gemini Response:", text);
    } catch (error) {
        console.error("Gemini Test Error:", error);
    }
}

testGemini();