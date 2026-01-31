# System Architecture

## Overview
The Local LLM Test Case Generator is a privacy-first web application that runs entirely on your local machine using Ollama.

## Components

### 1. Frontend (`frontend/`)
- **Technology**: Streamlit (Python)
- **Port**: 8501
- **Responsibility**: 
  - User Interface for input.
  - Displaying generated Test Cases.
  - Communicating with the Backend API.

### 2. Backend (`backend/`)
- **Technology**: FastAPI (Python)
- **Port**: 8000
- **Responsibility**:
  - API Endpoint (`POST /generate`).
  - Prompt Engineering (injecting requirements into templates).
  - Client for Ollama API.

### 3. AI Engine
- **Technology**: Ollama
- **Model**: `llama3.2`
- **Responsibility**: Generative Intelligence.

## Data Flow
`User Input` -> `Streamlit` -> `FastAPI` -> `Ollama` -> `FastAPI (JSON Parsing)` -> `Streamlit (Markdown Render)`
