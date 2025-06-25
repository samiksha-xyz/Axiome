"use client"; 
import "@excalidraw/excalidraw/index.css";
import React, { useRef, useCallback } from "react";
import MermaidEditor from "../components/MermaidEditor";
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
      <div style={{ display: "flex", flex: 1, height: "calc(100vh - 74px)" }}>
        {/* Left box */}
        <div style={{ flex: 1, borderRight: "1px solid #ccc", overflow: "hidden", display: "flex" }}>
          <ExcalidrawWrapper ref={excalidrawWrapperRef} />
        </div>
        <div style={{ flex: 1 }}>
          {/* Right box */}
          <MermaidEditor onUpdate={handleUpdateDiagram} />
        </div>
      </div>
    </div>
  );
}