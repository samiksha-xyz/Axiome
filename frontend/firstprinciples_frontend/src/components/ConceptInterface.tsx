"use client";

import React, { useState } from "react";

const API_URL = "http://localhost:8000"; // TODO import from .env.local or .env.development

interface ConceptData {
  concept_name: string;
  explanation: string;
  mermaid_diagram?: string;
  code_example?: string;
  next_step_prompt?: string;
}

const ConceptInterface: React.FC = () => {
  const buttonTitles = [
    "What is a Graph?",
    "Graph Representations", 
    "Graph Traversal",
    "Traversal Types"
  ];

  const [conceptData, setConceptData] = useState<ConceptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleButtonClick = async (buttonIndex: number) => {
    console.log(`Button "${buttonTitles[buttonIndex]}" clicked`);
    setIsLoading(true);
    setConceptData(null); // Clear previous data
    
    try {
      const response = await fetch(`${API_URL}/api/concepts/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: buttonTitles[buttonIndex] }),
      });
      
      
      // Check if HTTP response is successful before parsing JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      
      if (data.status === "success") {
        console.log("Processing time:", data.processing_time);
        console.log("Concept Name:", data.gemini_response.concept_name);
        console.log("Explanation:", data.gemini_response.explanation);
        
        // Update UI with the received data
        setConceptData(data.gemini_response);
      } else {
        console.error("API Error:", data.error);
      }

    } catch (error) {
      console.error("Error fetching concept:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        padding: "20px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "20px",
        height: "100%",
        alignItems: "stretch"
      }}
    >
      {/* Button Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {buttonTitles.map((title, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            disabled={isLoading}
            style={{
              padding: "16px 20px",
              backgroundColor: isLoading ? "#f7fafc" : "white",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "500",
              color: "#2d3748",
              transition: "all 0.2s ease",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              opacity: isLoading ? 0.6 : 1,
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "#f7fafc";
                e.currentTarget.style.borderColor = "#cbd5e0";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseDown={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseUp={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }
            }}
          >
            {isLoading ? "Loading..." : title}
          </button>
        ))}
      </div>

      {/* Content Display Section */}
      {isLoading && (
        <div style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          textAlign: "center",
          color: "#6c757d"
        }}>
          Loading concept...
        </div>
      )}

      {conceptData && !isLoading && (
        <div style={{
          padding: "24px",
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          maxHeight: "60vh",
          overflowY: "auto"
        }}>
          <h2 style={{
            margin: "0 0 16px 0",
            fontSize: "24px",
            fontWeight: "600",
            color: "#1a202c",
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: "12px"
          }}>
            {conceptData.concept_name}
          </h2>
          
          <div style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#2d3748",
            whiteSpace: "pre-wrap"
          }}>
            {conceptData.explanation}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptInterface;
