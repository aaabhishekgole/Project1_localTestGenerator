# Findings

## Research
- **North Star**: Local LLM Testcase generator based on User input with a proper Template stored in code.
- **Technology**: Ollama API (Open source model: `llama3.2`).

## Discoveries
- **Transition**: Moved from CLI to **Web Chat Interface**.
- **Source of Truth**: Interactive User Input (Chat).
- **Delivery Payload**: Rendered Chat Response.
- **Integrations**: Ollama (Local).


## Constraints
- **Model**: Must use `llama3.2`.
- **Format**: Output must be structured (likely JSON -> MD conversion).
