# Axiome
🏛️ Learn algorithms from first principles through in depth exploration of computing - from axioms to modern AI - with CLA and contributor workflow

## Quick Start
These instructions will get a copy of this project running on your local machine for development and testing purposes.

### Requirements
- Git configured locally
- Python 3.9+ and Node.js 18+ installed
- pip (which is included with most Python installations)
- Docker Desktop installed
- uv - you can install uv using pip:
```bash
pip install uv
```

### First-Time Setup
1. Clone the repository
```bash
git clone https://github.com/samiksha-xyz/Axiome.git
cd Axiome
```
2. Set up backend and frontend environment
```bash
# Backend setup (Python with uv)
cd backend
uv sync
source .venv/bin/activate # On Windows: .venv\Scripts\activate

# Frontend setup (Node.js)
cd ../frontend
npm install
```
3. Set up Qdrant. Qdrant runs on a Docker image. If this is your first time running Qdrant on Docker, you may need to pull the latest Docker image. Make sure Docker Desktop is running on your computer:
```bash
docker pull qdrant/qdrant
```
You'll want to embed some documents into Qdrant. Eventually, this process will be automated, but for now follow these instructions.  
First, start Docker:
```bash
cd qdrant
docker-compose up -d
```
Next, install the needed requirements:
```bash
pip install -r requirements.txt
```
Finally, embed the two given documents into Qdrant:
```bash
python qdrant_processor.py docs/dfs.txt
python qdrant_processor.py docs/dfs_example.txt
```

4. Set up environment variables
Create a .env file in the backend directory. This project is currently configured to run the LangGraph backend using Google's Gemini API.  
You can generate a Gemini API key at https://aistudio.google.com/app/apikey.
Configure the .env file as follows:
```bash
GOOGLE_API_KEY="google_api_key_here"
```
## Starting Development Environment

### Qdrant

Start the Qdrant database using Docker compose:
```bash
cd qdrant
docker-compose up -d
```
The Qdrant web UI can be accessed at `http://localhost:6333/dashboard`.

### Backend
```bash
cd ../backend
```
If you haven't activated the virtual environment, do so next, then start the app.
```bash
source .venv/bin/activate # On Windows: .venv\Scripts\activate 
uv run uvicorn axiome_backend.firstprinciples_backend.app:app --reload
```
The backend should run a connection test to Qdrant on startup.  
The FastAPI docs can be accessed at `http://localhost:8000/docs`.

### Frontend
```bash
cd ../frontend/firstprinciples_frontend
npm run dev
```
The Next.js frontend can be accessed at `http://localhost:3000`.

## Running tests and lint checks

### Backend
```bash
cd backend
uv run pytest -v
uv run ruff check .
uv run black .
uv run mypy .
```

### Frontend
```bash
cd frontend
npm test
npm run lint
```
