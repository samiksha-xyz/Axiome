"use client";

import React from "react";

const API_URL = "http://localhost:8000"; // TODO import from .env.local or .env.development

const ConceptInterface: React.FC = () => {
  const buttonTitles = [
    "What is a Graph?",
    "Graph Representations", 
    "Graph Traversal",
    "Traversal Types"
  ];

  const handleButtonClick = async (buttonIndex: number) => {
    console.log(`Button "${buttonTitles[buttonIndex]}" clicked`);
    try {
      const response = await fetch(`${API_URL}/api/concepts/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: buttonTitles[buttonIndex] }),
      });
      
      console.log("Response status:", response.status);
      
      // Parse the JSON response
      const data = await response.json();
      console.log("Full response data:", data);
      
      if (data.status === "success") {
        console.log("Gemini response:", data.gemini_response);
        console.log("Processing time:", data.processing_time);
        // You can now access the structured data:
        // data.gemini_response.concept_name
        // data.gemini_response.explanation
        // data.gemini_response.mermaid_diagram
        // data.gemini_response.code_example
        // data.gemini_response.next_step_prompt
      } else {
        console.error("API Error:", data.error);
      }

    } catch (error) {
      console.error("Error fetching concept:", error);
      throw error;
    }
  };

  return (
    <div 
      style={{ 
        padding: "20px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "12px",
        height: "100%",
        alignItems: "stretch"
      }}
    >
      {buttonTitles.map((title, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          style={{
            padding: "16px 20px",
            backgroundColor: "white",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
            color: "#2d3748",
            transition: "all 0.2s ease",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#f7fafc";
            e.currentTarget.style.borderColor = "#cbd5e0";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.1)";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default ConceptInterface;
