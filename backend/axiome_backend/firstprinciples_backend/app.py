"""FastAPI application for firstprinciples backend."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.routes.concepts import router as concepts_router
from .core import dependencies
from .core.config import APP_DESCRIPTION, APP_TITLE, APP_VERSION, CORS_SETTINGS


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize Qdrant retriever on startup."""
    print("Initializing Qdrant retriever...")
    dependencies.qdrant_retriever = dependencies.QdrantRetriever()
    print("Qdrant retriever initialized.")

    print("Testing Qdrant connection...")
    try:
        # Try a simple operation to test connectivity
        qdrant_client = dependencies.qdrant_retriever.client
        collections = qdrant_client.get_collections()
        coll_count = len(collections.collections)
        print(f"Qdrant connection successful! Found {coll_count} collections.")

        # Try to get info about the first_principles collection specifically
        try:
            collection_info = qdrant_client.get_collection("first_principles")
            count = collection_info.points_count
            print(f"Collection 'first_principles' exists with {count} points.")
        except Exception as e:
            print(f"Collection 'first_principles' not found or error accessing it: {e}")

    except Exception as e:
        #TODO: Better error handling - disable qdrant retriever if connection fails to prevent further errors
        print(f"Qdrant connection test failed: {e}")

    yield
    print("Closing application resources.")


app = FastAPI(
    title=APP_TITLE, description=APP_DESCRIPTION, version=APP_VERSION, lifespan=lifespan
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_SETTINGS["allow_origins"],
    allow_credentials=CORS_SETTINGS["allow_credentials"],
    allow_methods=CORS_SETTINGS["allow_methods"],
    allow_headers=CORS_SETTINGS["allow_headers"],
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
