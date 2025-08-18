from typing import Literal

from langchain.chat_models import init_chat_model
from pydantic import BaseModel, Field

from .lesson_state import LessonState

GRADE_PROMPT = (
    "You are a grader assessing quality \n"
    "of an algorithms lesson plan to a specified topic.  \n"
    "Here is the topic and related context:  \n\n {topic} \n\n {context} \n\n"
    "Here is the lesson plan: {lesson_plan} \n"
    "If the lesson plan contains keyword(s) or semantic meaning related to the topic,\n"
    "grade it as relevant.\n"
    "Give a binary score 'yes' or 'no' score,\n"
    "to indicate whether the lesson plan is relevant and useful to the topic."
)


class GradeLesson(BaseModel):
    """Grade lesson plan using a binary score for relevance check."""

    binary_score: str = Field(
        description="Relevance score: 'yes' if relevant, or 'no' if not relevant."
    )


# TODO: Choose imported model based on config
grader_model = init_chat_model("google_genai:gemini-2.5-flash-lite", temperature=0)


async def grade_plan(state: LessonState) -> Literal["research", "generate_example"]:
    """Determine whether additional research is needed for the lesson plan."""
    # TODO: Error handling for missing state keys
    topic = state["topic"]
    context = state["context"]
    lesson_plan = state["lesson_plan"]

    prompt = GRADE_PROMPT.format(topic=topic, context=context, lesson_plan=lesson_plan)
    response = await grader_model.with_structured_output(GradeLesson).ainvoke(prompt)

    # Handle union type from structured output (dict | BaseModel)
    if isinstance(response, dict):
        score = response.get("binary_score")
    elif isinstance(response, BaseModel):
        score = getattr(response, "binary_score", None)
    else:
        raise TypeError("Unexpected response type from grader_model")

    if not isinstance(score, str):
        raise ValueError("grader_model response missing valid 'binary_score'")

    if score.lower() == "yes":
        return "generate_example"
    else:
        return "research"
