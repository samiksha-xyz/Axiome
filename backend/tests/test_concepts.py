import json
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from axiome_backend.firstprinciples_backend.app import app
from axiome_backend.firstprinciples_backend.core.dependencies import (
    QdrantRetriever,
    get_qdrant_retriever,
)

client = TestClient(app)


@pytest.fixture
def mock_qdrant_retriever():
    """Fixture to mock the QdrantRetriever dependency."""
    mock = MagicMock(spec=QdrantRetriever)
    mock.search_similar_chunks.return_value = [
        {"text": "context 1"},
        {"text": "context 2"},
    ]
    return mock


def override_get_qdrant_retriever(mock):
    """Dependency override for QdrantRetriever."""

    def _override():
        return mock

    return _override


@patch("google.genai.Client")
def test_receive_message_success(mock_genai_client, mock_qdrant_retriever):
    """Test the happy path for receive_message."""
    # Arrange
    app.dependency_overrides[get_qdrant_retriever] = override_get_qdrant_retriever(
        mock_qdrant_retriever
    )

    mock_response = MagicMock()
    mock_response.text = json.dumps(
        {
            "concept_name": "Test Concept",
            "explanation": "Test explanation.",
            "mermaid_diagram": "graph TD; A-->B;",
            "code_example": "const a = 1;",
            "next_step_prompt": "Next step.",
        }
    )
    mock_genai_client.return_value.models.generate_content.return_value = mock_response

    request_data = {"message": "Test message"}

    # Act
    response = client.post("/api/concepts/message", json=request_data)

    # Assert
    assert response.status_code == 200
    response_json = response.json()
    assert response_json["status"] == "success"
    assert response_json["gemini_response"]["concept_name"] == "Test Concept"

    # Clean up dependency overrides
    app.dependency_overrides = {}


@patch("google.genai.Client")
def test_receive_message_gemini_api_failure(mock_genai_client, mock_qdrant_retriever):
    """Test receive_message when the Gemini API raises an exception."""
    # Arrange
    app.dependency_overrides[get_qdrant_retriever] = override_get_qdrant_retriever(
        mock_qdrant_retriever
    )

    mock_genai_client.return_value.models.generate_content.side_effect = Exception(
        "Gemini API Error"
    )

    request_data = {"message": "Test message"}

    # Act
    response = client.post("/api/concepts/message", json=request_data)

    # Assert
    assert response.status_code == 200
    response_json = response.json()
    assert response_json["status"] == "error"
    assert response_json["error"] == "Gemini API Error"
    assert response_json["error_type"] == "Exception"

    # Clean up dependency overrides
    app.dependency_overrides = {}


@patch("google.genai.Client")
def test_receive_message_malformed_json(mock_genai_client, mock_qdrant_retriever):
    """Test receive_message with a malformed JSON response from Gemini."""
    # Arrange
    app.dependency_overrides[get_qdrant_retriever] = override_get_qdrant_retriever(
        mock_qdrant_retriever
    )

    mock_response = MagicMock()
    mock_response.text = "this is not json"
    mock_genai_client.return_value.models.generate_content.return_value = mock_response

    request_data = {"message": "Test message"}

    # Act
    response = client.post("/api/concepts/message", json=request_data)

    # Assert
    assert response.status_code == 200
    response_json = response.json()
    assert response_json["status"] == "error"
    assert response_json["error"] == "Invalid JSON response from Gemini"
    assert response_json["raw_response"] == "this is not json"

    # Clean up dependency overrides
    app.dependency_overrides = {}


@patch("google.genai.Client")
def test_receive_message_empty_response(mock_genai_client, mock_qdrant_retriever):
    """Test receive_message with an empty response from Gemini."""
    # Arrange
    app.dependency_overrides[get_qdrant_retriever] = override_get_qdrant_retriever(
        mock_qdrant_retriever
    )

    mock_response = MagicMock()
    mock_response.text = None
    mock_genai_client.return_value.models.generate_content.return_value = mock_response

    request_data = {"message": "Test message"}

    # Act
    response = client.post("/api/concepts/message", json=request_data)

    # Assert
    assert response.status_code == 200
    response_json = response.json()
    assert response_json["status"] == "error"
    assert response_json["error"] == "Empty response from Gemini"

    # Clean up dependency overrides
    app.dependency_overrides = {}


def test_receive_message_qdrant_failure(mock_qdrant_retriever):
    """Test receive_message when Qdrant retrieval fails."""
    # Arrange
    mock_qdrant_retriever.search_similar_chunks.side_effect = Exception("Qdrant Error")
    app.dependency_overrides[get_qdrant_retriever] = override_get_qdrant_retriever(
        mock_qdrant_retriever
    )

    request_data = {"message": "Test message"}

    # Act
    response = client.post("/api/concepts/message", json=request_data)

    # Assert
    assert response.status_code == 200
    response_json = response.json()
    assert response_json["status"] == "error"
    assert "Qdrant Error" in response_json["error"]
    assert response_json["error_type"] == "Exception"

    # Clean up dependency overrides
    app.dependency_overrides = {}
