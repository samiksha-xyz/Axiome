# Axiome
🏛️ Learn algorithms from first principles through in depth exploration of computing - from axioms to modern AI - with CLA and contributor workflow

## Starting development environment

### Qdrant

Qdrant runs on a Docker image. If this is your first time running Qdrant on Docker, you may need to pull the latest Docker image:
```
docker pull qdrant/qdrant
```
Documents can be embedded in Qdrant with qdrant_processor.py, more details in the Qdrant README.  
Start the Qdrant database using Docker compose:
```
cd qdrant
docker-compose up -d
```
The Qdrant web UI can be accessed at `http://localhost:6333/dashboard`.

### Backend
```
cd ../backend
uv run uvicorn axiome_backend.firstprinciples_backend.app:app --reload
```
The backend should run a connection test to Qdrant on startup.  
The FastAPI docs can be accessed at `http://localhost:8000/docs`.

### Frontend
```
cd ../frontend/firstprinciples_frontend
npm run dev
```
The Next.js frontend can be accessed at `http://localhost:3000`
