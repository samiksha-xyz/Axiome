"use client";

import React, { useState, useImperativeHandle, forwardRef } from "react";
import "@excalidraw/excalidraw/index.css";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";


const ExcalidrawWrapper = forwardRef((props, ref) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

  // Imperative Handle for parent communication
  useImperativeHandle(ref, () => ({
    updateScene: (newElements: ExcalidrawElement[]) => {
      if (excalidrawAPI) {
        excalidrawAPI.updateScene({
          elements: newElements,
        });
        
        // Center on the scene after updating with smooth animation
        // Use a small delay to ensure the scene is fully updated before scrolling
        setTimeout(() => {
          excalidrawAPI.scrollToContent(newElements, {
            fitToContent: true,
            animate: true,
            duration: 500,
          });
        }, 100);
      }
    },
  }));

  return (
    <Excalidraw
      excalidrawAPI={(api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api)}
      viewModeEnabled={true}
      zenModeEnabled={true}>
      <MainMenu>
        <MainMenu.Item onSelect={() => window.alert("TODO Custom Toolbar")}>
          Item1
        </MainMenu.Item>
        <MainMenu.Item onSelect={() => window.alert("TODO Custom Toolbar")}>
          Item 2
        </MainMenu.Item>
      </MainMenu>
    </Excalidraw>
  );
});

ExcalidrawWrapper.displayName = "ExcalidrawWrapper";

export default ExcalidrawWrapper;