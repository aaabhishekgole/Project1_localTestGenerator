document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    function appendMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = isUser ? '👤' : '🤖';

        const content = document.createElement('div');
        content.className = 'content';

        // Simple Markdown parsing for safer rendering
        if (!isUser) {
            content.innerHTML = parseMarkdown(text);
        } else {
            content.textContent = text;
        }

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(content);
        chatContainer.appendChild(msgDiv);

        // Auto scroll
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function parseMarkdown(text) {
        // Very basic parser for the demo
        let html = text
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/- (.*)/g, '<li>$1</li>')
            .replace(/\n\n/g, '<br><br>');
        return html;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // User Message
        appendMessage(message, true);
        userInput.value = '';
        sendBtn.disabled = true;

        // Loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai-message loading';
        loadingDiv.innerHTML = '<div class="avatar">🤖</div><div class="content">Thinking...</div>';
        chatContainer.appendChild(loadingDiv);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            // Remove loading
            chatContainer.removeChild(loadingDiv);

            if (data.error) {
                appendMessage(`Error: ${data.error}`);
            } else {
                appendMessage(data.response);
            }

        } catch (error) {
            chatContainer.removeChild(loadingDiv);
            appendMessage('Error: Could not connect to server.');
            console.error(error);
        } finally {
            sendBtn.disabled = false;
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
