# Axiome Architecture/Design Decisions
Breakdown of the various design decisions and architecture used to build Axiome.

## Frontend
The frontend is built with next.js, using TypeScript and React to design the user interface. There are two primary components, the whiteboard and the text interface.

### Whiteboard
The whiteboard is where algorithm visualizations like graph traversals can be rendered. It's built using the Excalidraw API, using a simplified version of Excalidraw with less features than the web app. To render diagrams like graph visualizations, the mermaid-to-excalidraw library is used to convert structured Mermaid into renderable graphs on the Excalidraw whiteboard.

### Text Interface
The text interface has three tabs: the Mermaid editor, the adjacency list editor, and the chat interface.
