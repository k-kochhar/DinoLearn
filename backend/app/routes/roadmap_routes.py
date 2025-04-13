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
    # Get all roadmaps with their linked lessons
    roadmaps = await Roadmap.find_all().to_list()
    
    # Get all lesson documents
    all_lessons = await Lesson.find_all().to_list()
    # Create a map for quick lookup
    lesson_map = {str(lesson.id): lesson for lesson in all_lessons}
    
    # Format the response
    result = []
    for roadmap in roadmaps:
        # Manually create a simple structure for each roadmap
        roadmap_id = str(roadmap.id)
        topic = roadmap.title.replace(" Roadmap", "")
        
        # Get lesson data from each roadmap
        lesson_docs = []
        
        # Loop through all lessons and find ones related to this roadmap
        for lesson in all_lessons:
            lesson_docs.append({
                "day": lesson.day,
                "title": lesson.title
            })
        
        # Sort by day
        lesson_docs.sort(key=lambda x: x["day"])
        
        # Add to result
        result.append({
            "_id": roadmap_id,
            "title": roadmap.title,
            "roadmap_data": {
                "topic": topic,
                "roadmap": lesson_docs
            }
        })
    
    return result