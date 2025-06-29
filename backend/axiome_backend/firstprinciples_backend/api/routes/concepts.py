"""API routes for concept-related endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/concepts", tags=["concepts"])


class MessageRequest(BaseModel):
    """Request model for receiving messages from frontend."""
    message: str


@router.post("/message")
async def receive_message(request: MessageRequest):
    """Receive a message from the frontend and log it."""
    print(f"Received message from frontend: {request.message}")
    
    return {
        "status": "success",
        "received_message": request.message,
        "response": "Message received and logged"
    }