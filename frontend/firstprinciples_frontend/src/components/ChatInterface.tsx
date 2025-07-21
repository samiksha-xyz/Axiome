"use client";

import React, { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:8000"; // TODO import from .env.local or .env.development

interface ConceptData {
  concept_name: string;
  explanation: string;
  mermaid_diagram?: string;
  code_example?: string;
  next_step_prompt?: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  conceptData?: ConceptData;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/concepts/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.gemini_response.explanation,
          conceptData: data.gemini_response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: `Error: ${data.error}`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div 
      style={{ 
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#f8f9fa"
      }}
    >
      {/* Chat Messages Area */}
      <div 
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        {messages.length === 0 && (
          <div style={{
            textAlign: "center",
            color: "#6c757d",
            fontSize: "16px",
            marginTop: "40px"
          }}>
            Ask me anything about concepts! Try questions like "What is a Graph?" or "Explain recursion"
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: "8px"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: "18px",
                backgroundColor: message.type === 'user' ? "#007bff" : "white",
                color: message.type === 'user' ? "white" : "#2d3748",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                border: message.type === 'assistant' ? "1px solid #e2e8f0" : "none"
              }}
            >
              {message.type === 'user' ? (
                <div style={{ fontSize: "15px", lineHeight: "1.4" }}>
                  {message.content}
                </div>
              ) : (
                <div>
                  {message.conceptData && (
                    <div style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      marginBottom: "12px",
                      color: "#1a202c",
                      borderBottom: "1px solid #e2e8f0",
                      paddingBottom: "8px"
                    }}>
                      {message.conceptData.concept_name}
                    </div>
                  )}
                  <div style={{
                    fontSize: "15px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-wrap"
                  }}>
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "8px"
          }}>
            <div style={{
              padding: "12px 16px",
              borderRadius: "18px",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              color: "#6c757d"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#6c757d",
                  animation: "pulse 1.5s ease-in-out infinite"
                }}></div>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#6c757d",
                  animation: "pulse 1.5s ease-in-out infinite 0.3s"
                }}></div>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#6c757d",
                  animation: "pulse 1.5s ease-in-out infinite 0.6s"
                }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: "20px",
        backgroundColor: "white",
        borderTop: "1px solid #e2e8f0",
        display: "flex",
        gap: "12px",
        alignItems: "flex-end"
      }}>
        <div style={{ flex: 1 }}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about any concept..."
            disabled={isLoading}
            style={{
              width: "100%",
              minHeight: "44px",
              maxHeight: "120px",
              padding: "12px 16px",
              border: "2px solid #e2e8f0",
              borderRadius: "22px",
              fontSize: "15px",
              resize: "none",
              outline: "none",
              fontFamily: "inherit",
              backgroundColor: isLoading ? "#f8f9fa" : "white",
              color: "#2d3748"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007bff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
            }}
          />
        </div>
        <button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          style={{
            padding: "12px 24px",
            backgroundColor: (!inputValue.trim() || isLoading) ? "#e2e8f0" : "#007bff",
            color: (!inputValue.trim() || isLoading) ? "#a0aec0" : "white",
            border: "none",
            borderRadius: "22px",
            fontSize: "15px",
            fontWeight: "500",
            cursor: (!inputValue.trim() || isLoading) ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            minWidth: "80px",
            height: "44px"
          }}
          onMouseOver={(e) => {
            if (!(!inputValue.trim() || isLoading)) {
              e.currentTarget.style.backgroundColor = "#0056b3";
            }
          }}
          onMouseOut={(e) => {
            if (!(!inputValue.trim() || isLoading)) {
              e.currentTarget.style.backgroundColor = "#007bff";
            }
          }}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% {
            opacity: 0.3;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
