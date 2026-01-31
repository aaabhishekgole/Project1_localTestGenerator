const http = require('http');

// Configuration
const OLLAMA_HOST = 'localhost';
const OLLAMA_PORT = 11434;
const MODEL_NAME = 'llama3.2';

function checkOllama() {
    console.log(`🔍 Checking Ollama connection at http://${OLLAMA_HOST}:${OLLAMA_PORT}...`);

    const options = {
        hostname: OLLAMA_HOST,
        port: OLLAMA_PORT,
        path: '/api/tags',
        method: 'GET',
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('✅ Ollama is running!');
                try {
                    const models = JSON.parse(data).models;
                    const hasModel = models.some(m => m.name.includes(MODEL_NAME));

                    if (hasModel) {
                        console.log(`✅ Model '${MODEL_NAME}' found.`);
                        testGeneration();
                    } else {
                        console.error(`❌ Model '${MODEL_NAME}' NOT found.`);
                        console.log('Available models:', models.map(m => m.name).join(', '));
                        console.log(`💡 Run: ollama pull ${MODEL_NAME}`);
                    }
                } catch (e) {
                    console.error('❌ Failed to parse Ollama response:', e.message);
                }
            } else {
                console.error(`❌ Ollama returned status: ${res.statusCode}`);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`❌ Could not connect to Ollama: ${e.message}`);
        console.log('💡 Ensure Ollama is running (try `ollama serve` in a terminal).');
    });

    req.end();
}

function testGeneration() {
    console.log(`\n🧪 Testing generation with '${MODEL_NAME}'...`);

    const payload = JSON.stringify({
        model: MODEL_NAME,
        prompt: "Say 'Hello, World!'",
        stream: false
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

        res.on('data', (chunk) => { data += chunk; });

        res.on('end', () => {
            if (res.statusCode === 200) {
                const response = JSON.parse(data);
                console.log('✅ Generation successful!');
                console.log('🤖 Response:', response.response);
            } else {
                console.error('❌ Generation failed:', res.statusCode, data);
            }
        });
    });

    req.on('error', (e) => console.error('❌ Generation error:', e.message));
    req.write(payload);
    req.end();
}

checkOllama();
