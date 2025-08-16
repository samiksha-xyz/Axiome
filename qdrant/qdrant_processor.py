import uuid
from typing import List, Optional
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, CollectionInfo, Document
from sentence_transformers import SentenceTransformer
from langchain_text_splitters import RecursiveCharacterTextSplitter
from markitdown import MarkItDown

# Configuration constants
QDRANT_HOST = "localhost"
QDRANT_PORT = 6333
DEFAULT_COLLECTION_NAME = "documents"
EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
VECTOR_SIZE = 384  # Vector dimension for all-MiniLM-L6-v2 model
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

class QdrantDocumentProcessor:
    """A class to handle document chunking and embedding into Qdrant vector database."""
    
    def __init__(self, host: str = QDRANT_HOST, port: int = QDRANT_PORT):
        """Initialize the Qdrant client and embedding model."""
        self.client = QdrantClient(host=host, port=port)
        self.embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            length_function=len,
            separators=["\n\n", "\n", " ", ""]
        )
    
    def _create_collection_if_not_exists(self, collection_name: str) -> None:
        """Create a collection in Qdrant if it doesn't already exist."""
        try:
            # Check if collection exists
            self.client.get_collection(collection_name)
            print(f"Collection '{collection_name}' already exists.")
        except Exception:
            # Collection doesn't exist, create it
            self.client.create_collection(
                collection_name=collection_name,
                vectors_config=VectorParams(
                    size=VECTOR_SIZE,
                    distance=Distance.COSINE
                )
            )
            print(f"Created collection '{collection_name}' with vector size {VECTOR_SIZE}")
    
    def _chunk_document(self, document: str) -> List[str]:
        """Split the document into smaller chunks."""
        chunks = self.text_splitter.split_text(document)
        print(f"Document split into {len(chunks)} chunks")
        return chunks
    
    def _embed_chunks(self, chunks: List[str]) -> List[List[float]]:
        """Convert text chunks into embeddings."""
        embeddings = self.embedding_model.encode(chunks, convert_to_tensor=False)
        print(f"Generated embeddings for {len(chunks)} chunks")
        return embeddings.tolist()
    
    def process_and_embed_document(
        self, 
        document: str, 
        collection_name: str = DEFAULT_COLLECTION_NAME,
        metadata: Optional[dict] = None
    ) -> List[str]:
        """
        Main function to chunk a document and embed it into Qdrant.
        
        Args:
            document (str): The document text to process
            collection_name (str): Name of the Qdrant collection
            metadata (dict, optional): Additional metadata to store with each chunk
            
        Returns:
            List[str]: List of point IDs that were inserted
        """
        print(f"Processing document of {len(document)} characters...")
        
        # Step 1: Ensure collection exists
        self._create_collection_if_not_exists(collection_name)
        
        # Step 2: Chunk the document
        chunks = self._chunk_document(document)
        
        # Step 3: Generate embeddings
        embeddings = self._embed_chunks(chunks)
        
        # Step 4: Prepare points for insertion
        points = []
        point_ids = []
        
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            point_id = str(uuid.uuid4())
            point_ids.append(point_id)
            
            # Prepare payload (metadata)
            payload = {
                "text": chunk,
                "chunk_index": i,
                "total_chunks": len(chunks)
            }
            
            # Add any additional metadata
            if metadata:
                payload.update(metadata)
            
            point = PointStruct(
                id=point_id,
                vector=embedding,
                payload=payload
            )
            points.append(point)
        
        # Step 5: Insert points into Qdrant
        self.client.upsert(
            collection_name=collection_name,
            points=points
        )
        
        print(f"Successfully inserted {len(points)} chunks into collection '{collection_name}'")
        return point_ids
    
    def search_similar_chunks(
        self, 
        query: str, 
        collection_name: str = DEFAULT_COLLECTION_NAME,
        limit: int = 5,
        score_threshold: float = 0.5
    ) -> List[dict]:
        """
        Search for similar chunks in the vector database.
        
        Args:
            query (str): The search query
            collection_name (str): Name of the Qdrant collection
            limit (int): Maximum number of results to return
            score_threshold (float): Minimum similarity score threshold
            
        Returns:
            List[dict]: List of similar chunks with scores and metadata
        """
        # Generate embedding for the query
        # query_embedding = self.embedding_model.encode([query])[0].tolist()
        
        # Search in Qdrant
        search_results = self.client.query_points(
            collection_name=collection_name,
            query=Document(text=query, model=EMBEDDING_MODEL_NAME),
            limit=limit,
            # score_threshold=score_threshold
        )
        
        # Format results
        results = []
        for result in search_results.points:
            results.append({
                "id": result.id,
                "score": result.score,
                "text": result.payload.get("text", ""),
                "metadata": {k: v for k, v in result.payload.items() if k != "text"}
            })
        
        return results
    
    def get_collection_info(self, collection_name: str = DEFAULT_COLLECTION_NAME) -> dict:
        """Get information about a collection."""
        try:
            info = self.client.get_collection(collection_name)
            return {
                "name": collection_name,
                "points_count": info.points_count,
                "vector_size": info.config.params.vectors.size,
                "distance": info.config.params.vectors.distance
            }
        except Exception as e:
            return {"error": str(e)}


