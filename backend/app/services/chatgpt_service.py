import os
import json
import re
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

openai = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def generate_lesson_plan_and_quiz(day: int, title: str, topic: str):
    """
    Uses ChatGPT API to generate a detailed lesson plan + quiz for a given topic/day
    """
    prompt = f"""
Create a detailed lesson plan and quiz for Day {day} titled "{title}" in the topic of "{topic}".

Return the following JSON format:

{{
  "day": {day},
  "title": "{title}",
  "summary": "Short summary of the lesson",
  "lesson": [
    {{
      "section": "Introduction",
      "content": "..."
    }},
    {{
      "section": "Key Concepts",
      "content": "..."
    }},
    {{
      "section": "Examples",
      "content": "..."
    }},
    {{
      "section": "Practice",
      "content": "..."
    }},
    {{
      "section": "Summary",
      "content": "..."
    }}
  ],
  "quiz": [
    {{
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "B"
    }},
    ...
  ]
}}

Generate 3-5 quiz questions with multiple choice answers at the end.
Be concise, technical, and follow the JSON format **exactly**.
"""

    response = await openai.chat.completions.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    text = response.choices[0].message.content.strip()

    # Extract JSON if ChatGPT adds extra text
    match = re.search(r'({[\s\S]*})', text)
    if match:
        try:
            return json.loads(match.group(1))
        except json.JSONDecodeError:
            pass

    # fallback
    return {
        "day": day,
        "title": title,
        "summary": f"This lesson covers the key ideas of {title}.",
        "lesson": [
            {"section": "Introduction", "content": f"Welcome to {title}."},
            {"section": "Key Concepts", "content": "Key ideas and theory."},
            {"section": "Examples", "content": "Example-driven explanations."},
            {"section": "Practice", "content": "Hands-on practice ideas."},
            {"section": "Summary", "content": "Key takeaways."},
        ],
        "quiz": []
    }
