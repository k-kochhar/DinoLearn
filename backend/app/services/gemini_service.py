import httpx
import os
import re
import json
from dotenv import load_dotenv

load_dotenv()

async def generate_roadmap_from_gemini(topic: str):
    """Generate a roadmap structure using Google's Gemini API"""
    api_key = os.getenv('GEMINI_API_KEY')
    
    if not api_key or api_key == "your_gemini_api_key_here":
        raise ValueError("GEMINI_API_KEY environment variable is not set or using placeholder value")
        
    print("Gemini API client initialized successfully")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key={api_key}"
    
    prompt = f'''Create a 14-day roadmap for learning about "{topic}". 
    Return the result in this specific JSON format:
    {{
      "topic": "{topic}",
      "roadmap": [
        {{ "day": 1, "title": "First Lesson Title" }},
        {{ "day": 2, "title": "Second Lesson Title" }},
        ...and so on for all 14 days
      ]
    }}
    Make sure each title is concise, clear, and represents a logical progression for learning about {topic}.
    '''
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url,
            json={
                "contents": [{"parts": [{"text": prompt}]}]
            }
        )
        
        data = response.json()
        text = data["candidates"][0]["content"]["parts"][0]["text"]
        
        # Extract JSON from text (sometimes Gemini adds explanations before/after JSON)
        json_match = re.search(r'({[\s\S]*})', text)
        if json_match:
            try:
                json_data = json.loads(json_match.group(1))
                # Validate the expected structure
                if "topic" in json_data and "roadmap" in json_data and len(json_data["roadmap"]) > 0:
                    return json_data
            except json.JSONDecodeError:
                pass  # Fall through to backup plan
        
        # Backup: If JSON parsing failed, extract lesson titles manually
        lines = [line for line in text.split('\n') if line.strip()]
        roadmap = []
        
        for i, line in enumerate(lines[:14]):
            # Remove day numbers like "1." or "Day 1:" from the start
            clean_title = re.sub(r"^\d+\.\s*|^Day\s+\d+[:.]\s*", "", line, flags=re.IGNORECASE)
            roadmap.append({"day": i+1, "title": clean_title})
        
        return {
            "topic": topic,
            "roadmap": roadmap
        }