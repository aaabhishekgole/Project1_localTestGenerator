import requests
import sys

URL = "http://localhost:8000/generate"

print(f"🧪 Testing Python Backend at {URL}...")

payload = {
    "requirement": "User should be able to logout.",
    "model": "llama3.2"
}

try:
    response = requests.post(URL, json=payload, timeout=30)
    print(f"📡 Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print("✅ Backend Verified!")
        print(f"Response snippet: {data['response'][:100]}...")
    else:
        print(f"❌ Failed: {response.text}")
        sys.exit(1)

except Exception as e:
    print(f"❌ Connection Error: {e}")
    print("💡 ensure `python backend/main.py` is running.")
    sys.exit(1)
