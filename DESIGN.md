# Axiome Architecture/Design Decisions
Breakdown of the various design decisions and architecture used to build Axiome. The current version is tailored towards teaching the fundamentals of graph algorithms. 

## Frontend
The frontend is built with Next.js, using TypeScript and React to design the user interface. There are two primary components, the whiteboard and the text interface.

### Whiteboard
The whiteboard is where data structure visualizations like graphs can be rendered. It's built using the Excalidraw API, using a simplified version of Excalidraw. To render diagrams like graph visualizations, the mermaid-to-excalidraw library is used to convert structured Mermaid into renderable graphs on the Excalidraw whiteboard.

### Text Interface
The text interface has three tabs: the Mermaid editor, the adjacency list editor, and the chat interface. 
- Mermaid Editor - allows for direct access to the shapes and diagrams on the Excalidraw whiteboard. This allows for more direct control over what appears on the screen, but is less useful when it comes to quickly generating graphs or other data structures.
- Adjacency List Editor - allows for quick graph visualization without the need for prior Mermaid experience. After inputting an adjacency list, the input is parsed and converted into a Mermaid diagram, which is then rendered on the Excalidraw whiteboard. Either a undirected or directed graph can be rendered.
- Chat Interface - primary interface for interacting with the AI system in the backend. The user inputs a question or query, which makes a fetch API call to the backend, where the query is processed. The backend returns a text response to the chat interface that walks through a short lesson, and updates the Excalidraw whiteboard to help visualize the lesson.





## Backend
The backend is built with FastAPI, using Python to route user queries from the frontend.
