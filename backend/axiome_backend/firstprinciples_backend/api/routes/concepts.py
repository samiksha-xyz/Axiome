"""API routes for concept-related endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel
from ...core.config import GEMINI_API_KEY  
import google.generativeai as genai
import json
import time

# Configure Gemini client at module level
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

router = APIRouter(prefix="/api/concepts", tags=["concepts"])


class MessageRequest(BaseModel):
    """Request model for receiving messages from frontend."""
    message: str


@router.post("/message")
async def receive_message(request: MessageRequest):
    """Receive a message from the frontend and log it."""
    print(f"Received message from frontend: {request.message}")

    prompt = get_prompt(request.message)
    gemini_response = await call_gemini_api(prompt)
    if gemini_response.get("status") == "error":
        return {
            "status": "error",
            "error": gemini_response.get("error", "Unknown error"),
            "processing_time": gemini_response.get("processing_time", 0)
        }
    
    print(f"Gemini response: {gemini_response.get('gemini_response', 'No response')}")

    return {
        "status": "success",
        "gemini_response": gemini_response.get("gemini_response"),
        "processing_time": gemini_response.get("processing_time", 0)
    }
    
    # return {
    #     "status": "success",
    #     "received_message": request.message,
    #     "response": "Message received and logged"
    # }

# TODO: Implement specific instructions for each concept type outside of the overall prompt.
def get_prompt(message: str) -> str:
    """Generate a prompt based on the user's message."""
    prompt = f"""
    You are an expert computer science professor specializing in data structures and algorithms, 
    with a talent for making complex topics easy to understand for developers. 
    Your task is to teach me graph algorithms, one concept at a time, starting with the absolute fundamentals. 
    I will be parsing your responses to display them in a custom frontend learning application, 
    so you must follow the specified format precisely. For this lesson, please explain the concept: {message}.
    Provide your entire response as a single, clean JSON object. The JSON must have the following keys:

    {{
        "concept_name": "A string containing the title of the current concept.",
        "explanation": "A clear, concise explanation of the concept, its components (like vertices and edges), and the difference between directed and undirected graphs. Use markdown for formatting.",
        "mermaid_diagram": "A string containing valid Mermaid.js 'graph TD' syntax for a simple diagram that illustrates the concept. This diagram must be renderable in a tool like Excalidraw.",
        "code_example": "A simple pseudo-code or JavaScript example representing the graph, preferably using an adjacency list.",
        "next_step_prompt": "A string containing the exact prompt I should use for the next logical lesson in this learning series."
    }}
    """
    return prompt


async def call_gemini_api(prompt: str) -> dict:
    """Call the Gemini API with the given prompt."""
    start_time = time.time()
    
    try:
        # Configure generation parameters for consistent JSON output
        generation_config = {
            "temperature": 0.1,  # Lower temperature for more consistent JSON
            "max_output_tokens": 2000,
            "response_mime_type": "application/json"
        }
        
        # Send prompt to Gemini
        response = model.generate_content(
            prompt,
            generation_config=generation_config
        )
        
        # Parse response as JSON
        try:
            gemini_response = json.loads(response.text)
        except json.JSONDecodeError as e:
            return {
                "status": "error",
                "error": "Invalid JSON response from Gemini",
                "raw_response": response.text,
                "processing_time": time.time() - start_time
            }
        
        # Return structured response
        return {
            "status": "success",
            "gemini_response": gemini_response,
            "processing_time": time.time() - start_time
        }
        
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "error_type": type(e).__name__,
            "processing_time": time.time() - start_time
        }