const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { generateTestCases } = require('./generator');
const templates = require('./templates');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`📩 Received requirement: ${message.substring(0, 50)}...`);

    try {
        // 1. Prepare Prompt
        const template = templates.standard_qa;
        const prompt = template.replace('{{requirement}}', message);

        // 2. Call Ollama
        console.log('🤖 Asking Ollama...');
        const rawResponse = await generateTestCases(prompt);

        let testCasesData;
        try {
            testCasesData = JSON.parse(rawResponse);
        } catch (e) {
            console.warn('⚠️ JSON parse failed, returning raw');
            testCasesData = { test_cases: [], raw: rawResponse };
        }

        // 3. Convert to Markdown for Chat Bubble
        let markdownResponse = '';
        if (testCasesData.test_cases && testCasesData.test_cases.length > 0) {
            markdownResponse += `### Generated Test Cases\n\n`;
            testCasesData.test_cases.forEach(tc => {
                markdownResponse += `**${tc.id}: ${tc.title}**\n`;
                markdownResponse += `> *${tc.description}*\n`;
                markdownResponse += `- **Priority**: ${tc.priority}\n`;
                markdownResponse += `- **Expected**: ${tc.expected_result}\n\n`;
            });
            markdownResponse += `\n*Detailed steps available.*`;
        } else {
            markdownResponse = rawResponse;
        }

        res.json({
            response: markdownResponse,
            data: testCasesData
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ error: 'Failed to generate test cases.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`🎨 Web UI available at http://localhost:${PORT}`);
});
