from .lesson_state import LessonState
from langchain.chat_models import init_chat_model

# TODO: Choose imported model based on config
llm = init_chat_model(
    "google_genai:gemini-2.5-flash", temperature=0
)

async def plan_lesson(state: LessonState) -> LessonState:
    """
    Generates a detailed lesson plan based on the initial topic.
    This is the first step in our pipeline.
    """

    print("--- Planning Lesson ---")
    #TODO: Error handling for missing state keys
    topic = state['topic']

    #TODO: Improve prompt, add to PromptTemplate
    prompt = f"""You are an expert computer science professor
    specializing in data structures and algorithms,
    with a talent for making complex topics easy to understand for developers.
    Include the following sections only: 
    * High-level overview (1-3 sentences) 
    * Key definitions (2-3 bullet points)
    * Specific learning objectives (1-3 bullet points)
    * Example plan (plan a simple example pulled from the context - 3-5 sentences).
    Create a detailed lesson plan for the topic: {topic}.
    Use the following context to guide your plan: {context} 
    """

    if 'research_notes' in state and state['research_notes']:
        prompt += f"Use the following research notes to enhance your plan: \n\nAdditional research notes: {state['research_notes']}"

    response = llm.ainvoke(prompt)
    state['lesson_plan'] = response.content
    print("Lesson Plan Generated.")
    return state

async def research(state: LessonState) -> LessonState:
    """
    Conducts research based on the lesson plan to gather additional facts and context.
    This step enriches the content of the lesson.
    """

    print("--- Conducting Research ---")
    # TODO: Error handling for missing state keys
    topic = state['topic']
    lesson_plan = state['lesson_plan']

    context = "" # Placeholder for context retrieval logic

    prompt = f"Based on the topic '{topic}' and the given context, generate some additional research notes to enrich the lesson.\n\CONTEXT:\n{context}"

    response = llm.ainvoke(prompt)
    state['research_notes'] = response.content

    print("Research Notes Generated.")
    return state

async def generate_example(state: LessonState) -> LessonState:
    """
    Creates a practical, step-by-step example based on the lesson plan and research.
    """

    print("--- Generating Example ---")
   # TODO: Error handling for missing state keys
   topic = state['topic']
   lesson_plan = state['lesson_plan']

    prompt = f"""Create a detailed, step-by-step walkthrough example for the topic '{topic}'. 
    Use an engaging and informative tone. Use maximum size of n = 5 for the input in your example.
    Follow the guide laid out by the lesson plan to make the example clear and comprehensive.\n\nLESSON PLAN:\n{lesson_plan}"""
    
    response = llm.ainvoke(prompt)
    state['example'] = response.content

    print("Example Generated.")
    return state

async def generate_diagram(state: LessonState) -> LessonState:
    """
    Creates a visual diagram to illustrate the key concepts of the lesson.
    """

    print("--- Generating Diagram ---")
    # TODO: Error handling for missing state keys
    example = state['example']

    prompt = f"""Extract the adjacency list from the graph used in the following example. 
    Use the following format:
    A: B, C, D
    B: A, E
    C: A
    D: A, E
    E: B, D
    
    EXAMPLE:
    {example}
    """

    # TODO: Structured output for diagram generation
    response = llm.ainvoke(prompt)
    state['diagram'] = response.content

    print("Diagram Generated.")
    return state

async def consolidate(state: LessonState) -> LessonState:
    """
    Consolidates all generated content into a final output.
    This is the last step in the lesson planning pipeline.
    """

    print("--- Consolidating Outputs ---")

    topic = state['topic']
    lesson_plan = state['lesson_plan']
    research_notes = state['research_notes'] if 'research_notes' in state else "No research generated."
    example = state['example']
    diagram = state['diagram']
    
    prompt = f"""
    Consolidate the following components into a single, coherent markdown document for a lesson about '{topic}'.

    Organize the output with the following sections:
    1.  **Lesson Overview**: Use the lesson plan.
    2.  **Additional Insights**: Use the research notes.
    3.  **Step-by-Step Example**: Use the example walkthrough.
    4.  **Visual Diagram**: Embed the adjacency list here.

    Here is the content:

    ## Lesson Plan
    {lesson_plan}

    ## Research Notes
    {research_notes}

    ## Walkthrough Example
    {example}

    ## Diagram
    {diagram}
    """
    
    response = llm.ainvoke(prompt)
    
    state['final_output'] = response.content
    print("Consolidation Complete.")
    return state