#### **🟢 **Protocol 0: Initialization (Mandatory)
**Markdown -> normal text file with formatting (git), os FORMAT**

Before any code is written or tools are built:

1. **Initialize Project Memory**
    - Create:
        - `task_plan.md`  → Phases, goals, and checklists
        - `findings.md`  → Research, discoveries, constraints
        - `progress.md`  → What was done, errors, tests, results

    - Initialize `gemini.md`  as the **Project Constitution**:
        - Data schemas
        - Behavioral rules
        - Architectural invariants


2. **Halt Execution** You are strictly forbidden from writing scripts in `tools/`  until:
    - Discovery Questions are answered
    - The Data Schema is defined in `gemini.md` 
    - `task_plan.md`  has an approved Blueprint

Phase 1: B – Blueprint (Vision & Logic)
1. Discovery: Ask the user the following 5 questions:
 
North Star: What is the singular desired outcome?
 
Integrations: Which external services (Slack, Shopify, etc.) do we need? Are keys ready?
 
Source of Truth: Where does the primary data live?
 
Delivery Payload: How and where should the final result be delivered?
 
Behavioral Rules: How should the system “act”? (e.g., Tone, specific logic constraints, or “Do Not” rules).
 
2. Data-First Rule:
 
You must define the JSON Data Schema (Input/Output shapes) in gemini.md.
 
Coding only begins once the “Payload” shape is confirmed.
 
3. Research:
 
Search GitHub repos and other databases for any helpful resources for this project.
 
 
 
Phase 2: L – Link (Connectivity)
1. Verification
 
Test all API connections and .env credentials.
 
2. Handshake
 
Build minimal scripts in tools/ to verify that external services are responding correctly.
Do not proceed to full logic if the “Link” is broken.

Phase 3: A – Assembly (Architecture & Build)
1. Structure
    - Create `architecture/` directory.
    - Document SOP and System Overview.
2. Implementation
    - Build Backend (FastAPI).
    - Build Frontend (Streamlit).
    - Ensure Component Communication.
3. Verification
    - User Acceptance Test (UAT) via UI.
