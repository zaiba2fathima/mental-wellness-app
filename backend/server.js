const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env variables
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3001;

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.error("❌ API Key is missing. Please check your .env file.");
    process.exit(1);
}

console.log("✅ API Key Loaded");

const genAI = new GoogleGenerativeAI(API_KEY);

app.use(express.json());
app.use(cors());

let entries = [];

// Get all entries
app.get('/entries', (req, res) => {
    res.json(entries);
});

// Add a new entry
app.post('/entries', (req, res) => {
    const newEntry = req.body;
    entries.push(newEntry);
    res.status(201).json(newEntry);
});
app.delete('/entries', (req, res) => {
    entries = [];
    res.json({ message: "All entries have been cleared." });
});


// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const userQuestion = req.body.question;
        if (!userQuestion) {
            return res.status(400).json({ error: "Question is required" });
        }


        // Use the latest Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userQuestion);
        const text = result.response.text();

        res.json({ answer: text });
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: "Failed to get a response from the AI." });
    }
});


app.listen(port, () => {
    console.log(`🚀 Backend server listening at http://localhost:${port}`);
});