# 🌿 EcoPulse AI - Green Building Sustainability Assessment Platform

An enterprise-grade, production-ready web application designed to evaluate the environmental impact of buildings based on energy consumption, water usage, and material efficiency. Computes a normalized sustainability score (0–100) with dynamic AI recommendations and interactive data visualizations.

--

## ✨ Features

- 🏗️ **Building Assessment Engine**: Evaluates energy, water, and material consumption relative to floor area.
- 📊 **40/30/30 Scoring Engine**: Normalizes metrics and computes weighted sustainability index (0–100).
- 🤖 **AI-Powered Recommendations**: Generates 5 tailored eco recommendations using OpenAI API (with robust rule-based fallback logic).
- 📈 **Interactive Visual Analytics**: Circular gauge score meter, Recharts bar chart, and weight distribution ring charts.
- 🎨 **Modern Glassmorphism UI**: Built with Tailwind CSS, Framer Motion micro-interactions, dark emerald theme, and interactive mouse glow tracker.
- 🛡️ **Production-Ready Backend**: Express.js REST API, Mongoose schemas with pre-save hooks, data validation, and indexes.

---

## 🧱 Tech Stack

### **Frontend**
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React & React Hot Toast

### **Backend**
- Node.js & Express.js
- MongoDB & Mongoose
- OpenAI API

---

## 🚀 Quick Setup & Installation

### 1️⃣ Clone & Install Dependencies
```bash
git clone https://github.com/vinodkumar0143/Ecopulse_ai.git
cd Ecopulse_ai

# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../client && npm install
```

### 2️⃣ Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/green_building_db
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
```

### 3️⃣ Running the Application

**Run Backend**:
```bash
npm run backend
# Server runs at http://localhost:5000
```

**Run Frontend**:
```bash
npm run client
# Client runs at http://localhost:3000
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/buildings` | Submit building parameters, run scoring engine & return assessment |
| `GET` | `/api/buildings` | Retrieve all historical building assessments |
| `GET` | `/api/buildings/:id` | Fetch single building assessment by ID |
| `DELETE` | `/api/buildings/:id` | Delete building assessment |
| `POST` | `/api/users/register` | Register new user account |
| `POST` | `/api/users/login` | User login authentication |

---

## 📄 License
MIT License
