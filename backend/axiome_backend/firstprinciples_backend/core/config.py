"""Configuration settings for the firstprinciples backend."""

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