"use client";

import React, { useState } from "react";

interface AdjacencyListProps {
  onUpdate: (adjList: string) => void;
}

const AdjacencyList: React.FC<AdjacencyListProps> = ({ onUpdate }) => {
  const [adjList, setadjList] = useState(``);

  const handleUpdateClick = () => {
    onUpdate(adjList);
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
        Adjacency List Editor
      </h2>
      <textarea
        value={adjList}
        onChange={(e) => setadjList(e.target.value)}
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
        aria-label="Adjacency List Input"
        spellCheck={false}
        placeholder={`A: B, C, D\nB: A, D\nC: D\nD: B`}
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

export default AdjacencyList;