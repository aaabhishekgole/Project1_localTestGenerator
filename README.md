# Local LLM Test Case Generator 🤖

High-performance, privacy-focused AI tool that generates comprehensive test cases from user requirements using local Large Language Models (LLMs) via Ollama. Built with **FastAPI** and **Streamlit**.

## 🚀 Features

*   **100% Local Execution**: Uses Ollama to run LLMs locally on your machine. No data leaves your network.
*   **Privacy First**: Ideal for sensitive requirements that shouldn't be sent to cloud APIs.
*   **Modern UI**: Clean, responsive interface built with Streamlit.
*   **Structured Output**: Generates test cases in structured JSON format, ensuring consistency.
*   **Customizable**: Easily switch LLM models (e.g., Llama 3, Mistral) via the UI.

## 🛠️ Tech Stack

*   **Frontend**: [Streamlit](https://streamlit.io/) (Python)
*   **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
*   **AI Engine**: [Ollama](https://ollama.com/)
*   **Language**: Python 3.10+

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1.  **Python 3.10+**: [Download Python](https://www.python.org/downloads/)
2.  **Ollama**: [Download Ollama](https://ollama.com/download)
3.  **Llama 3 Model** (or compatible):
    ```bash
    ollama pull llama3.2
    ```
    *(Note: You can change the model name in the UI, but ensure the model is pulled locally first.)*

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/Project1_localTestGenerator.git
    cd Project1_localTestGenerator
    ```

2.  **Install Dependencies**:
    It is recommended to use a virtual environment.
    ```bash
    # Create virtual environment (optional but recommended)
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

    # Install requirements
    pip install -r requirements.txt
    ```

## 🏃‍♂️ Usage

You need to run both the Backend and Frontend services.

### 1. Start Ollama
Ensure the Ollama service is running in the background.
```bash
ollama serve
```

### 2. Start the Backend (FastAPI)
Open a new terminal and run:
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
*The API will be available at `http://localhost:8000`*

### 3. Start the Frontend (Streamlit)
Open another terminal and run:
```bash
streamlit run frontend/app.py
```
*The application should automatically open in your browser at `http://localhost:8501`*

## 🏗️ Project Structure

```
Project1_localTestGenerator/
├── backend/
│   └── main.py          # FastAPI Application & Ollama Integration
├── frontend/
│   └── app.py           # Streamlit User Interface
├── requirements.txt     # Python Dependencies
├── task_plan.md         # Project Roadmap & Tasks
└── README.md            # Project Documentation
```

## 📖 Documentation

For detailed architecture diagrams, sequence flows, and component breakdown, please refer to [ARCHITECTURE.md](./ARCHITECTURE.md).

## 📊 System Architecture

### High-Level Flow
```mermaid
graph LR
    A[User] -->|Requirement| B[Frontend (Streamlit)]
    B -->|HTTP Request| C[Backend (FastAPI)]
    C -->|Prompt| D[Ollama (Local LLM)]
    D -->|Test Cases (JSON)| C
    C -->|Response| B
    B -->|Display| A
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
