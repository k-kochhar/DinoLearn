"""
Database initialization script for DinoLearn

This script will connect to your MongoDB cluster and populate it with sample data.
"""

import asyncio
import os
import motor.motor_asyncio
from beanie import init_beanie
from dotenv import load_dotenv

from app.models.lesson import Lesson
from app.models.roadmap import Roadmap
from app.services.gemini_service import generate_roadmap_from_gemini
from app.services.chatgpt_service import generate_lesson_content

# Sample topics for initialization
SAMPLE_TOPICS = [
    "Effective Study Techniques",  # Smaller, more focused topic for quick generation
]

async def generate_roadmap(topic: str):
    """Generate a roadmap and its lessons for a given topic"""
    print(f"Generating roadmap for: {topic}")
    
    # Generate roadmap structure using Gemini
    roadmap_data = await generate_roadmap_from_gemini(topic)
    
    # Generate lessons using ChatGPT (limit to 2 for sample data to conserve API calls)
    lesson_objects = []
    for title in roadmap_data["lesson_titles"][:2]:  # Just first 2 lessons for sample data
        print(f"  Creating lesson: {title}")
        try:
            # Try to use AI to generate content
            lesson_content = await generate_lesson_content(title)
            
            # Create and save lesson
            lesson = Lesson(
                title=lesson_content["title"],
                overview=lesson_content["overview"],
                questions=lesson_content["questions"]
            )
        except Exception as e:
            print(f"  Error generating AI content for {title}: {str(e)}")
            print(f"  Falling back to template content")
            
            # Fallback to template content if AI generation fails
            lesson = Lesson(
                title=title,
                overview=f"Basic overview of {title}. This lesson covers fundamental concepts and practical applications.",
                questions=[
                    f"What are the key principles of {title}?",
                    f"How can you apply {title} in real-world scenarios?"
                ]
            )
        
        await lesson.insert()
        lesson_objects.append(lesson)
        
    # Create and save roadmap
    roadmap = Roadmap(
        title=roadmap_data["title"],
        lessons=lesson_objects
    )
    await roadmap.insert()
    
    print(f"Created roadmap: {roadmap.title} with {len(lesson_objects)} lessons")
    return roadmap

async def init_database():
    """Initialize the database with sample data"""
    # Load environment variables
    load_dotenv()
    
    # MongoDB connection
    mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    
    print(f"Connecting to MongoDB...")
    client = motor.motor_asyncio.AsyncIOMotorClient(mongo_uri)
    
    # Extract database name from connection string or use default
    if "mongodb+srv://" in mongo_uri and "mongodb.net" in mongo_uri:
        db = client.get_database("dinolearn")
    else:
        db = client.dinolearn_db
    
    # Initialize Beanie
    await init_beanie(
        database=db,
        document_models=[Lesson, Roadmap]
    )
    
    # Check if we already have data
    existing_roadmaps = await Roadmap.find_all().count()
    if existing_roadmaps > 0:
        print(f"Database already contains {existing_roadmaps} roadmaps. Skipping initialization.")
        return
    
    # Generate roadmaps for sample topics
    for topic in SAMPLE_TOPICS:
        try:
            await generate_roadmap(topic)
        except Exception as e:
            print(f"Error generating roadmap for {topic}: {str(e)}")
    
    # Print summary
    roadmap_count = await Roadmap.find_all().count()
    lesson_count = await Lesson.find_all().count()
    print(f"Database initialized with {roadmap_count} roadmaps and {lesson_count} lessons")

if __name__ == "__main__":
    asyncio.run(init_database())