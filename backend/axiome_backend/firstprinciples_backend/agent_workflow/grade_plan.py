from pydantic import BaseModel, Field
from typing import Literal
from .lesson_state import LessonState
from langchain_google_genai import GoogleGenerativeAI

GRADE_PROMPT = (
    "You are a grader assessing quality of an algorithms lesson plan to a specified topic.  \n "
    "Here is the topic and related context:  \n\n {topic} \n\n {context} \n\n"
    "Here is the lesson plan: {lesson_plan} \n"
    "If the lesson plan contains keyword(s) or semantic meaning related to the topic, grade it as relevant. \n"
    "Give a binary score 'yes' or 'no' score to indicate whether the lesson plan is relevant and useful to the topic."
)

class GradeLesson(BaseModel):
    """Grade lesson plan using a binary score for relevance check."""

    binary_score: str = Field(
        description="Relevance score: 'yes' if relevant, or 'no' if not relevant."
    )


def grade_plan(state: LessonState) -> Literal["research", "generate_example"]:
    """Determine whether additional research is needed for the lesson plan."""
    # TODO: Error handling for missing state keys
    topic = state['topic']
    context = state['context']
    lesson_plan = state['lesson_plan']

    prompt = GRADE_PROMPT.format(topic=topic, context=context, lesson_plan=lesson_plan)