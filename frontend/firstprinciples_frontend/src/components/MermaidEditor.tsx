"use client";

import React, { useState, useEffect } from "react";

interface MermaidEditorProps {
  onUpdate: (mermaidCode: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

const MermaidEditor: React.FC<MermaidEditorProps> = ({ onUpdate, value, onChange }) => {
  const [mermaidCode, setMermaidCode] = useState(value || `graph TD;\n`);

  // Update internal state when external value changes
  useEffect(() => {
    if (value !== undefined) {
      setMermaidCode(value);
    }
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setMermaidCode(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleUpdateClick = () => {
    onUpdate(mermaidCode);
  };

  return (
    <div style={{ 
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "16px",
      height: "100%",
      backgroundColor: "#f8fafc"
    }}>
      <h2 style={{
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#2d3748",
        margin: 0,
        marginBottom: "4px"
      }}>
        Mermaid Diagram Editor
      </h2>
      <textarea
        value={mermaidCode}
        onChange={(e) => handleInputChange(e.target.value)}
        style={{
          height: "300px",
          width: "100%",
          fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
          fontSize: "14px",
          resize: "vertical",
          overflow: "auto",
          whiteSpace: "pre",
          lineHeight: "1.5",
          caretColor: "#2d3748",
          outline: "none",
          border: "2px solid #e2e8f0",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "white",
          color: "#2d3748",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        aria-label="Mermaid Input"
        spellCheck={false}
        placeholder="Enter your Mermaid diagram syntax here..."
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#4299e1";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        }}
      />
      <button 
        onClick={handleUpdateClick} 
        style={{ 
          padding: "12px 24px",
          backgroundColor: "#4299e1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.2s ease",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          alignSelf: "flex-start"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#3182ce";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#4299e1";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        }}
      >
        Update Diagram
      </button>
    </div>
  );
};

export default MermaidEditor;