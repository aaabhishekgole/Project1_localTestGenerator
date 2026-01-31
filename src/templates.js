const templates = {
    standard_qa: `
You are an expert QA Engineer. Your task is to generate comprehensive test cases based on the following requirement.

### Requirement:
{{requirement}}

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
{
  "test_cases": [
    {
      "id": "TC_001",
      ...
    }
  ]
}
`
};

module.exports = templates;
