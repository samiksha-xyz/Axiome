# Axiome Algorithm Tutor - Product Requirements Document

## Product Vision
Create an interactive algorithm learning platform that teaches computational thinking from first principles through a 4-stage progressive mastery system, enabling deep understanding rather than rote memorization.

## User Personas

**Primary Learner**: Computer science students, self-taught programmers, and professionals seeking deep algorithmic understanding
**Secondary Learner**: Educators looking for visual teaching tools

## Core Learning Philosophy
- **First Principles Thinking**: Break down complex algorithms to fundamental concepts
- **Visual + Interactive**: Learning through exploration, not passive consumption  
- **Progressive Mastery**: Each stage builds upon previous understanding
- **Active Recall**: Real-world application reinforces conceptual learning

## Stage-by-Stage Feature Specifications

### Stage 1: Playground (First Principles Exploration)

**Core Features:**
- **Interactive Concept Canvas**: Hybrid Excalidraw + Mermaid integration
- **Algorithm Decomposition Tool**: Break algorithms into atomic operations
- **Voice-to-Concept Mapping**: Speak thoughts while exploring (Web Speech API)
- **First Principles Prompts**: Guided questions that reveal assumptions

**User Stories:**
```
As a learner, I want to visually map out how quicksort works from scratch
So that I understand the partitioning concept before seeing code

As a learner, I want to explain my understanding aloud while drawing
So that I can identify gaps in my mental model

As a learner, I want to see fundamental operations (compare, swap, partition) 
So that I understand the building blocks before complexity
```

**Technical Requirements:**
- Excalidraw React component with custom algorithm shapes
- Mermaid.js integration for flowchart generation
- Real-time canvas collaboration (WebSockets)
- Voice recording + transcription (Web Speech API)
- Concept validation engine (pattern matching)

### Stage 2: Foundational Problems (Scaffolded Practice)

**Core Features:**
- **Algorithm Area Modules**: Arrays, Graphs, Trees, Dynamic Programming, etc.
- **Interactive Code Playground**: Monaco Editor with step-through debugging
- **Visual Execution Tracer**: Watch algorithm execution with state visualization
- **Pattern Recognition Feedback**: Identify which patterns learner discovered

**User Stories:**
```
As a learner, I want to solve array two-pointer problems with visual feedback
So that I internalize the pattern before moving to complex variations

As a learner, I want to see my algorithm execute step-by-step with variable states
So that I understand exactly what happens at each iteration

As a learner, I want feedback on which algorithmic patterns I'm using
So that I build conscious awareness of my problem-solving toolkit
```

**Technical Requirements:**
- Algorithm execution engine (sandboxed Python/JavaScript)
- State visualization component (variable tracking, data structure rendering) 
- Pattern recognition service (analyze code patterns, identify techniques used)
- Progressive difficulty algorithm (adapt based on mastery indicators)

### Stage 3: Pattern Application (Synthesis)

**Core Features:**
- **Multi-Pattern Problems**: Require combining 2-3 algorithmic techniques
- **Solution Strategy Builder**: Guide learners to identify required patterns
- **Reflection Journal**: Capture insights about pattern combinations
- **Peer Solution Comparison**: See how others approached same problem

**User Stories:**
```
As a learner, I want to tackle problems requiring graph traversal + dynamic programming
So that I learn to combine patterns rather than memorize solutions

As a learner, I want guidance on breaking down multi-step problems  
So that I develop systematic problem decomposition skills

As a learner, I want to reflect on why I chose specific patterns
So that I build metacognitive awareness of my problem-solving process
```

**Technical Requirements:**
- Complex problem generation engine
- Solution strategy templates
- Reflection capture system (structured prompts)
- Peer solution database with anonymized sharing

### Stage 4: Real-World Application (Transfer Learning)

**Core Features:**
- **Word Problem Translator**: Convert business problems to algorithmic challenges
- **First Principles Reflection Tool**: Map solutions back to core concepts
- **Industry Context Library**: See where algorithms apply (networking, databases, ML)
- **Mastery Assessment**: Demonstrate understanding through novel problem solving

**User Stories:**
```
As a learner, I want to solve "optimize delivery routes" problems
So that I see how graph algorithms apply to real business challenges

As a learner, I want to trace my solution back to first principles
So that I verify my understanding rather than pattern matching

As a learner, I want to see how my algorithmic thinking applies across domains
So that I transfer learning to new contexts confidently
```

