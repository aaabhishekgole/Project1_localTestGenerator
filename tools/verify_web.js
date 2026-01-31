const http = require('http');

const payload = JSON.stringify({
    message: "Test requirement: Login page"
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/chat',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
    }
};

console.log('🧪 Testing Web Link (POST /api/chat)...');

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`📡 Status Code: ${res.statusCode}`);
        if (res.statusCode === 200) {
            console.log('✅ Web Link Verified!');
            console.log('Response Snippet:', data.substring(0, 100));
        } else {
            console.error('❌ Web Link Failed:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ Connection Error: ${e.message}`);
});

req.write(payload);
req.end();
