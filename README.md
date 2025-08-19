# 🌿 Mental Wellness App

A simple web-based **Mental Wellness App** that allows users to:
- Write journal entries about their mood and receive encouraging, predefined responses.
- Chat with an AI-powered chatbot for mental wellness support.
- Access the app through a clean and responsive frontend.

---

## 📌 Features
- **Mood Journal** – Users can type about their mood and get supportive feedback.
- **AI Chatbot** – Ask wellness-related questions and get instant AI-generated answers.
- **Predefined Wellness Responses** – For quick mood-based replies.
- **Frontend + Backend** – HTML/CSS/JS for UI, Node.js/Express for backend.
- **Secure API Keys** – Environment variables stored in `.env` file.

---

## 🛠️ Tech Stack
**Frontend:**
- HTML
- CSS
- JavaScript

**Backend:**
- Node.js
- Express.js

**AI Integration:**
- Gemini API (Google Generative AI)

---

## 📂 Project Structure

```bash
mental_wellness_app/
│
├── backend/
│   ├── server.js
│   ├── testGemini.js
│   ├── .env
│   ├── package.json
│   ├── node_modules/
│   └── venv/
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
└── README.md
'''
---

## 🚀 How It Works


User enters mood in the Journal section → predefined supportive response.

User chats with AI chatbot → response generated via Gemini API.

All interactions are processed via backend API routes.


---

## ⚙️ Installation & Setup
'''
1. **Clone the repository**
   ```bash
   git clone https://github.com/zaiba2fathima/mental-wellness-app.git
   cd mental-wellness-app

2. cd backend
   npm install
   Create .env file:API_KEY=your_google_ai_api_key

3. Run backend server: node server.js
   Backend will run on http://localhost:3001

4. Run frontend
   Open frontend/index.html in your browser.

