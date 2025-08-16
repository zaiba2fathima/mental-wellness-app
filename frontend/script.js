document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const saveButton = document.getElementById('saveBtn');
    const journalText = document.getElementById('journalText');
    const entriesContainer = document.getElementById('entriesContainer');
    const chatbotHeader = document.getElementById('chatbotHeader');
    const chatbotMessage = document.getElementById('chatbotMessage');
    const clearEntriesBtn = document.getElementById('clearEntriesBtn');
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const qaContainer = document.getElementById('qaContainer');
    const questionInput = document.getElementById('questionInput');
    const submitQuestionBtn = document.getElementById('submitQuestionBtn');
    const qaResponse = document.getElementById('qaResponse');
    const qaResponseText = document.getElementById('qaResponseText');
    const moodChartCanvas = document.getElementById('moodChart');

    let selectedMood = null;
    let moodChart = null;
    const API_URL = 'http://localhost:3001/entries';

    async function loadEntriesFromBackend() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch entries');
            }
            const entries = await response.json();
            entriesContainer.innerHTML = '';
            entries.forEach(entry => displayEntry(entry));
            updateMoodChart(entries);
        } catch (error) {
            console.error('Error fetching entries:', error);
            alert("Could not connect to the backend server. Please ensure the server is running.");
        }
    }

    async function saveEntryToBackend(newEntry) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEntry)
            });
            if (!response.ok) {
                throw new Error('Failed to save entry');
            }
            loadEntriesFromBackend();
            alert("Entry saved successfully!");
        } catch (error) {
            console.error('Error saving entry:', error);
            alert("Failed to save entry. Please ensure the backend server is running.");
        }
    }

    loadEntriesFromBackend();

    moodButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            selectedMood = event.target.getAttribute('data-mood');
        });
    });

    saveButton.addEventListener('click', async () => {
        const entryText = journalText.value;
        if (selectedMood && entryText.trim()) {
            const newEntry = {
                mood: selectedMood,
                text: entryText,
                date: new Date().toLocaleDateString()
            };
            
            await saveEntryToBackend(newEntry);
            displayChatbotResponse(selectedMood, entryText);
            selectedMood = null;
            journalText.value = '';
            moodButtons.forEach(btn => btn.classList.remove('selected'));
        } else {
            alert("Please select a mood and write an entry before saving.");
        }
    });

    // ✅ Updated Clear All button to call backend DELETE route
    clearEntriesBtn.addEventListener('click', async () => {
        if (!confirm("Are you sure you want to clear all entries?")) return;

        try {
            const response = await fetch(API_URL, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to clear entries');
            }
            const data = await response.json();
            alert(data.message);
            loadEntriesFromBackend();
        } catch (error) {
            console.error('Error clearing entries:', error);
            alert("Failed to clear entries. Please ensure the backend server is running.");
        }
    });

    askQuestionBtn.addEventListener('click', () => {
        qaContainer.style.display = qaContainer.style.display === 'none' ? 'flex' : 'none';
        qaResponse.style.display = 'none';
    });

    submitQuestionBtn.addEventListener('click', () => {
        handleQuestion();
    });

    questionInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleQuestion();
        }
    });

    function displayEntry(entry) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('journal-entry-display');
        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entry.date}</p>
            <p><strong>Mood:</strong> ${entry.mood}</p>
            <p class="entry-text">${entry.text}</p>
            <hr>
        `;
        entriesContainer.prepend(entryDiv);
    }
    
    function displayChatbotResponse(mood, entryText) {
        let responses = [];
        let customResponse = null;
        const lowerText = entryText.toLowerCase();

        if (mood === 'happy' && (lowerText.includes('job') || lowerText.includes('promotion') || lowerText.includes('congratulations'))) {
            customResponse = "Congratulations on your new job! That's fantastic news and you should be proud.";
        } else if (mood === 'happy' && (lowerText.includes('friend') || lowerText.includes('family') || lowerText.includes('love'))) {
            customResponse = "It sounds like you have some amazing people in your life! Cherish those moments.";
        } else if (mood === 'sad' && (lowerText.includes('feel bad') || lowerText.includes('unwell'))) {
            customResponse = "I'm sorry to hear you're not feeling well. Please take some time to rest and take care of yourself.";
        }

        if (customResponse) {
            chatbotHeader.textContent = `A message for you...`;
            chatbotMessage.textContent = customResponse;
            return;
        }

        switch(mood) {
            case 'happy':
                responses = [
                    "That's wonderful! It's great to hear you're feeling happy. Keep up the positive energy and don't forget to smile today!",
                    "Your happiness is contagious! What made you feel so good today?",
                    "A happy day is a great day! Keep that feeling close to your heart."
                ];
                break;
            case 'calm':
                responses = [
                    "Feeling calm is a great state to be in. Take a moment to enjoy the peace and quiet. What helped you feel this way?",
                    "Embrace this feeling of serenity. It's a wonderful place to be.",
                    "A calm mind is a powerful mind. Continue to find peace in your day."
                ];
                break;
            case 'anxious':
                responses = [
                    "It's okay to feel anxious. Take a deep breath. Try to focus on the present moment. Maybe a short walk or some light stretching could help.",
                    "Anxiety can be tough, but you are tougher. Remember that this feeling will pass.",
                    "Breathe in for four, hold for four, and out for four. You've got this."
                ];
                break;
            case 'sad':
                responses = [
                    "I'm sorry you're feeling sad. It's important to acknowledge these feelings. Remember that it's okay to not be okay. Try listening to some of your favorite music.",
                    "It takes courage to feel sad and still move forward. Be kind to yourself today.",
                    "Sometimes the best thing you can do is just feel the feelings. I'm here for you."
                ];
                break;
            case 'tired':
                responses = [
                    "Feeling tired is your body's way of telling you to rest. Listen to it and take a break if you can.",
                    "It sounds like you need to recharge. A little rest can go a long way.",
                    "Don't push yourself too hard. A good rest is the best medicine for a tired mind and body."
                ];
                break;
            case 'stressed':
                responses = [
                    "When you feel stressed, try to focus on one thing at a time. Breaking things down can make them feel more manageable.",
                    "Remember to take a moment for yourself. A little break can clear your head and help you think more clearly.",
                    "Stress is a sign that you care. But it's also a sign to take a step back and breathe."
                ];
                break;
            default:
                responses = ["Thanks for checking in! I'm here for you."];
        }
        
        const message = responses[Math.floor(Math.random() * responses.length)];
        
        chatbotHeader.textContent = `A message for you...`;
        chatbotMessage.textContent = message;
    }

    async function handleQuestion() {
        const question = questionInput.value.trim();
        if (!question) return;

        qaResponseText.textContent = "Thinking...";
        qaResponse.style.display = 'block';
        questionInput.value = '';

        try {
            const response = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: question })
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            qaResponseText.textContent = data.answer;
        } catch (error) {
            console.error('Chatbot error:', error);
            qaResponseText.textContent = "Sorry, I couldn't get a response. Please ensure your API key is valid and the backend server is running.";
        }
    }

    function updateMoodChart(entries) {
        const moodCounts = { happy: 0, calm: 0, anxious: 0, sad: 0, tired: 0, stressed: 0 };
        entries.forEach(entry => {
            if (moodCounts.hasOwnProperty(entry.mood)) {
                moodCounts[entry.mood]++;
            }
        });
        
        const moodLabels = Object.keys(moodCounts);
        const moodData = Object.values(moodCounts);

        if (moodChart) {
            moodChart.destroy();
        }

        moodChart = new Chart(moodChartCanvas, {
            type: 'bar',
            data: {
                labels: moodLabels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),
                datasets: [{
                    label: 'Number of Entries',
                    data: moodData,
                    backgroundColor: [
                        '#ffeb3b', '#81c784', '#ff9800', '#5c6bc0', '#757575', '#e57373'
                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
});