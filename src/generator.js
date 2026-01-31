const http = require('http');

const OLLAMA_HOST = 'localhost';
const OLLAMA_PORT = 11434;
const MODEL_NAME = 'llama3.2';

async function generateTestCases(prompt) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            model: MODEL_NAME,
            prompt: prompt,
            stream: false,
            format: "json" // Force JSON mode if supported or just guide via prompt
        });

        const options = {
            hostname: OLLAMA_HOST,
            port: OLLAMA_PORT,
            path: '/api/generate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const response = JSON.parse(data);
                        resolve(response.response);
                    } catch (e) {
                        reject(new Error(`Failed to parse Ollama response: ${e.message}`));
                    }
                } else {
                    reject(new Error(`Ollama API failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(payload);
        req.end();
    });
}

module.exports = { generateTestCases };
