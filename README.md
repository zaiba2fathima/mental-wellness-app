# 🌿 Mental Wellness App

Mental Wellness App is a web-based platform designed to support users’ mental health and wellness. Users can track their mood, write journals, visualize their emotional trends over time, and seek guidance from an AI-powered Gemini chatbot to improve their mental well-being.

---

## Features ✨

Mood Selection: Users can select their current mood from a list of options.

Journal Writing: Based on the selected mood, users can write journal entries which are saved securely.

Mood Tracking & Graphs: View mood trends over time with interactive graphs for daily, monthly, and yearly tracking.

Gemini Chatbot Assistance: Users can interact with a Gemini AI chatbot to get personalized suggestions to improve mental wellness based on their moods.

Long-Term Tracking: Journal entries and mood data are stored and can be reviewed over months and years.

Health Insights: Identify potential issues in mental health and receive advice or guidance from the Gemini chatbot.

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

**Database:**
- SQLite(for journaling and mood tracking)

---

## 📂 Project Structure

```bash
mental_wellness_app/
│
├── backend/
│   ├── server.js
│   ├── testGemini.js
│   ├── .env
|   |__ database.js
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
```
---

## 🚀 How It Works


Select Mood: Users select how they are feeling.

Write Journal: Based on mood, users write their journal entries.

Save Entries: Entries are securely saved in SQLite and linked to the user.

Visualize Trends: Users can view graphs of their mood trends over time.

Consult Gemini Chatbot: Users can ask the chatbot for advice or suggestions to improve their mental wellness.


---

## ⚙️ Installation & Setup

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

