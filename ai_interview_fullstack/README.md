# AI Interview Prep – Full Stack App

This bundle contains:



## 1. Backend Setup

```bash
cd backend
cp .env.example .env
# edit .env to set MONGO_URI and JWT_SECRET
npm install
npm run dev
```

The API runs on `http://localhost:5000`.

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Vite will start the app (usually at `http://localhost:5173`).

The frontend talks to the backend at `http://localhost:5000` as configured in:

- `frontend/src/Services/authService.js`
- `frontend/src/Services/geminiService.js`


