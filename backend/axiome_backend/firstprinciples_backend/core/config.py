"""Configuration settings for the firstprinciples backend."""

import os
from pathlib import Path
from typing import Any, Dict, List

from dotenv import load_dotenv

# Load environment variables from .env file in backend directory
backend_dir = Path(__file__).parent.parent.parent.parent
env_path = backend_dir / ".env"
load_dotenv(env_path)

# App metadata
APP_TITLE = "First Principles Backend"
APP_DESCRIPTION = "Backend API for graph algorithm learning"
APP_VERSION = "0.1.0"

# CORS configuration
ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Next.js default port
]

CORS_SETTINGS: Dict[str, Any] = {
    "allow_origins": ALLOWED_ORIGINS,
    "allow_credentials": True,
    "allow_methods": ["*"],
    "allow_headers": ["*"],
}

# Gemini API configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY environment variable is required. "
        "Please add it to your .env file in the backend directory."
    )

# Qdrant configuration
QDRANT_HOST = os.getenv("QDRANT_HOST", "localhost")
QDRANT_PORT = int(os.getenv("QDRANT_PORT", 6333))
QDRANT_COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "first_principles")
EMBEDDING_MODEL_NAME = os.getenv(
    "QDRANT_EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2"
)
QDRANT_VECTOR_SIZE = int(os.getenv("QDRANT_VECTOR_SIZE", 384))
QDRANT_CHUNK_SIZE = int(os.getenv("QDRANT_CHUNK_SIZE", 1000))
QDRANT_CHUNK_OVERLAP = int(os.getenv("QDRANT_CHUNK_OVERLAP", 100))
