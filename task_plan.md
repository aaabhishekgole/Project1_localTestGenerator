# Task Plan

## Phases
1. Initialization
2. Discovery
3. Implementation
4. Verification

## Goals
- Create a local LLM Testcase generator using Ollama.

## Blueprint (Phase 1)
## Blueprint (Phase 1) - **PYTHON PIVOT**
### System Architecture
- **App Type**: Web Application
- **Frontend**: Streamlit (Python)
- **Backend**: FastAPI (Python)
- **AI Engine**: Ollama (Local)
- **Input Source**: Streamlit Chat Interface
- **Output Target**: Streamlit Markdown Display

### Workflow
1. **User**: Enters requirement in Streamlit UI.
2. **Frontend**: Sends request to FastAPI Backend (`http://localhost:8000/generate`).
3. **Backend**: 
   - Receives Pydantic model.
   - Formats Prompt.
   - Calls Ollama API.
   - Returns structured JSON/Markdown.
4. **Frontend**: Displays Test Cases.

## Checklists
- [x] Discovery Questions Answered (Assumed Defaults)
- [/] Data Schema Defined
- [/] Blueprint Approved