**Technical Requirements:**
- Business problem database with algorithmic mappings
- Solution-to-concept tracing system
- Industry application content management
- Adaptive assessment engine

## Technical Architecture

### Frontend Stack
```typescript
// Core Framework
Next.js 14+ (App Router)
React 18+ (Concurrent Features)
TypeScript 5+

// Interactive Components  
@excalidraw/excalidraw (concept mapping)
mermaid (structured diagrams)
@monaco-editor/react (code editing)
framer-motion (animations)

// Real-time Features
Socket.io-client (collaboration)
Web Speech API (voice interface)
```

### Backend Stack
```python
# API Framework
FastAPI (async/await)
Pydantic (data validation)
SQLAlchemy (ORM)

# Infrastructure
PostgreSQL (user data, progress)
Redis (sessions, real-time state)
Celery (background tasks)

# Algorithm Engine
Docker (sandboxed execution)
Python AST (code analysis)
NetworkX (graph algorithms)
```

### Database Schema (Key Tables)
```sql
-- User progress tracking
users, learning_sessions, mastery_indicators

-- Content management  
algorithm_concepts, problem_sets, solution_patterns

-- Interaction tracking
canvas_interactions, code_executions, reflection_entries
```

## Implementation Roadmap

### Phase 1: Foundation (Months 1-2)
- [ ] Basic Next.js app with authentication
- [ ] Excalidraw integration for concept mapping
- [ ] Simple algorithm concept library
- [ ] User progress tracking

### Phase 2: Core Playground (Months 3-4)  
- [ ] Mermaid diagram integration
- [ ] Voice interface (basic recording)
- [ ] Algorithm execution engine
- [ ] Step-through code visualization

### Phase 3: Progressive Learning (Months 5-6)
- [ ] Problem generation system
- [ ] Pattern recognition service
- [ ] Difficulty adaptation algorithm
- [ ] Reflection capture tools

### Phase 4: Advanced Features (Months 7-8)
- [ ] Real-time collaboration
- [ ] Industry problem database
- [ ] Advanced analytics dashboard
- [ ] Mobile-responsive optimization

## Success Metrics

**Learning Effectiveness:**
- Time to algorithm mastery (pre/post assessment)
- Retention rates (spaced repetition testing)
- Transfer learning success (novel problem solving)

**Engagement Metrics:**
- Session depth (time spent in each stage)
- Concept mapping complexity (nodes/connections created)
- Reflection journal usage (entries per session)

**Technical Performance:**
- Algorithm execution latency (<500ms)
- Real-time collaboration responsiveness (<100ms)
- Canvas interaction smoothness (60fps)

---

# GRAPHS MODULE - DETAILED ELABORATION

## Overview
Graphs are the foundational data structure for modeling relationships and connections. This module teaches graph thinking from first principles: understanding that graphs model "things and their relationships" before diving into algorithms.

## Learning Objectives
By completing the Graphs module, learners will:
1. **Conceptual**: Understand graphs as relationship models, not just academic abstractions
2. **Algorithmic**: Master core traversal patterns (DFS, BFS) and their applications
3. **Problem-Solving**: Recognize when real-world problems map to graph structures
4. **Metacognitive**: Articulate why graph algorithms work and when to apply them

## Stage 1: Graphs Playground (First Principles Exploration)

### Core Concepts to Explore

#### 1. What is a Graph? (Fundamental Understanding)
**First Principles Questions:**
- "What does it mean for two things to be 'connected'?"
- "How do we represent relationships between many objects?"
- "Why do we need more than lists or trees?"

**Interactive Exploration Tools:**
```typescript
// Canvas tools for concept building
GraphConceptCanvas {
  - Drag-and-drop nodes (represent "things")
  - Draw edges (represent "relationships") 
  - Label relationships (friendship, distance, dependency)
  - Transform between representations (adjacency list ↔ visual)
}
```

**Guided Discovery Sequence:**
1. **Start with familiar examples**: Social networks, maps, web pages
2. **Abstract the pattern**: Extract the "nodes and edges" concept
3. **Explore variations**: Directed vs undirected, weighted vs unweighted
4. **Build vocabulary**: vertex, edge, neighbor, degree, path, cycle

