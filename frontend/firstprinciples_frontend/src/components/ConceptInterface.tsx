"use client";

import React from "react";

const ConceptInterface: React.FC = () => {
  const handleButtonClick = (buttonIndex: number) => {
    console.log(`Button ${buttonIndex + 1} clicked`);
    // You can add functionality here later
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
      {[...Array(5)].map((_, index) => (
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
          Button {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ConceptInterface;
