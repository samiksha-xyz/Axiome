"use client";

import React, { useState } from "react";

interface AdjacencyListProps {
  onUpdate: (adjList: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * Parses a string representation of an adjacency list into a Map.
 *
 * The input string should contain one vertex per line, with the format:
 * `vertex: neighbor1, neighbor2, ...`
 * Lines without a colon or empty lines are ignored.
 *
 * @param input - The adjacency list as a string, where each line represents a vertex and its comma-separated neighbors.
 * @returns A Map where each key is a vertex and the value is an array of its neighboring vertices.
 * 
 * TODO: Handle multi-word vertex names (e.g., "Node A: Node B, Node C")
 * TODO: More lax syntax - correctly generate vertices separately if they are not explicitly listed 
 * and onlyprovided in an edge
 * TODO: Write tests
 * TODO: Add edge weights or properties (e.g., "A: B(2), C(3)")
 * TODO: Add multiple edges between the same vertices?
 * TODO: Enforce undirected graph semantics, i.e., if A connects to B, B should also connect to A?
 */

function parseAdjacencyList(input: string): Map<string, string[]> {
  const lines = input.trim().split('\n');
  const adjacencyMap = new Map<string, string[]>();
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue; // Skip empty lines
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue; // Skip malformed lines
    
    const vertex = trimmedLine.substring(0, colonIndex).trim();
    const connectionsStr = trimmedLine.substring(colonIndex + 1).trim();
    
    // Parse comma-separated connections
    const connections = connectionsStr
      .split(',')
      .map(conn => conn.trim())
      .filter(conn => conn.length > 0);
    
    adjacencyMap.set(vertex, connections);
  }
  
  return adjacencyMap;
}

/**
 * Generates a Mermaid.js undirected graph definition from an adjacency map.
 *
 * Each edge is represented only once, regardless of direction, by sorting the vertex names.
 * The resulting string can be used directly in Mermaid diagrams to visualize the graph.
 *
 * @param adjacencyMap - A Map where each key is a vertex and the value is an array of connected vertices.
 * @returns A string containing the Mermaid.js graph definition in undirected format.
 */

function generateMermaidUndirected(adjacencyMap: Map<string, string[]>): string {
  const edges = new Set<string>(); // Use Set to avoid duplicates
  
  for (const [vertex, connections] of adjacencyMap) {
    for (const connection of connections) {
      // Sort vertices to create consistent edge representation
      const sortedEdge = [vertex, connection].sort().join(' --- ');
      edges.add(sortedEdge);
    }
  }
  
  const nodeDefinitions = Array.from(adjacencyMap.keys()).map(vertex => `    ${vertex}[[${vertex}]]`).join('\n');
  return `graph TD\n${Array.from(edges).map(edge => `    ${edge}`).join('\n')}\n${nodeDefinitions}`;
}

/**
 * Generates a Mermaid.js directed graph definition (flowchart) in text format
 * from a given adjacency map.
 *
 * @param adjacencyMap - A Map where each key is a vertex (string) and its value is an array of connected vertices (strings).
 * @returns A string containing the Mermaid.js syntax for a directed graph (top-down layout).
 */

function generateMermaidDirected(adjacencyMap: Map<string, string[]>): string {
  const edges: string[] = [];
  
  for (const [vertex, connections] of adjacencyMap) {
    for (const connection of connections) {
      edges.push(`    ${vertex} --> ${connection}`);
    }
  }
  
  const nodeDefinitions = Array.from(adjacencyMap.keys()).map(vertex => `    ${vertex}[[${vertex}]]`).join('\n');
  return `graph TD\n${edges.join('\n')}\n${nodeDefinitions}`;
}

// Main conversion function
function adjacencyListToMermaid(input: string, isDirected: boolean = false): string {
  const adjacencyMap = parseAdjacencyList(input);
  
  if (isDirected) {
    return generateMermaidDirected(adjacencyMap);
  } else {
    return generateMermaidUndirected(adjacencyMap);
  }
}

const AdjacencyList: React.FC<AdjacencyListProps> = ({ onUpdate, value, onChange }) => {
  const [adjList, setadjList] = useState(value || ``);
  const [isDirected, setIsDirected] = useState(false);

  // Update internal state when external value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setadjList(value);
    }
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setadjList(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleUpdateClick = (directed: boolean) => {
    const mermaidSyntax = adjacencyListToMermaid(adjList, directed);
    onUpdate(mermaidSyntax);
  };

  return (
    <div style={{ 
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "16px",
      height: "100%",
      backgroundColor: "#f8fafc"
    }}>
      <h2 style={{
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#2d3748",
        margin: 0,
        marginBottom: "4px"
      }}>
        Adjacency List Editor
      </h2>
      <textarea
        value={adjList}
        onChange={(e) => handleInputChange(e.target.value)}
        style={{
          height: "300px",
          width: "100%",
          fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
          fontSize: "14px",
          resize: "vertical",
          overflow: "auto",
          whiteSpace: "pre",
          lineHeight: "1.5",
          caretColor: "#2d3748",
          outline: "none",
          border: "2px solid #e2e8f0",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "white",
          color: "#2d3748",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        aria-label="Adjacency List Input"
        spellCheck={false}
        placeholder={`A: B, C, D\nB: A, D\nC: D\nD: B`}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#4299e1";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        }}
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <button 
          onClick={() => handleUpdateClick(false)} 
          style={{ 
            padding: "12px 24px",
            backgroundColor: "#4299e1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            flex: 1
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#3182ce";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#4299e1";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
          }}
        >
          Generate Undirected Diagram
        </button>
        <button 
          onClick={() => handleUpdateClick(true)} 
          style={{ 
            padding: "12px 24px",
            backgroundColor: "#48bb78",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s ease",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            flex: 1
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#38a169";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#48bb78";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
          }}
        >
          Generate Directed Diagram
        </button>
      </div>
    </div>
  );
};

export default AdjacencyList;