#### 2. Graph Representations (Implementation Thinking)
**First Principles Questions:**
- "How do we store relationships in computer memory?"
- "What are the tradeoffs of different storage methods?"
- "When would we choose one representation over another?"

**Interactive Comparison Tool:**
```typescript
GraphRepresentationExplorer {
  // Show same graph in multiple formats
  - Adjacency Matrix (2D array visualization)
  - Adjacency List (linked structure)
  - Edge List (simple pairs)
  
  // Interactive transformations
  - Add/remove edges and see all representations update
  - Space/time complexity visualization
  - Query operation demonstrations (find neighbors, check connection)
}
```

#### 3. Fundamental Graph Properties
**Core Properties to Discover:**
- **Connectivity**: "Can I get from A to B?"
- **Cycles**: "Can I return to where I started?"
- **Planarity**: "Can I draw this without edge crossings?"
- **Density**: "How connected is this graph?"

**Interactive Property Explorer:**
```typescript
GraphPropertyTool {
  - Visual connectivity checker (highlight connected components)
  - Cycle detector with path highlighting
  - Degree distribution histogram
  - Planarity testing with visual feedback
}
```

### Stage 1 Implementation Specifications

**Frontend Components:**
```typescript
// Core playground interface
interface GraphPlaygroundProps {
  initialConcepts: GraphConcept[]
  explorationMode: 'guided' | 'free' | 'challenge'
}

// Node editing interface
interface GraphNode {
  id: string
  label: string
  position: {x: number, y: number}
  metadata: Record<string, any>
}

// Edge relationship interface  
interface GraphEdge {
  source: string
  target: string
  label?: string
  weight?: number
  directed: boolean
}
```

**Backend API Endpoints:**
```python
# Concept validation service
@app.post("/api/graphs/validate-concept")
async def validate_graph_concept(
    concept: GraphConceptSubmission
) -> ConceptValidationResult:
    """Validate learner's understanding of graph concept"""
    
# Property calculation service
@app.post("/api/graphs/analyze-properties") 
async def analyze_graph_properties(
    graph: GraphStructure
) -> GraphPropertiesResult:
    """Calculate connectivity, cycles, etc."""
```

## Stage 2: Foundational Graph Problems

### Core Pattern Categories

#### 1. Graph Traversal Fundamentals

**DFS (Depth-First Search) - "Go Deep First"**

*First Principles Understanding:*
- **Metaphor**: Exploring a maze by always going as far as possible before backtracking
- **Core Insight**: Uses a stack (recursion or explicit) to remember where to return
- **When to use**: Finding paths, detecting cycles, topological sorting

*Progressive Problem Sequence:*
```python
# Level 1: Path Finding
def has_path(graph, start, target):
    """Can we reach target from start? (connectivity)"""
    
# Level 2: Path Reconstruction  
def find_path(graph, start, target):
    """What is one path from start to target?"""
    
# Level 3: All Paths
def find_all_paths(graph, start, target):
    """What are all possible paths?"""
    
# Level 4: Cycle Detection
def has_cycle(graph):
    """Does this graph contain any cycles?"""
```

*Visual Execution Tracer:*
```typescript
DFSVisualization {
  - Stack state visualization (show call stack or explicit stack)
  - Node coloring (unvisited/visiting/visited)
  - Edge traversal animation
  - Backtracking highlight
  - Path reconstruction visualization
}
```

**BFS (Breadth-First Search) - "Explore by Layers"**

*First Principles Understanding:*
- **Metaphor**: Ripples in a pond - explore all nodes at distance 1, then distance 2, etc.
- **Core Insight**: Uses a queue to process nodes in order of discovery
- **When to use**: Shortest paths, level-order processing, finding nearest neighbors

*Progressive Problem Sequence:*
```python
# Level 1: Shortest Path (unweighted)
def shortest_path_length(graph, start, target):
    """What is the minimum number of steps?"""
    
# Level 2: Shortest Path Reconstruction
def shortest_path(graph, start, target):
    """What is the actual shortest path?"""
    
# Level 3: Multi-target BFS
def distances_from_source(graph, start):
    """Distances from start to all reachable nodes"""
    
# Level 4: Bidirectional BFS
def bidirectional_shortest_path(graph, start, target):
    """Meet in the middle for efficiency"""
```

*Visual Execution Tracer:*
```typescript
BFSVisualization {
  - Queue state visualization (FIFO order)
  - Level-by-level expansion animation
  - Distance labeling
  - Shortest path highlighting
  - Frontier expansion visualization
}
```

