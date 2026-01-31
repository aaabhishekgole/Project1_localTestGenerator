import streamlit as st
import requests
import json

# Configuration
API_URL = "http://localhost:8000/generate"

st.set_page_config(
    page_title="AI Test Case Generator",
    page_icon="🤖",
    layout="wide"
)

# Custom CSS for dark mode/premium feel managed by Streamlit theme mostly, but adding some tweaks
st.markdown("""
<style>
    .stTextArea textarea {
        background-color: #1E1E1E;
        color: #FFFFFF;
    }
    .main-header {
        font-family: 'Outfit', sans-serif;
        color: #58a6ff;
    }
</style>
""", unsafe_allow_html=True)

st.title("🤖 QA World")
st.markdown("Generate comprehensive test cases from your requirements using **Ollama**.")

with st.sidebar:
    st.header("Settings")
    model_name = st.text_input("Model Name", value="llama3.2")
    st.info("Ensure Ollama is running (`ollama serve`).")

# Input Section
requirement = st.text_area("Enter Requirement / User Story", height=150, placeholder="As a user, I want to...")

if st.button("Generate Test Cases", type="primary"):
    if not requirement:
        st.warning("Please enter a requirement first.")
    else:
        with st.spinner("🤖 AI is thinking... (This may take a moment)"):
            try:
                payload = {"requirement": requirement, "model": model_name}
                response = requests.post(API_URL, json=payload)
                response.raise_for_status()
                
                data = response.json()
                raw_json = data.get("raw_json")
                
                if raw_json and "test_cases" in raw_json:
                    st.success("✅ Test Cases Generated Successfully!")
                    
                    test_cases = raw_json["test_cases"]
                    
                    for tc in test_cases:
                        with st.expander(f"{tc.get('id', 'TC')}: {tc.get('title', 'Untitled')}", expanded=True):
                            st.markdown(f"**Priority**: `{tc.get('priority', 'N/A')}`")
                            st.markdown(f"**Description**: {tc.get('description', '')}")
                            
                            col1, col2 = st.columns(2)
                            with col1:
                                st.markdown("**Preconditions**")
                                for p in tc.get('preconditions', []):
                                    st.markdown(f"- {p}")
                            
                            with col2:
                                st.markdown("**Expected Result**")
                                st.markdown(tc.get('expected_result', ''))
                                
                            st.markdown("**Steps**")
                            for idx, step in enumerate(tc.get('steps', [])):
                                st.markdown(f"{idx+1}. {step}")
                else:
                    st.warning("⚠️ Could not parse structured data. Showing raw output:")
                    st.markdown(data.get("response", ""))
                    
            except requests.exceptions.ConnectionError:
                st.error("❌ Could not connect to Backend. Is `backend/main.py` running?")
            except Exception as e:
                st.error(f"❌ Error: {e}")
