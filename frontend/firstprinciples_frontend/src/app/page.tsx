"use client"; 
import "@excalidraw/excalidraw/index.css";
import React, { useRef, useCallback } from "react";
import TextInterface from "../components/TextInterface";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";

const ExcalidrawWrapper = dynamic(
  async () => (await import("../components/excalidrawWrapper")).default,
  {
    ssr: false,
    loading: () => <div style={{ padding: "20px" }}>Loading Editor...</div>,
  },
);

// Define the shape of the ref object that ExcalidrawWrapper will expose
interface ExcalidrawWrapperRef {
  updateScene: (newElements: ExcalidrawElement[]) => void;
}

export default function Page() {
  const excalidrawWrapperRef = useRef<ExcalidrawWrapperRef>(null);

  // Callback to handle Mermaid code updates
  const handleUpdateDiagram = useCallback(async (mermaidCode: string) => {
    if (!excalidrawWrapperRef.current) {
      return;
    }

    try {
      const { parseMermaidToExcalidraw } = await import(
        "@excalidraw/mermaid-to-excalidraw"
      );
      const { convertToExcalidrawElements } = await import(
        "@excalidraw/excalidraw"
      );
      // Parse the Mermaid code to Excalidraw elements
      const { elements: parsedElements } = await parseMermaidToExcalidraw(
        mermaidCode
      );
      const FONT_SIZE = 20;
      const styledElements = parsedElements.map((element) => {
        if (element.fontSize) {
          return { ...element, fontSize: FONT_SIZE };
        }
        return element;
      });

      // Call the updateScene method on the child component via the ref to update the Excalidraw canvas
      excalidrawWrapperRef.current.updateScene(
        convertToExcalidrawElements(styledElements)
      );
    } catch (error) {
      console.error("Error converting Mermaid to Excalidraw:", error);
      window.alert("Invalid Mermaid syntax. Please check the console for details.");
    }
  }, []); 

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header/Navbar */}
      <Header title="Axiome" />
      
      {/* Main content area with light grey background */}
      <div 
        style={{ 
          flex: 1, 
          backgroundColor: "#f7f7f7", // Light grey background
          padding: "20px", // Add spacing from page boundaries
          display: "flex",
          gap: "20px", // Space between left and right boxes
          height: "calc(100vh - 94px)" // Adjusted for header height + padding
        }}
      >
        {/* Left box */}
        <div 
          style={{ 
            flex: 1, 
            backgroundColor: "white",
            borderRadius: "12px", // Curved corners
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            overflow: "hidden", 
            display: "flex",
            border: "1px solid #e2e8f0" // Light border
          }}
        >
          <ExcalidrawWrapper ref={excalidrawWrapperRef} />
        </div>
        
        {/* Right box */}
        <div 
          style={{ 
            flex: 1,
            backgroundColor: "white",
            borderRadius: "12px", // Curved corners
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
            overflow: "hidden",
            border: "1px solid #e2e8f0" // Light border
          }}
        >
          <TextInterface onUpdate={handleUpdateDiagram} />
        </div>
      </div>
    </div>
  );
}