# Convenience function for simple use cases
def process_and_embed_document(
    document: str, 
    collection_name: str = DEFAULT_COLLECTION_NAME,
    metadata: Optional[dict] = None
) -> List[str]:
    """
    Convenience function to process and embed a document.
    
    Args:
        document (str): The document text to process
        collection_name (str): Name of the Qdrant collection
        metadata (dict, optional): Additional metadata to store with each chunk
        
    Returns:
        List[str]: List of point IDs that were inserted
    """
    processor = QdrantDocumentProcessor()
    return processor.process_and_embed_document(document, collection_name, metadata)


if __name__ == "__main__":
    import argparse
    import os
    import sys

    parser = argparse.ArgumentParser(
        description="Convert a document to markdown and embed chunks into a Qdrant collection."
    )
    parser.add_argument("input_path", help="Path to document to convert (e.g. docs/dfs.txt)")
    parser.add_argument("-c", "--collection", default="first_principles", help="Qdrant collection name")
    # parser.add_argument("--source", default="Robot Room Cleaner DFS Solution", help="metadata source")
    # parser.add_argument("--topic", default="DFS Example", help="metadata topic")
    parser.add_argument("--host", default=QDRANT_HOST, help="Qdrant host")
    parser.add_argument("--port", type=int, default=QDRANT_PORT, help="Qdrant port")
    args = parser.parse_args()

    DOC_TO_CONVERT = args.input_path
    COLLECTION_NAME = args.collection
    # METADATA = {"source": args.source, "topic": args.topic}

    if not os.path.exists(DOC_TO_CONVERT):
        print(f"Error: input file not found: {DOC_TO_CONVERT}", file=sys.stderr)
        sys.exit(2)

    print("Starting MarkItDown...")
    md = MarkItDown()
    print(f"Converting document to markdown: {DOC_TO_CONVERT}")
    try:
        result = md.convert(DOC_TO_CONVERT)
    except Exception as e:
        print(f"MarkItDown conversion failed: {e}", file=sys.stderr)
        sys.exit(3)

    processor = QdrantDocumentProcessor(host=args.host, port=args.port)

    print("Processing document...")
    point_ids = processor.process_and_embed_document(
         document=result.text_content,
         collection_name=COLLECTION_NAME,
        #  metadata=METADATA
    )

    print(f"Inserted points with IDs: {point_ids[:3]}...")

    info = processor.get_collection_info(COLLECTION_NAME)
    print(f"Collection info: {info}")

    print("\nSearching for 'backtracking'...")
    results = processor.search_similar_chunks(
         query="backtracking",
         collection_name=COLLECTION_NAME,
         limit=3
     )

    for i, result in enumerate(results, 1):
        print(f"\nResult {i} (Score: {result['score']:.3f}):")
        print(f"Text: {result['text'][:100]}...")
