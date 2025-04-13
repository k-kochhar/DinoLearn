from fastapi import APIRouter, HTTPException, status, Body
from typing import List
from app.models.roadmap import Roadmap
from app.models.lesson import Lesson
from app.services.gemini_service import generate_roadmap_from_gemini

router = APIRouter()

class TopicRequest:
    def __init__(self, topic: str):
        self.topic = topic

@router.post("/", response_model=Roadmap)
async def create_roadmap(topic: str = Body(..., embed=True)):
    """Create a new roadmap with AI-generated lessons based on a topic"""
    try:
        # Generate roadmap structure using Gemini
        roadmap_data = await generate_roadmap_from_gemini(topic)
        
        # Create lesson objects from roadmap data
        lesson_objects = []
        for item in roadmap_data["roadmap"]:
            day = item["day"]
            title = item["title"]
            
            # Create lesson with minimal data (no detailed content)
            lesson = Lesson(
                day=day,
                title=title,
                summary=f"Day {day}: {title}",  # Simple summary with title
                lesson=[]  # Empty lesson content - will be populated later
            )
            await lesson.insert()
            lesson_objects.append(lesson)
            
        # Create and save roadmap
        roadmap = Roadmap(
            title=f"{roadmap_data['topic']} Roadmap",
            lessons=lesson_objects
        )
        await roadmap.insert()
        
        return roadmap
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate roadmap: {str(e)}"
        )

@router.get("/")
async def get_roadmaps():
    """Get all roadmaps with their actual lesson data"""
    # Get all roadmaps and their lessons
    roadmaps = await Roadmap.find_all().to_list()
    
    result = []
    for roadmap in roadmaps:
        roadmap_id = str(roadmap.id)
        topic = roadmap.title.replace(" Roadmap", "")
        
        # Collect the actual lessons from the database for this roadmap
        roadmap_items = []
        
        # Sort lessons by day if they exist
        if roadmap.lessons:
            # Fetch all lessons and convert to regular Python objects
            lessons = []
            for lesson_link in roadmap.lessons:
                # Get the lesson document by ID
                lesson = await Lesson.get(lesson_link.id)
                if lesson:
                    lessons.append({
                        "day": lesson.day,
                        "title": lesson.title
                    })
            
            # Sort by day number
            roadmap_items = sorted(lessons, key=lambda x: x["day"])
        
        # If no lessons found (which shouldn't happen), generate some using the API
        if not roadmap_items:
            # Regenerate roadmap data using the Gemini API
            try:
                generated_data = await generate_roadmap_from_gemini(topic)
                roadmap_items = generated_data["roadmap"]
            except Exception as e:
                # Fallback to a generic structure if API fails
                roadmap_items = [
                    {"day": 1, "title": f"Introduction to {topic}"},
                    {"day": 14, "title": f"Mastering Advanced {topic} Concepts"}
                ]
                # Add some generic days in between
                for i in range(2, 14):
                    roadmap_items.append({"day": i, "title": f"Learning {topic}: Day {i}"})
        
        result.append({
            "_id": roadmap_id,
            "title": roadmap.title,
            "roadmap_data": {
                "topic": topic,
                "roadmap": roadmap_items
            }
        })
    
    return result