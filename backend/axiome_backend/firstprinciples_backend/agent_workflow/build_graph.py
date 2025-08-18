from langgraph.graph import END, START, StateGraph

from .grade_plan import grade_plan
from .graph_nodes import (
    consolidate,
    generate_diagram,
    generate_example,
    plan_lesson,
    research,
)
from .lesson_state import LessonState


def build_graph():
    """
    Builds the state graph for the lesson planning workflow.
    This graph defines the sequence of steps to generate a lesson plan.
    """

    workflow = StateGraph(LessonState)

    workflow.add_node("plan_lesson", plan_lesson)
    workflow.add_node("research", research)
    workflow.add_node("generate_example", generate_example)
    workflow.add_node("generate_diagram", generate_diagram)
    workflow.add_node("consolidate", consolidate)

    workflow.add_edge(START, "plan_lesson")
    workflow.add_conditional_edges(
        "plan_lesson",
        grade_plan,
    )
    workflow.add_edge("research", "plan_lesson")
    workflow.add_edge("generate_example", "generate_diagram")
    workflow.add_edge("generate_diagram", "consolidate")
    workflow.add_edge("consolidate", END)

    chain = workflow.compile()
    return chain
