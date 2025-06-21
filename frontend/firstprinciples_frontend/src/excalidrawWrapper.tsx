"use client";
import { Excalidraw, convertToExcalidrawElements, MainMenu } from "@excalidraw/excalidraw";

import "@excalidraw/excalidraw/index.css";

const excalidrawWrapper: React.FC = () => {
    const initialData = {
        elements: convertToExcalidrawElements([
            {
                type: "rectangle",
                id: "rect-1",
                width: 186.47265625,
                height: 141.9765625,
                x: 500,
                y: 500,
            },
        ]),
    };
  
  return (
    <div style={{height:"100%", width: "100%"}}>
      <Excalidraw viewModeEnabled={true} zenModeEnabled={true} initialData={initialData}>
        <MainMenu>
          <MainMenu.Item onSelect={() => window.alert("TODO Custom Toolbar")}>
            Item1
          </MainMenu.Item>
          <MainMenu.Item onSelect={() => window.alert("TODO Custom Toolbar")}>
            Item 2
          </MainMenu.Item>
        </MainMenu>
      </Excalidraw>

    </div>
  );
};
export default excalidrawWrapper;