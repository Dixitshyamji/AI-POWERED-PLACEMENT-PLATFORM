Elevate — AI-Powered Placement Preparation Platform
Elevate is a full-stack web application that helps students prepare for campus placements. Users can upload their resume to get an instant AI-generated ATS score, and check their overall Placement Readiness Score — a single metric that tells them how prepared they are, along with personalized improvement suggestions if they're not ready yet.
✨ Key Features
📄 AI Resume Analyzer
Upload your resume (PDF)
Get an instant ATS Compatibility Score powered by the Google Gemini API
Receive a breakdown across Skills, Projects, and Formatting
Get concrete, actionable suggestions to improve weak areas
🎯 Placement Readiness Score
One click shows exactly how ready you are for placements — as a percentage
Score is calculated from your performance across DSA, Aptitude, Core CS, Interview practice, and Resume quality
If your score is low, the platform tells you exactly what to improve instead of just showing a number
💻 DSA Practice Module
Solve curated coding problems with an in-browser code editor
AI-powered "Explain Code" and "Dry Run" to understand your own solutions better
📝 Aptitude Test Module
Timed quantitative, logical, and verbal aptitude tests
Instant scoring and accuracy tracking
🔐 Secure Authentication
JWT-based login/signup
Passwords hashed with bcrypt
Role-based access (Student / Admin)
🛠️ Tech Stack
Layer
Technology
Frontend
React, Vite, Tailwind CSS
Backend
Node.js, Express.js
Database
MySQL
Authentication
JWT, bcrypt
AI
Google Gemini API
🧮 How the Readiness Score Works
The Placement Readiness Score is a weighted average across five areas:
Code
If the score is below a healthy threshold, the platform highlights the weakest area(s) and suggests what to focus on next — for example, "Your DSA score is low — practice more Array and String problems this week."
📸 Screenshots
Add your own screenshots here after running the project locally:
Landing page
Dashboard with readiness gauge
Resume analyzer with ATS score
DSA problem-solving screen
🚀 Getting Started
This section covers the full setup. For frontend-only or backend-only details, see client/README.md and server/README.md.
Prerequisites
Node.js (v18+)
MySQL (v8+)
A free Google Gemini API key (Get one here)
1. Clone the repository
Bash
2. Set up the database
Bash
3. Set up the backend
Bash
4. Set up the frontend
Bash
5. Open the app
Visit http://localhost:5173 in your browser.
📁 Project Structure
Code
📄 For detailed setup, folder breakdown, and API docs of each part:
Frontend: client/README.md
Backend: server/README.md
