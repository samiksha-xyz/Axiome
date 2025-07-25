"""API routes for concept-related endpoints."""

import json
import time

from fastapi import APIRouter, Depends
from google import genai
from google.genai import types
from pydantic import BaseModel

from ...core.config import GEMINI_API_KEY, QDRANT_COLLECTION_NAME
from ...core.dependencies import QdrantRetriever, get_qdrant_retriever

router = APIRouter(prefix="/api/concepts", tags=["concepts"])


class MessageRequest(BaseModel):
    """Request model for receiving messages from frontend."""

    message: str


class GeminiResponse(BaseModel):
    """Response model for Gemini API."""

    concept_name: str
    explanation: str
    mermaid_diagram: str
    code_example: str
    next_step_prompt: str


@router.post("/message")
async def receive_message(
    request: MessageRequest,
    qdrant_retriever: QdrantRetriever = Depends(get_qdrant_retriever),
):
    """Receive a message from the frontend and log it."""
    print(f"Received message from frontend: {request.message}")
    start_time = time.time()

    # Retrieve context from Qdrant
    try:
        context = retrieve_context(request.message, qdrant_retriever)
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "error_type": type(e).__name__,
            "processing_time": time.time() - start_time,
        }
    print(f"Retrieved context: {context}")

    prompt = get_prompt(request.message, context)

    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
        model = "gemini-2.5-flash"
        system_instruction = """You are an expert computer science professor
        specializing in data structures and algorithms,
        with a talent for making complex topics easy to understand for developers."""

        config = types.GenerateContentConfig(
            temperature=0.1,
            max_output_tokens=2000,
            response_mime_type="application/json",
            system_instruction=system_instruction,
            thinking_config=types.ThinkingConfig(thinking_budget=0),
            response_schema=GeminiResponse,
        )

        response = client.models.generate_content(
            model=model, contents=prompt, config=config
        )

        # Parse response as JSON
        try:
            if response.text is None:
                return {
                    "status": "error",
                    "error": "Empty response from Gemini",
                    "raw_response": None,
                    "processing_time": time.time() - start_time,
                }
            gemini_response = json.loads(response.text)
        except json.JSONDecodeError:
            return {
                "status": "error",
                "error": "Invalid JSON response from Gemini",
                "raw_response": response.text,
                "processing_time": time.time() - start_time,
            }

        # Return structured response
        return {
            "status": "success",
            "gemini_response": gemini_response,
            "processing_time": time.time() - start_time,
        }

    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "error_type": type(e).__name__,
            "processing_time": time.time() - start_time,
        }


# TODO: Implement specific instructions for each concept type
def get_prompt(message: str, context: str) -> str:
    """Generate a prompt based on the user's message and retrieved context."""
    prompt = f"""
    Based on the following context, your task is to teach me graph algorithms,
    one concept at a time, starting with the absolute fundamentals.
    I will be parsing your responses
    to display them in a custom frontend learning application,
    so you must follow the specified format precisely.

    Context:
    {context}

    For this lesson, please explain the concept: {message}.

    Provide your entire response as a single, clean JSON object.
    The JSON must have the following keys:
    {{
        "concept_name":
            "A string containing the title of the current concept.",
        "explanation":
            "A clear, concise explanation of the concept,
            its components (like vertices and edges),
            and the difference between directed and undirected graphs.
            Use markdown for formatting.",
        "mermaid_diagram":
            "A string containing valid Mermaid.js 'graph TD' syntax
            for a simple diagram that illustrates the concept.
            This diagram must be renderable in a tool like Excalidraw.",
        "code_example":
            "A simple pseudo-code or JavaScript example representing the graph,
            preferably using an adjacency list.",
        "next_step_prompt":
            "A string containing the exact prompt I should use
            for the next logical lesson in this learning series."
    }}
    """
    return prompt


def retrieve_context(message: str, retriever: QdrantRetriever) -> str:
    """Retrieve context for the given message using Qdrant."""

    search_results = retriever.search_similar_chunks(
        query=message,
        collection_name=QDRANT_COLLECTION_NAME,
        limit=3,  # Adjust the number of results as needed
    )

    # Format the results into a single string for the prompt
    context = "\n".join([result["text"] for result in search_results])

    return context
