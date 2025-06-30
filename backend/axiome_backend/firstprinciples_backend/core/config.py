"""Configuration settings for the firstprinciples backend."""

import os
from pathlib import Path
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

CORS_SETTINGS = {
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