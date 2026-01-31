# Project Constitution (gemini.md)

## Data Schemas
## Data Schemas

### Input Object
```json
{
  "requirement_text": "string (Raw user story or feature description)",
  "template_id": "string (default: 'standard_qa')"
}
```

### Output Object (Test Case)
```json
{
  "test_cases": [
    {
      "id": "TC_001",
      "title": "string",
      "description": "string",
      "preconditions": ["string"],
      "steps": ["string"],
      "expected_result": "string",
      "priority": "P0 | P1 | P2"
    }
  ]
}
```*

## Behavioral Rules
- Follow Protocol 0: Javascript/Markdown logic.

## Architectural Invariants
- Local LLM via Ollama.
