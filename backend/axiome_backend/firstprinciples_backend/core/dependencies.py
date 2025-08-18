from typing import Optional

from qdrant_client import QdrantClient
from qdrant_client.models import Document

from .config import EMBEDDING_MODEL_NAME, QDRANT_HOST, QDRANT_PORT


class QdrantRetriever:
    """A class to handle document retrieval from a Qdrant vector database."""

    def __init__(self, host: str = QDRANT_HOST, port: int = QDRANT_PORT):
        """Initialize the Qdrant client."""
        self.client = QdrantClient(host=host, port=port)

    def search_similar_chunks(
        self, query: str, collection_name: str, limit: int = 5
    ) -> list[dict]:
        """
        Search for similar chunks in the vector database using a text query.
        Qdrant will handle the embedding of the query.
        """
        self.client.get_collections()  # Ensure collection exists

        print(f"Searching in collection '{collection_name}' for query: {query}")
        search_results = self.client.query_points(
            collection_name=collection_name,
            query=Document(text=query, model=EMBEDDING_MODEL_NAME),
            limit=limit,
        )

        print(f"Found {len(search_results.points)} results.")

        results = []
        for result in search_results.points:
            payload = result.payload or {}
            results.append(
                {
                    "id": result.id,
                    "score": result.score,
                    "text": payload.get("text", ""),
                    "metadata": {k: v for k, v in payload.items() if k != "text"},
                }
            )

        return results


# Global instance to be initialized on startup
qdrant_retriever: Optional[QdrantRetriever] = None


def get_qdrant_retriever() -> QdrantRetriever:
    """Dependency injector for the QdrantRetriever."""
    if qdrant_retriever is None:
        raise RuntimeError("QdrantRetriever is not initialized. Check lifespan event.")
    return qdrant_retriever
