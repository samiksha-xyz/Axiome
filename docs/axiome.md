# Axiome System Architecture (v1)

This document presents the Axiome architecture using the C4 model: Context, Container, Component, and Code diagrams. Each diagram is rendered in Mermaid for clarity and professionalism.

---

## 1. System Context Diagram

```mermaid
flowchart TD
    User["User"]
    FE["Axiome Frontend"]
    BE["Axiome FastAPI Backend"]
    LangGraph["LangGraph Agent"]
    Supabase["Supabase (Postgres, Auth, Session)"]
    Qdrant["Qdrant (Vector DB, RAG Grounding Data)"]
    Redis["Redis (User Learning Patterns)"]
    subgraph LLMs["LLMs (Gemini, etc.)"]
        LLM1["LLM Instance 1"]
        LLM2["LLM Instance 2"]
        LLMn["LLM Instance n"]
    end

    User -- "(1) Submit Query" --> FE
    FE -- "(2) Auth/Session" <--> Supabase
    FE -- "(3) Retrieve Grounding Data" <--> Qdrant
    FE -- "(4) Augmented Query" --> BE
    BE -- "(5) Route Query" --> LangGraph
    LangGraph -- "(6) Access User Learning Patterns" --- Redis
    LangGraph -- "(7) Spawn LLMs for Research" --> LLM1
    LangGraph -- "(7) Spawn LLMs for Research" --> LLM2
    LangGraph -- "(7) Spawn LLMs for Research" --> LLMn
    LLM1 -- "(8) Research Results" --> LangGraph
    LLM2 -- "(8) Research Results" --> LangGraph
    LLMn -- "(8) Research Results" --> LangGraph
    LangGraph -- "(9) Compose Response" --> BE
    BE -- "(10) Return Response" --> FE
    FE -- "(11) Display Response" --> User
```

---

## 2. Container Diagram

```mermaid
flowchart LR
    subgraph Frontend
        FE["Axiome Frontend (React/Vue/SPA)"]
    end
    subgraph Backend
        BE["FastAPI Backend"]
        LangGraph["LangGraph Agent"]
    end
    subgraph DataStores
        Supabase["Supabase (Postgres, Auth, Session)"]
        Qdrant["Qdrant (Vector DB, RAG)"]
        Redis["Redis (Learning Patterns)"]
    end
    subgraph LLMs["LLMs"]
        LLM1["LLM Instance 1"]
        LLM2["LLM Instance 2"]
        LLMn["LLM Instance n"]
    end

    FE <--> Supabase
    FE <--> Qdrant
    FE --> BE
    BE --> LangGraph
    LangGraph --- Redis
    LangGraph --> LLM1
    LangGraph --> LLM2
    LangGraph --> LLMn
    LLM1 --> LangGraph
    LLM2 --> LangGraph
    LLMn --> LangGraph
    LangGraph --> BE
    BE --> FE
```

---

## 3. Component Diagrams

### 3.1 Frontend Component Diagram

```mermaid
flowchart TD
    FE["Axiome Frontend (SPA)"]
    UI["UI Components (Chat, Dashboard, Settings, etc.)"]
    AuthFE["Auth Handler"]
    QueryAugFE["Query Augmentation Module"]
    APIClient["API Client (Backend Communication)"]
    State["State Management (Redux/Pinia/Vuex)"]
    Grounding["Grounding Data Handler"]
    SessionFE["Session Manager"]

    FE --> UI
    FE --> AuthFE
    FE --> QueryAugFE
    FE --> APIClient
    FE --> State
    FE --> Grounding
    FE --> SessionFE

    UI --> State
    AuthFE --> SessionFE
    QueryAugFE --> Grounding
    APIClient --> AuthFE
    APIClient --> QueryAugFE
    APIClient --> State
```

### 3.2 Backend Component Diagram

```mermaid
flowchart TD
    BE["FastAPI Backend"]
    APIRouter["API Router"]
    AuthBE["Auth Module"]
    SessionBE["Session Manager"]
    QueryAugBE["Query Augmentation"]
    LangGraph["LangGraph Agent"]
    Redis["Redis Handler"]
    Qdrant["Qdrant Handler"]
    Supabase["Supabase Handler"]
    UserProfile["User Profile Service"]
    Logging["Logging & Monitoring"]

    BE --> APIRouter
    APIRouter --> AuthBE
    APIRouter --> SessionBE
    APIRouter --> QueryAugBE
    APIRouter --> LangGraph
    APIRouter --> UserProfile
    APIRouter --> Logging

    LangGraph --> Redis
    LangGraph --> Qdrant
    LangGraph --> Supabase
    LangGraph --> QueryAugBE
    LangGraph --> Logging
```

---

## 4. Code/Sequence Diagram (User Query Flow)

```mermaid
sequenceDiagram
    participant User
    participant FE as Axiome Frontend
    participant BE as FastAPI Backend
    participant LG as LangGraph Agent
    participant LLM as LLM(s)
    participant Redis as Redis
    participant Qdrant as Qdrant

    User->>FE: (1) Submit Query
    FE->>Supabase: (2) Auth/Session
    FE->>Qdrant: (3) Retrieve Grounding Data
    FE->>BE: (4) Augmented Query
    BE->>LG: (5) Route Query
    LG->>Redis: (6) Access User Learning Patterns
    LG->>LLM: (7) Spawn LLMs for Research
    LLM-->>LG: (8) Research Results
    LG->>BE: (9) Compose Response
    BE->>FE: (10) Return Response
    FE->>User: (11) Display Response
```

---

**Legend:**  
- Each diagram is numbered and labeled for clarity.  
- Interactions are clearly marked and sequenced.  
- Components and data stores are visually grouped for readability.
