import os
from openai import AsyncOpenAI
from dotenv import load_dotenv
import re

load_dotenv()

# Initialize OpenAI client
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def generate_lesson_content(title: str):
    """Generate detailed lesson content using OpenAI API"""
    prompt = f"""Generate an in-depth explanation and a quiz with 2 questions for a lesson titled "{title}". Include:
- Overview
- Two key questions"""

    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
    )

    output = response.choices[0].message.content
    lines = output.split("\n")
    
    # Find overview line
    overview_part = ""
    for line in lines:
        if line.strip() and not line.strip().startswith("#"):
            overview_part = line.replace("Overview: ", "").strip()
            break
    
    # Extract questions
    questions = []
    for line in lines:
        # Look for numbered questions or bullet points
        if re.search(r"^\d+\.\s+", line) or line.strip().startswith("- "):
            # Remove numbers, bullets and clean up
            clean_question = re.sub(r"^\d+\.\s+|^-\s+", "", line).strip()
            if clean_question:
                questions.append(clean_question)
    
    # If we couldn't extract questions properly, create default ones
    if len(questions) < 2:
        questions = [
            f"What are the key concepts of {title}?",
            f"How can you apply {title} in practical scenarios?"
        ]
    
    return {
        "title": title,
        "overview": overview_part,
        "questions": questions[:2]  # Ensure we only have 2 questions
    }