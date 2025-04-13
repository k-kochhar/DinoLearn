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
    """Get all roadmaps with a mock roadmap_data structure"""
    # Just get the roadmap titles
    roadmaps = await Roadmap.find_all().to_list()
    
    # Create a completely hardcoded response with formatted data
    result = []
    for roadmap in roadmaps:
        roadmap_id = str(roadmap.id)
        topic = roadmap.title.replace(" Roadmap", "")
        
        # Create sample roadmap data with 14 days
        roadmap_items = [
            {"day": 1, "title": f"What Are {topic}?"},
            {"day": 2, "title": f"History and Origins of {topic}"},
            {"day": 3, "title": f"Fundamental Concepts of {topic}"},
            {"day": 4, "title": f"Key Components of {topic}"},
            {"day": 5, "title": f"Important Types and Categories of {topic}"},
            {"day": 6, "title": f"Advanced Concepts in {topic}"},
            {"day": 7, "title": f"Practical Applications of {topic}"},
            {"day": 8, "title": f"Evolution and Development of {topic}"},
            {"day": 9, "title": f"Research Methods and Discoveries in {topic}"},
            {"day": 10, "title": f"Challenges and Solutions in {topic}"},
            {"day": 11, "title": f"Modern Developments in {topic}"},
            {"day": 12, "title": f"{topic} in Popular Culture"},
            {"day": 13, "title": f"Future Trends and Innovations in {topic}"},
            {"day": 14, "title": f"Review and Assessment of {topic}"}
        ]
        
        result.append({
            "_id": roadmap_id,
            "title": roadmap.title,
            "roadmap_data": {
                "topic": topic,
                "roadmap": roadmap_items
            }
        })
    
    return result