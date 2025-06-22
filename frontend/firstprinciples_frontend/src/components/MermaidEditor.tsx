"use client";

import React, { useState } from "react";

interface MermaidEditorProps {
  onUpdate: (mermaidCode: string) => void;
}

const MermaidEditor: React.FC<MermaidEditorProps> = ({ onUpdate }) => {
  const [mermaidCode, setMermaidCode] = useState(`flowchart TD
    A[Start] --> B{Is it?};
    B -- Yes --> C[OK];
    C --> D[Rethink];
    D --> A;
    B -- No --> E[End];`);

  const handleUpdateClick = () => {
    onUpdate(mermaidCode);
  };

  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Mermaid Input</h2>
      <textarea
        value={mermaidCode}
        onChange={(e) => setMermaidCode(e.target.value)}
        style={{
          height: "200px",
          width: "100%",
          fontFamily: "monospace",
          fontSize: "16px",
        }}
        aria-label="Mermaid Input"
      />
      <button onClick={handleUpdateClick} style={{ padding: "10px", backgroundColor: "lightgray", cursor:"pointer"}}>
        Update Excalidraw
      </button>
    </div>
  );
};

export default MermaidEditor;