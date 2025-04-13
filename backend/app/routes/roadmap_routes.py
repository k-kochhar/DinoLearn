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
    """Get all roadmaps with their lessons in the desired format"""
    roadmaps = await Roadmap.find_all().to_list()
    
    # Use a simpler approach to avoid serialization issues
    result = []
    for roadmap in roadmaps:
        # Fetch the actual lesson documents
        lesson_docs = []
        for lesson_link in roadmap.lessons:
            # Convert DBRef to string to avoid serialization issues
            lesson_id = str(lesson_link.id)
            lesson = await Lesson.get(lesson_id)
            if lesson:
                lesson_docs.append({
                    "day": lesson.day,
                    "title": lesson.title
                })
        
        # Create a clean dictionary for the response
        topic = roadmap.title.replace(" Roadmap", "")
        result.append({
            "_id": str(roadmap.id),
            "title": roadmap.title,
            "roadmap_data": {
                "topic": topic,
                "roadmap": lesson_docs
            }
        })
    
    return result