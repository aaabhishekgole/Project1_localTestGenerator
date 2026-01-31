from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import json

app = FastAPI(title="Local LLM Test Case Generator")

# Configuration
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2"

class GenerateRequest(BaseModel):
    requirement: str
    model: str = MODEL_NAME

class TestCaseResponse(BaseModel):
    response: str
    raw_json: dict | None = None

TEMPLATE = """
You are an expert QA Engineer. Your task is to generate comprehensive test cases based on the following requirement.

### Requirement:
{requirement}

### Instructions:
Generate a JSON object containing a list of test cases. 
Each test case must include:
- id: A unique identifier (e.g., TC_001)
- title: A concise title
- description: What is being tested
- preconditions: List of preconditions
- steps: Numbered list of steps
- expected_result: The expected outcome
- priority: P0, P1, or P2

### Output Format:
Proprietary JSON format only. Do not include any conversational text.
{{
  "test_cases": [
    {{
      "id": "TC_001",
      ...
    }}
  ]
}}
"""

@app.post("/generate", response_model=TestCaseResponse)
async def generate_test_cases(request: GenerateRequest):
    print(f"📩 Received requirement: {request.requirement[:50]}...")
    
    prompt = TEMPLATE.format(requirement=request.requirement)
    
    payload = {
        "model": request.model,
        "prompt": prompt,
        "stream": False,
        "format": "json"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            print(f"🤖 Calling Ollama ({request.model})...")
            response = await client.post(OLLAMA_URL, json=payload, timeout=60.0)
            response.raise_for_status()
            
            ollama_data = response.json()
            generated_text = ollama_data.get("response", "")
            
            # Parse JSON
            try:
                parsed_json = json.loads(generated_text)
            except json.JSONDecodeError:
                parsed_json = None
                
            return TestCaseResponse(
                response=generated_text,
                raw_json=parsed_json
            )
            
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"Ollama connection failed: {e}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
