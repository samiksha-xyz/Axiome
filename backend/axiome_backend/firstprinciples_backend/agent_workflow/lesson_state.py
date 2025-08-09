from typing import TypedDict, Optional #, List

class LessonState(TypedDict):
    """
    Represents the state of a lesson in the agent workflow.

    Attributes:
     - topic: The provided topic for the lesson.
     - lesson_plan: The detailed lesson plan.
     - research_notes: Optional additional research notes about the topic.
     - example: A walkthrough example of the main concept. 
     - diagram: An adjacency list visualizing the concept.
     - final_output: The consolidated, final markdown output.
    """

    topic: str
    lesson_plan: str
    research_notes: Optional[str]
    example: str
    diagram: str #Dict[str, List[str]]?
    final_output: str