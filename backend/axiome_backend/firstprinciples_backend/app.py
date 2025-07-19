"""FastAPI application for firstprinciples backend."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes.concepts import router as concepts_router
from .core.config import APP_TITLE, APP_DESCRIPTION, APP_VERSION, CORS_SETTINGS

app = FastAPI(
    title=APP_TITLE,
    description=APP_DESCRIPTION,
    version=APP_VERSION
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    **CORS_SETTINGS
)

# Include routers
app.include_router(concepts_router)

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "First Principles Backend API"}

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}