from fastapi import APIRouter, HTTPException, status, Body
from typing import List
from app.models.roadmap import Roadmap
from app.models.lesson import Lesson
from app.services.gemini_service import generate_roadmap_from_gemini
from app.services.chatgpt_service import generate_lesson_content

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
        
        # Generate lessons using Gemini
        lesson_objects = []
        for item in roadmap_data["roadmap"]:
            day = item["day"]
            title = item["title"]
            
            # Generate detailed lesson content
            lesson_content = await generate_lesson_content(day, title)
            
            # Create and save lesson
            lesson = Lesson(
                day=lesson_content["day"],
                title=lesson_content["title"],
                summary=lesson_content["summary"],
                lesson=lesson_content["lesson"]
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

@router.get("/", response_model=List[Roadmap])
async def get_roadmaps():
    """Get all roadmaps with their lessons"""
    roadmaps = await Roadmap.find_all().to_list()
    return roadmaps