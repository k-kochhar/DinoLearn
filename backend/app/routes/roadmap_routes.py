from fastapi import APIRouter, HTTPException, status, Body
from typing import List, Dict, Any, Optional
from app.models.roadmap import Roadmap
from app.models.lesson import Lesson
from app.services.gemini_service import generate_roadmap_from_gemini
from typing import Optional

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
async def get_roadmaps(title: Optional[str] = None):
    """Get all roadmaps or a specific roadmap by title with their actual lesson data"""
    try:
        # Create a filter query
        query = {}
        if title:
            # Case-insensitive search for the title
            query["title"] = {"$regex": title, "$options": "i"}
            
        # Get roadmaps as raw dictionaries to bypass validation
        roadmaps_collection = Roadmap.get_motor_collection()
        roadmaps_data = await roadmaps_collection.find(query).sort("title", 1).to_list(length=None)
        
        result = []
        for raw_roadmap in roadmaps_data:
            try:
                # Convert ObjectId to string
                roadmap_id = str(raw_roadmap.get("_id", "unknown"))
                
                # Extract title and topic
                roadmap_title = raw_roadmap.get("title", "Untitled Roadmap")
                topic = roadmap_title.replace(" Roadmap", "").strip() or "Untitled Topic"
                
                # Collect the actual lessons from the database for this roadmap
                roadmap_items = []
                
                # Process lessons if they exist
                lesson_links = raw_roadmap.get("lessons", [])
                if lesson_links:
                    # Fetch all lessons and convert to regular Python objects
                    lessons = []
                    for lesson_link in lesson_links:
                        try:
                            # Get lesson ID from the link
                            lesson_id = None
                            if isinstance(lesson_link, dict) and "_id" in lesson_link:
                                lesson_id = lesson_link["_id"]
                            
                            if lesson_id:
                                # Get the lesson document by ID
                                lesson_collection = Lesson.get_motor_collection()
                                lesson_data = await lesson_collection.find_one({"_id": lesson_id})
                                
                                if lesson_data:
                                    # Extract day and title
                                    day = lesson_data.get("day", 0)
                                    lesson_title = lesson_data.get("title", "Untitled Lesson")
                                    
                                    lessons.append({
                                        "day": day,
                                        "title": lesson_title
                                    })
                        except Exception as e:
                            print(f"Error getting lesson: {str(e)}")
                            continue
                    
                    # Sort by day number
                    if lessons:
                        roadmap_items = sorted(lessons, key=lambda x: x["day"])
                
                # If no lessons found, generate some using the API
                if not roadmap_items:
                    # Regenerate roadmap data using the Gemini API
                    try:
                        generated_data = await generate_roadmap_from_gemini(topic)
                        roadmap_items = generated_data["roadmap"]
                    except Exception as e:
                        print(f"Error regenerating roadmap: {str(e)}")
                        # Fallback to a generic structure if API fails
                        roadmap_items = [
                            {"day": 1, "title": f"Introduction to {topic}"},
                            {"day": 14, "title": f"Mastering Advanced {topic} Concepts"}
                        ]
                        # Add some generic days in between
                        for i in range(2, 14):
                            roadmap_items.append({"day": i, "title": f"Learning {topic}: Day {i}"})
                
                # Ensure roadmap items are sorted by day
                sorted_roadmap_items = sorted(roadmap_items, key=lambda x: x.get("day", 0))
                
                # Add to results
                result.append({
                    "_id": roadmap_id,
                    "title": roadmap_title,
                    "roadmap_data": {
                        "topic": topic,
                        "roadmap": sorted_roadmap_items
                    }
                })
            except Exception as e:
                print(f"Error processing roadmap: {str(e)}")
                continue  # Skip this roadmap but continue with others
        
        return result
    except Exception as e:
        print(f"Error in get_roadmaps: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving roadmaps: {str(e)}"
        )