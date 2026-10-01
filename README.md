# Smart Cognitive Rehabilitation Platform

## Stack
- Frontend: React + Vite + Recharts + Lucide
- Backend: Python + FastAPI
- Database: PostgreSQL
- AI/ML: Python (next phase)

## Frontend
cd frontend
npm install
npm run dev

Open http://localhost:5173/therapist/dashboard

## Backend
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

## PostgreSQL
From project root: docker compose up -d

The first screen is fully responsive: the sidebar becomes an off-canvas menu on tablet/mobile and dashboard grids collapse for smaller screens.
