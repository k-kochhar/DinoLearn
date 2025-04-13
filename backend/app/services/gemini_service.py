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
    
    Return ONLY the following JSON format with no explanations before or after:
    {{
      "topic": "{topic}",
      "roadmap": [
        {{ "day": 1, "title": "What Are {topic}?" }},
        {{ "day": 2, "title": "History and Origins of {topic}" }},
        {{ "day": 3, "title": "Fundamental Concepts of {topic}" }},
        {{ "day": 4, "title": "Key Components of {topic}" }},
        {{ "day": 5, "title": "Important Types and Categories" }},
        {{ "day": 6, "title": "Advanced Concepts in {topic}" }},
        {{ "day": 7, "title": "Practical Applications of {topic}" }},
        {{ "day": 8, "title": "Evolution and Development" }},
        {{ "day": 9, "title": "Research Methods and Discoveries" }},
        {{ "day": 10, "title": "Challenges and Solutions" }},
        {{ "day": 11, "title": "Modern Developments" }},
        {{ "day": 12, "title": "{topic} in Popular Culture" }},
        {{ "day": 13, "title": "Future Trends and Innovations" }},
        {{ "day": 14, "title": "Review and Assessment" }}
      ]
    }}
    
    Modify the titles to be specific to {topic} while maintaining the overall structure, but keep the pattern of day 1 being "What Are {topic}?" and day 14 being a review day. Make titles concise and clear.
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