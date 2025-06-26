"use client";

import React, { useState } from "react";
import MermaidEditor from "./MermaidEditor";
import ConceptInterface from "./ConceptInterface";
import AdjacencyList from "./AdjacencyList";

interface TextInterfaceProps {
  onUpdate: (mermaidCode: string) => void;
}

const TextInterface: React.FC<TextInterfaceProps> = ({ onUpdate }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { id: 0, label: "Mermaid", content: "mermaid" },
    { id: 1, label: "Concepts", content: "concepts" },
    { id: 2, label: "Adjacency List", content: "adjList" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <MermaidEditor onUpdate={onUpdate} />;
      case 1:
        return <ConceptInterface />;
      case 2:
        return <AdjacencyList onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "none",
              backgroundColor: activeTab === tab.id ? "white" : "transparent",
              color: activeTab === tab.id ? "#2d3748" : "#718096",
              fontWeight: activeTab === tab.id ? "600" : "400",
              cursor: "pointer",
              borderBottom: activeTab === tab.id ? "2px solid #4299e1" : "2px solid transparent",
              transition: "all 0.2s ease",
              fontSize: "14px",
            }}
            onMouseOver={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = "#edf2f7";
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TextInterface;
