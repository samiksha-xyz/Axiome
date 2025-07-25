import os


def pytest_configure(config):
    """
    Set environment variables before test collection.
    """
    os.environ["GEMINI_API_KEY"] = "test-key"
    os.environ["QDRANT_COLLECTION_NAME"] = "test-collection"
