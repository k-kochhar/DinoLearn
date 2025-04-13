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
    
    # Format the response to include the roadmap_data field
    formatted_roadmaps = []
    for roadmap in roadmaps:
        # Get the raw model with both the original fields and computed fields
        roadmap_dict = roadmap.model_dump(by_alias=True, exclude_unset=False)
        
        # Include the roadmap_data field in the response
        if not hasattr(roadmap, "roadmap_data"):
            # Generate the roadmap_data on-the-fly if needed
            topic = roadmap.title.replace(" Roadmap", "")
            roadmap_items = []
            for lesson in roadmap.lessons:
                if hasattr(lesson, "day") and hasattr(lesson, "title"):
                    roadmap_items.append({
                        "day": lesson.day,
                        "title": lesson.title
                    })
            roadmap_dict["roadmap_data"] = {
                "topic": topic,
                "roadmap": roadmap_items
            }
            
        formatted_roadmaps.append(roadmap_dict)
    
    return formatted_roadmaps