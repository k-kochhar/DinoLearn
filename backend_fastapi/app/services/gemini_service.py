import httpx
import os
import re
from dotenv import load_dotenv

load_dotenv()

async def generate_roadmap_from_gemini(topic: str):
    """Generate a roadmap structure using Google's Gemini API"""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={os.getenv('GEMINI_API_KEY')}"
    
    prompt = f'Create a 14-day roadmap for learning about "{topic}". Title each day and explain briefly.'
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            url,
            json={
                "contents": [{"parts": [{"text": prompt}]}]
            }
        )
        
        data = response.json()
        text = data["candidates"][0]["content"]["parts"][0]["text"]
        lines = [line for line in text.split("\n") if line.strip()]
        
        # Extract lesson titles, removing day numbers
        lesson_titles = []
        for line in lines[:14]:  # Take first 14 lines
            # Remove day numbers like "1." or "Day 1:" from the start
            clean_title = re.sub(r"^\d+\.\s*|^Day\s+\d+[:.]\s*", "", line, flags=re.IGNORECASE)
            lesson_titles.append(clean_title)
        
        return {
            "title": f"{topic} Roadmap",
            "lesson_titles": lesson_titles
        }