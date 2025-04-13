import os
import json
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()

# We'll use Gemini for both roadmap and lesson generation
async def generate_lesson_content(day: int, title: str):
    """Generate detailed lesson content using Google's Gemini API"""
    api_key = os.getenv('GEMINI_API_KEY')
    
    if not api_key or api_key == "your_gemini_api_key_here":
        raise ValueError("GEMINI_API_KEY environment variable is not set or using placeholder value")
    
    import httpx
    
    prompt = f'''Create a detailed lesson for day {day} titled "{title}". 
    Return the result in this specific JSON format:
    {{
      "day": {day},
      "title": "{title}",
      "summary": "2-3 sentence summary of what this lesson covers",
      "lesson": [
        {{
          "section": "Introduction",
          "content": "Main content for this section"
        }},
        {{
          "section": "Key Concepts",
          "content": "Explanation of key concepts"
        }},
        {{
          "section": "Examples",
          "content": "Examples illustrating the lesson"
        }},
        {{
          "section": "Practice",
          "content": "Practice exercises to reinforce learning"
        }},
        {{
          "section": "Summary",
          "content": "Brief recap of main points"
        }}
      ]
    }}
    
    Make sure the content is educational, accurate, and appropriate for someone learning about this topic.
    '''
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}"
    
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
                return json_data
            except json.JSONDecodeError:
                pass  # Fall through to backup plan
        
        # If JSON parsing failed, create a fallback lesson
        return {
            "day": day,
            "title": title,
            "summary": f"This lesson introduces key concepts about {title}.",
            "lesson": [
                {
                    "section": "Introduction",
                    "content": f"Welcome to day {day} of our course. Today we'll learn about {title}."
                },
                {
                    "section": "Key Concepts",
                    "content": f"The main concepts to understand in {title} include the fundamental principles and applications."
                },
                {
                    "section": "Examples",
                    "content": "Examples help illustrate the concepts we're learning about."
                },
                {
                    "section": "Practice",
                    "content": "Try applying what you've learned with these practice exercises."
                },
                {
                    "section": "Summary",
                    "content": f"Today we explored {title}. Practice these concepts to reinforce your understanding."
                }
            ]
        }