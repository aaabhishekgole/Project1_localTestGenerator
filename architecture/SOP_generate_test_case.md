# SOP: How to Run the Local Test Case Generator

## Prerequisites
1. **Ollama**: Must be installed and running.
    - Command: `ollama serve`
    - Model: Ensure you have pulled `llama3.2`.
      - `ollama pull llama3.2`

2. **Python**: Python 3.8+ must be installed and added to PATH.

## Installation
1. Navigate to the project directory:
   ```powershell
   cd 'd:\Test Abhishek\AI_Frameworl\Project1_localTestGenerator'
   ```

2. Create a Virtual Environment (Recommended):
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate
   ```

3. Install Dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

## Running the Application
### 1. Start the Backend
Open a terminal and run:
```powershell
python backend/main.py
```
*The server will start at http://localhost:8000.*

### 2. Start the Frontend
Open a **new** terminal and run:
```powershell
streamlit run frontend/app.py
```
*The browser will open automatically at http://localhost:8501.*

## Usage
1. Enter your **Requirement** or User Story in the text area.
2. Click **Generate Test Cases**.
3. View the structured output.
