import httpx
import os
import re
import json
from dotenv import load_dotenv

load_dotenv()

async def generate_roadmap_from_gemini(topic: str):
    """Generate a roadmap structure using Google's Gemini API"""
    try:
        api_key = os.getenv('GEMINI_API_KEY')
        
        if not api_key or api_key == "your_gemini_api_key_here":
            raise ValueError("GEMINI_API_KEY environment variable is not set or using placeholder value")
            
        print("Gemini API client initialized successfully")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key={api_key}"
        
        prompt = f'''Create a 14-day progressive learning roadmap for "{topic}" that starts with the absolute basics and gradually builds up to advanced concepts.

        Return ONLY the following JSON format with no explanations before or after:
        {{
          "topic": "{topic}",
          "roadmap": [
            {{ "day": 1, "title": "Introduction to {topic}" }},
            {{ "day": 2, "title": "TITLE FOR DAY 2" }},
            {{ "day": 3, "title": "TITLE FOR DAY 3" }},
            {{ "day": 4, "title": "TITLE FOR DAY 4" }},
            {{ "day": 5, "title": "TITLE FOR DAY 5" }},
            {{ "day": 6, "title": "TITLE FOR DAY 6" }},
            {{ "day": 7, "title": "TITLE FOR DAY 7" }},
            {{ "day": 8, "title": "TITLE FOR DAY 8" }},
            {{ "day": 9, "title": "TITLE FOR DAY 9" }},
            {{ "day": 10, "title": "TITLE FOR DAY 10" }},
            {{ "day": 11, "title": "TITLE FOR DAY 11" }},
            {{ "day": 12, "title": "TITLE FOR DAY 12" }},
            {{ "day": 13, "title": "TITLE FOR DAY 13" }},
            {{ "day": 14, "title": "Mastering Advanced {topic} Concepts" }}
          ]
        }}
        
        Important guidelines:
        1. Day 1 should be a true beginner-friendly introduction with no prior knowledge required
        2. Each subsequent day should build on previous knowledge, gradually increasing in complexity
        3. The middle days should cover intermediate concepts 
        4. The later days (10-13) should cover advanced topics and specialized applications
        5. Day 14 should be an advanced masterclass that brings everything together
        6. All titles should be specific to {topic}, clear, concise, and descriptive
        7. Ensure a logical progression of knowledge throughout the 14 days
        '''
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url,
                json={
                    "contents": [{"parts": [{"text": prompt}]}]
                }
            )
            
            data = response.json()
            
            # Check if there was an error in the response
            if "error" in data:
                print(f"Gemini API error: {data['error']}")
                return get_fallback_roadmap(topic)
                
            # Try to access the text content
            try:
                text = data["candidates"][0]["content"]["parts"][0]["text"]
            except (KeyError, IndexError) as e:
                print(f"Error extracting text from Gemini response: {str(e)}")
                return get_fallback_roadmap(topic)
            
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
    except Exception as e:
        print(f"Error in generate_roadmap_from_gemini: {str(e)}")
        return get_fallback_roadmap(topic)

def get_fallback_roadmap(topic):
    """Generate a fallback roadmap when Gemini API fails"""
    title_templates = [
        f"Introduction to {topic}",
        f"Getting Started with {topic}",
        f"Understanding {topic} Basics",
        f"{topic} Fundamentals",
        f"Essential {topic} Skills",
        f"{topic} Core Concepts",
        f"Practical {topic} Techniques",
        f"Working with {topic}",
        f"Intermediate {topic}",
        f"Advanced {topic} Skills",
        f"{topic} Best Practices",
        f"{topic} in Real-World Applications",
        f"Mastering {topic}",
        f"Expert {topic} Concepts"
    ]
    
    roadmap = []
    for i in range(14):
        day = i + 1
        if i < len(title_templates):
            title = title_templates[i]
        else:
            title = f"{topic} Day {day}"
        roadmap.append({"day": day, "title": title})
    
    print(f"Generated fallback roadmap for {topic}")
    return {
        "topic": topic,
        "roadmap": roadmap
    }