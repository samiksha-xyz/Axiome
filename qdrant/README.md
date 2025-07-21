# Qdrant Document Processing

This directory contains the setup and code for running a local Qdrant vector database and processing documents for semantic search.

## Setup

### 1. Start Qdrant Database

First, start the Qdrant database using Docker Compose:

```bash
cd qdrant
docker-compose up -d
```

This will start Qdrant on:
- HTTP API: `http://localhost:6333`
- gRPC API: `http://localhost:6334`
- Web UI: `http://localhost:6333/dashboard`

### 2. Install Python Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage

The main function `process_and_embed_document()` takes a document as input, chunks it, and embeds it into the vector database:

```python
from qdrant_processor import process_and_embed_document

# Simple usage
document = "Your document text here..."
point_ids = process_and_embed_document(document)
```

### Advanced Usage with Class

For more control, use the `QdrantDocumentProcessor` class:

```python
from qdrant_processor import QdrantDocumentProcessor

# Initialize processor
processor = QdrantDocumentProcessor()

# Process document with metadata
point_ids = processor.process_and_embed_document(
    document="Your document text here...",
    collection_name="my_documents",
    metadata={"source": "book", "author": "John Doe"}
)

# Search for similar content
results = processor.search_similar_chunks(
    query="search query",
    collection_name="my_documents",
    limit=5
)

# Get collection information
info = processor.get_collection_info("my_documents")
print(f"Collection has {info['points_count']} chunks")
```

### Running the Example

Run the included example to test the setup:

```bash
python qdrant_processor.py
```

This will:
1. Process a sample AI document
2. Create embeddings and store them in Qdrant
3. Perform a search query
4. Display the results

## Configuration

You can modify these constants in `qdrant_processor.py`:

- `QDRANT_HOST`: Qdrant server host (default: "localhost")
- `QDRANT_PORT`: Qdrant server port (default: 6333)
- `EMBEDDING_MODEL_NAME`: Sentence transformer model (default: "all-MiniLM-L6-v2")
- `CHUNK_SIZE`: Text chunk size in characters (default: 1000)
- `CHUNK_OVERLAP`: Overlap between chunks (default: 200)

## Features

### Document Chunking
- Uses LangChain's `RecursiveCharacterTextSplitter`
- Configurable chunk size and overlap
- Preserves semantic boundaries

### Embeddings
- Uses Sentence Transformers for high-quality embeddings
- Default model: `all-MiniLM-L6-v2` (384-dimensional vectors)
- Fast and efficient encoding

### Vector Storage
- Automatic collection creation
- Cosine similarity for vector comparison
- Metadata storage with each chunk

### Search Capabilities
- Semantic similarity search
- Configurable result limits and score thresholds
- Rich metadata retrieval

## Troubleshooting

### Qdrant Connection Issues
- Ensure Docker container is running: `docker-compose ps`
- Check logs: `docker-compose logs qdrant`
- Verify port availability: `netstat -an | grep 6333`

### Memory Issues
- The sentence transformer model will be downloaded on first use (~90MB)
- Ensure sufficient RAM for embedding large documents
- Consider using a smaller model like `all-MiniLM-L12-v2` for resource-constrained environments

### Performance Tips
- Process documents in batches for better performance
- Use GPU acceleration if available (install `torch` with CUDA support)
- Consider using a more powerful embedding model for better accuracy
