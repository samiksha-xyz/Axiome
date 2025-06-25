"use client";

import React from "react";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Axiome" }) => {
  return (
    <header
      style={{
        backgroundColor: "#2d3748", // Dark grey
        color: "white",
        padding: "1rem 2rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #4a5568",
        margin: 0,
      }}
    >
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              margin: 0,
              color: "white",
            }}
          >
            {title}
          </h1>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Navigation items can be added here */}
          <span
            style={{
              fontSize: "0.875rem",
              color: "#a0aec0",
              fontWeight: "500",
            }}
          >
            Mermaid to Excalidraw Converter
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
