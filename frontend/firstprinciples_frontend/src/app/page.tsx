"use client";
import dynamic from "next/dynamic";


// Since client components get prerenderd on server as well hence importing
// the excalidraw stuff dynamically with ssr false

const ExcalidrawWrapper = dynamic(
  async () => (await import("../excalidrawWrapper")).default,
  {
    ssr: false,
  },
);

export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
      {/* Header */}
      <h1 style={{ textAlign: "center", margin: 0, padding: "10px", backgroundColor: "lightgray" }}>Excalidraw Test</h1>

      {/* Main content area */}
      <div style={{ display: "flex", flex: 1}}>

        {/* Left sidebar with Excalidraw */}
        <div style={{flex: 1, borderRight: "1px solid #ccc", padding: "10px", overflow: "hidden"}}>
          <ExcalidrawWrapper />
        </div>

        {/* Right sidebar with chat box */}
        <div style={{flex: 1, padding: "10px", backgroundColor: "lightgray"}}></div>
      </div>
    </div>
  );
}
