import json
from typing import Any

from langchain.chat_models import init_chat_model

from .lesson_state import LessonState


def normalize_content_to_str(content: Any) -> str:
    """
    Normalize LangChain response content to a string.

    LangChain responses can have content that is str | list[str | dict] | dict.
    This function converts any content type to a stable string representation.
    """
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for item in content:
            if isinstance(item, str):
                parts.append(item)
            elif isinstance(item, dict):
                # Try to extract text from common dict keys
                text = item.get("text") or item.get("content") or item.get("message")
                parts.append(text if isinstance(text, str) else json.dumps(item))
            else:
                parts.append(str(item))
        return "\n\n".join(parts)
    if isinstance(content, dict):
        # Try to extract text from common dict keys
        text = content.get("text") or content.get("content") or content.get("message")
        return text if isinstance(text, str) else json.dumps(content)
    return str(content)


# TODO: Choose imported model based on config
llm = init_chat_model("google_genai:gemini-2.5-flash", temperature=0)

fast_llm = init_chat_model("google_genai:gemini-2.5-flash-lite", temperature=0)


async def plan_lesson(state: LessonState) -> LessonState:
    """
    Generates a detailed lesson plan based on the initial topic.
    This is the first step in our pipeline.
    """

    print("--- Planning Lesson ---")
    # TODO: Error handling for missing state keys
    topic = state["topic"]
    context = state["context"]

    # TODO: Improve prompt, add to PromptTemplate
    prompt = f"""You are an expert computer science professor
    specializing in data structures and algorithms,
    with a talent for making complex topics easy to understand for developers.
    Include the following sections only:
    * High-level overview (1-3 sentences)
    * Key definitions (2-3 bullet points)
    * Specific learning objectives (1-3 bullet points)
    * Example plan (plan a simple example pulled from the context - 3-5 sentences).
    Create a detailed lesson plan for the topic,
    it should be a creative idea to help create first principles knowledge: {topic}.
    Use the following context to guide your plan: {context}
    """

    if "research_notes" in state and state["research_notes"]:
        prompt += f"""Use the following research notes
        to enhance your plan:
        Additional research notes: {state['research_notes']}"""

    response = await llm.ainvoke(prompt)
    state["lesson_plan"] = normalize_content_to_str(response.content)
    print("Lesson Plan Generated.")
    return state


async def research(state: LessonState) -> LessonState:
    """
    Conducts research based on the lesson plan to gather additional facts and context.
    This step enriches the content of the lesson.
    """

    print("--- Conducting Research ---")
    # TODO: Error handling for missing state keys
    topic = state["topic"]
    # lesson_plan = state['lesson_plan']
    context = state["context"]

    prompt = f"""Based on the topic '{topic}' and the given context,
    generate some additional research notes
    to enrich the lesson.\n\nCONTEXT:\n{context}"""

    response = await llm.ainvoke(prompt)
    state["research_notes"] = normalize_content_to_str(response.content)

    print("Research Notes Generated.")
    return state


async def generate_example(state: LessonState) -> LessonState:
    """
    Creates a practical, step-by-step example based on the lesson plan and research.
    """

    print("--- Generating Example ---")
    # TODO: Error handling for missing state keys
    topic = state["topic"]
    lesson_plan = state["lesson_plan"]

    prompt = f"""Create a creative,
    step-by-step walkthrough example for the topic '{topic}'.
    Use an engaging and informative tone.
    Don't dive too deep into the technical details,
    but provide enough context for developers to understand the key concepts.
    The example should be simple and relatable, using a maximum of 6 nodes in a graph.
    Follow the guide laid out by the lesson plan
    to make the example clear and comprehensive.\n\nLESSON PLAN:\n{lesson_plan}"""

    response = await llm.ainvoke(prompt)
    state["example"] = normalize_content_to_str(response.content)

    print("Example Generated.")
    return state


async def generate_diagram(state: LessonState) -> LessonState:
    """
    Creates a visual diagram to illustrate the key concepts of the lesson.
    """

    print("--- Generating Diagram ---")
    # TODO: Error handling for missing state keys
    example = state["example"]

    # test_prompt = f"""You are a graph generator.
    # Your task is to produce an adjacency list for a random undirected graph.

    # ### Constraints:
    # - Each node should be listed once in the adjacency list.
    # - No self-loops are allowed.
    # - No duplicate edges (if A is connected to B,
    # then B should also list A, and it should not be listed again).

    # ### Output Format:
    # A: <comma-separated list of connected nodes>
    # B: <comma-separated list of connected nodes>
    # ...

    # ### Example Output:
    # A: B, C, D
    # B: A, E
    # C: A
    # D: A, E
    # E: B, D
    # """
    # TODO: change order of diagram generation to be before example generation

    prompt = f"""Extract the adjacency list from the graph used
    in the following example walkthrough.
    Do not include any additional text, only provide the adjacency list.

    ### Output Format:
    A: <comma-separated list of connected nodes>
    B: <comma-separated list of connected nodes>
    ...

    ### Example Output:
    A: B, C, D
    B: A, E
    C: A
    D: A, E
    E: B, D

    ### Example Walkthrough to Extract From:
    {example}
    """

    # TODO: Structured output for diagram generation
    response = await fast_llm.ainvoke(prompt)
    state["diagram"] = normalize_content_to_str(response.content)

    print("Diagram Generated.")
    return state


async def consolidate(state: LessonState) -> LessonState:
    """
    Consolidates all generated content into a final output.
    This is the last step in the lesson planning pipeline.
    """

    print("--- Consolidating Outputs ---")

    topic = state["topic"]
    lesson_plan = state["lesson_plan"]
    example = state["example"]
    # diagram = state['diagram']

    prompt = f"""
    Consolidate the following components into a single,
    coherent markdown document for a lesson about '{topic}'.

    Organize the output with the following sections:
    1.  **Lesson Overview**: Use the lesson plan.
    This should be a brief introduction to the topic,
    you can shorten it to 1-2 sentences.
    2.  **Step-by-Step Example**: Use the example walkthrough.

    Here is the content:

    ## Lesson Plan
    {lesson_plan}

    ## Walkthrough Example
    {example}
    """

    response = await fast_llm.ainvoke(prompt)

    state["final_output"] = normalize_content_to_str(response.content)
    print("Consolidation Complete.")
    return state