#### 2. Connected Components

**First Principles Understanding:**
- **Core Question**: "Which nodes can reach which other nodes?"
- **Mental Model**: Islands in an ocean - separate disconnected groups
- **Applications**: Social network clusters, network partitioning, image segmentation

*Problem Progression:*
```python
# Level 1: Count Components
def count_connected_components(graph):
    """How many separate groups exist?"""
    
# Level 2: Component Membership
def find_connected_components(graph):
    """Which nodes belong to which component?"""
    
# Level 3: Largest Component
def largest_connected_component(graph):
    """What is the biggest connected group?"""
    
# Level 4: Component Bridge Detection
def find_bridges(graph):
    """Which edges connect different components?"""
```

#### 3. Bipartite Graphs

**First Principles Understanding:**
- **Core Insight**: Can we color nodes with 2 colors such that no adjacent nodes share a color?
- **Mental Model**: "Teams" or "sides" where members only connect to the other side
- **Applications**: Matching problems, scheduling, resource allocation

*Problem Progression:*
```python
# Level 1: Bipartite Check
def is_bipartite(graph):
    """Can we split nodes into two groups?"""
    
# Level 2: Bipartite Coloring
def bipartite_coloring(graph):
    """Return the actual two-coloring if possible"""
    
# Level 3: Maximum Matching
def maximum_bipartite_matching(graph):
    """Largest set of edges with no shared vertices"""
```

### Stage 2 Implementation Specifications

**Problem Generation Engine:**
```python
class GraphProblemGenerator:
    def generate_traversal_problem(
        self, 
        difficulty: DifficultyLevel,
        focus_pattern: TraversalPattern
    ) -> Problem:
        """Generate graph with specific properties for practice"""
        
    def create_visual_test_case(
        self,
        algorithm: GraphAlgorithm,
        graph_properties: GraphProperties
    ) -> VisualTestCase:
        """Create step-by-step execution example"""
```

**Pattern Recognition Service:**
```python
class GraphPatternRecognizer:
    def analyze_solution(self, code: str) -> PatternAnalysis:
        """Identify which graph patterns student used"""
        
    def suggest_optimizations(self, solution: Solution) -> List[Optimization]:
        """Provide targeted improvement suggestions"""
```

## Stage 3: Graph Pattern Synthesis

### Multi-Pattern Problem Categories

#### 1. DFS + Backtracking Combinations
**Example Problems:**
- **N-Queens on Graph**: Place N pieces on graph nodes with constraint satisfaction
- **Graph Coloring**: Color nodes such that no adjacent nodes share colors
- **Hamiltonian Path**: Find path visiting each node exactly once

*Implementation Pattern:*
```python
def graph_backtracking_template(graph, constraints):
    """Template for DFS + backtracking on graphs"""
    def backtrack(current_state):
        if is_complete(current_state):
            return current_state
            
        for next_choice in get_valid_choices(current_state):
            if satisfies_constraints(next_choice, constraints):
                current_state.add(next_choice)
                result = backtrack(current_state)
                if result: return result
                current_state.remove(next_choice)  # backtrack
                
        return None
```

#### 2. BFS + Dynamic Programming
**Example Problems:**
- **Shortest Path with Constraints**: BFS with state tracking
- **Graph Level Processing**: Process nodes layer by layer with state updates
- **Multi-source BFS**: Start from multiple points simultaneously

#### 3. Component Analysis + Algorithm Selection
**Example Problems:**
- **Network Reliability**: Analyze how removing nodes/edges affects connectivity
- **Social Network Analysis**: Identify influential nodes, community detection
- **System Design**: Partition large graphs for distributed processing

### Stage 3 Implementation Specifications

**Multi-Pattern Problem Engine:**
```python
class GraphSynthesisEngine:
    def create_combination_problem(
        self,
        primary_pattern: GraphPattern,
        secondary_pattern: GraphPattern,
        difficulty: DifficultyLevel
    ) -> SynthesisProblem:
        """Generate problems requiring multiple graph techniques"""
        
    def provide_strategy_hints(
        self,
        problem: Problem,
        student_progress: StudentProgress
    ) -> List[StrategyHint]:
        """Guide students to identify required patterns"""
```

## Stage 4: Real-World Graph Applications

