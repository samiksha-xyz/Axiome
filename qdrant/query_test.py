from markitdown import MarkItDown
from qdrant_processor import QdrantDocumentProcessor

COLLECTION_NAME = "first_principles"

def main():
    processor = QdrantDocumentProcessor()
    
    # # Get collection info
    info = processor.get_collection_info(COLLECTION_NAME)
    print(f"Collection info: {info}")
    
    # # Example search
    print("\nSearching for 'backtracking'...")
    results = processor.search_similar_chunks(
         query="backtracking",
         collection_name=COLLECTION_NAME,
         limit=3
     )

    for i, result in enumerate(results, 1):
        print(f"\nResult {i} (Score: {result['score']:.3f}):")
        print(f"Text: {result['text'][:100]}...")

if __name__ == "__main__":
    main()