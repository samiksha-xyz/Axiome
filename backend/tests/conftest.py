import pytest
from unittest.mock import patch

@pytest.fixture(autouse=True)
def setup_env_vars(monkeypatch):
    """Setup environment variables for testing and disable .env file loading."""
    # Patch dotenv.load_dotenv to prevent loading the .env file during tests
    with patch('dotenv.load_dotenv'):
        # Set test environment variables
        monkeypatch.setenv("GEMINI_API_KEY", "test-key")
        monkeypatch.setenv("QDRANT_COLLECTION_NAME", "test-collection")
        yield