### Application Domain Categories

#### 1. Social Networks & Relationships
**Real-World Problems:**
- **Friend Recommendations**: "People you may know" using mutual connections
- **Influence Propagation**: How information spreads through networks
- **Community Detection**: Finding clusters in social graphs

**Implementation Example:**
```python
def suggest_friends(social_graph, user_id, max_suggestions=5):
    """
    Real-world problem: Friend recommendations
    Graph concept: 2-hop connections, mutual friends counting
    """
    friends = set(social_graph.neighbors(user_id))
    candidates = defaultdict(int)
    
    for friend in friends:
        for friend_of_friend in social_graph.neighbors(friend):
            if friend_of_friend not in friends and friend_of_friend != user_id:
                candidates[friend_of_friend] += 1
                
    return sorted(candidates.items(), key=lambda x: x[1], reverse=True)[:max_suggestions]
```

#### 2. Navigation & Routing
**Real-World Problems:**
- **GPS Navigation**: Shortest path with real-time traffic
- **Network Routing**: Packet routing in computer networks
- **Supply Chain Optimization**: Minimize distribution costs

#### 3. Dependency Management
**Real-World Problems:**
- **Build Systems**: Compile order for software projects
- **Course Prerequisites**: Valid course scheduling
- **Task Scheduling**: Project management with dependencies

#### 4. Resource Allocation
**Real-World Problems:**
- **Matching Markets**: Assign students to schools, residents to hospitals
- **Load Balancing**: Distribute work across servers
- **Conflict Resolution**: Schedule meetings without conflicts

### Stage 4 Implementation Specifications

**Real-World Problem Database:**
```python
class RealWorldGraphProblems:
    categories = [
        "social_networks",
        "navigation", 
        "dependencies",
        "resource_allocation",
        "network_analysis"
    ]
    
    def get_problem_by_domain(
        self, 
        domain: str,
        difficulty: DifficultyLevel
    ) -> RealWorldProblem:
        """Return contextual problem with business background"""
        
    def map_to_graph_concepts(
        self,
        problem: RealWorldProblem
    ) -> ConceptMapping:
        """Show how business problem maps to graph algorithms"""
```

**First Principles Reflection Tool:**
```typescript
interface ReflectionPrompt {
  businessContext: string
  graphMapping: string
  algorithmChoice: string
  firstPrinciplesConnection: string
}

GraphReflectionTool {
  // Guide learners to connect solutions back to fundamentals
  - "Why did we model this as a graph?"
  - "Which graph property was most important?"
  - "How does our algorithm connect to the first principles?"
  - "What assumptions did we make about the real world?"
}
```

## Technical Implementation Details

### Graph Data Structures
```typescript
// Core graph representation
interface Graph {
  nodes: Map<string, GraphNode>
  edges: Map<string, GraphEdge>
  directed: boolean
  weighted: boolean
}

// Execution state for visualization
interface GraphExecutionState {
  currentNode?: string
  visitedNodes: Set<string>
  processingStack: string[]
  processedNodes: Set<string>
  currentPath: string[]
}
```

### Visualization Components
```typescript
// Interactive graph renderer
interface GraphVisualizerProps {
  graph: Graph
  executionState?: GraphExecutionState
  highlightedPath?: string[]
  algorithm?: 'dfs' | 'bfs' | 'dijkstra'
  animationSpeed: number
}

// Algorithm step controller
interface AlgorithmStepperProps {
  algorithm: GraphAlgorithm
  onStep: (state: ExecutionState) => void
  onReset: () => void
  autoPlay: boolean
}
```

### Assessment & Progress Tracking
```python
class GraphMasteryTracker:
    def assess_conceptual_understanding(
        self,
        student_responses: List[ConceptResponse]
    ) -> ConceptualMastery:
        """Evaluate first principles understanding"""
        
    def track_algorithmic_proficiency(
        self,
        solutions: List[Solution]
    ) -> AlgorithmicProficiency:
        """Monitor pattern recognition and application"""
        
    def measure_transfer_learning(
        self,
        real_world_solutions: List[RealWorldSolution]
    ) -> TransferLearningScore:
        """Assess ability to apply to novel problems"""
```

This detailed Graphs elaboration provides complete specifications for implementing the first algorithm area in Axiome. Each stage builds systematically on the previous, ensuring deep understanding rather than superficial memorization.