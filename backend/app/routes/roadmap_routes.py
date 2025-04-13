from fastapi import APIRouter, HTTPException, status, Body
from typing import Optional
from bson import ObjectId
from app.models.roadmap import Roadmap
from app.models.lesson import Lesson
from app.services.gemini_service import generate_roadmap_from_gemini
from app.services.chatgpt_service import generate_lesson_plan_and_quiz

router = APIRouter()

@router.post("/", response_model=Roadmap)
async def create_roadmap(topic: str = Body(..., embed=True)):
    try:
        roadmap_data = await generate_roadmap_from_gemini(topic)

        lesson_refs = []
        for item in roadmap_data["roadmap"]:
            day = item["day"]
            title = item["title"]
            # Store just placeholders for now
            lesson = Lesson(
                day=day,
                title=title,
                summary="",
                lesson=[],
                quiz=[]
            )
            await lesson.insert()
            lesson_refs.append(lesson)

        roadmap = Roadmap(
            title=f"{roadmap_data['topic']} Roadmap",
            lessons=lesson_refs
        )
        await roadmap.insert()

        return roadmap

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create roadmap: {str(e)}")

@router.get("/")
async def get_roadmaps(title: Optional[str] = None):
    """Retrieve all roadmaps with their lesson summaries (sorted by day)"""
    try:
        query = {}
        if title:
            query["title"] = {"$regex": title, "$options": "i"}

        roadmaps_collection = Roadmap.get_motor_collection()
        roadmaps_data = await roadmaps_collection.find(query).sort("title", 1).to_list(length=None)

        result = []
        for raw_roadmap in roadmaps_data:
            try:
                roadmap_id = str(raw_roadmap.get("_id", "unknown"))
                roadmap_title = raw_roadmap.get("title", "Untitled Roadmap")
                topic = roadmap_title.replace(" Roadmap", "").strip() or "Untitled"

                # ⛓️ Fetch all linked lessons
                lesson_refs = raw_roadmap.get("lessons", [])
                lessons = []

                for lesson_ref in lesson_refs:
                    lesson_id = None
                    if isinstance(lesson_ref, dict) and "_id" in lesson_ref:
                        lesson_id = lesson_ref["_id"]
                    elif isinstance(lesson_ref, str):
                        lesson_id = lesson_ref
                    
                    if lesson_id:
                        lesson_data = await Lesson.get_motor_collection().find_one({"_id": lesson_id})
                        if lesson_data:
                            lessons.append({
                                "day": lesson_data.get("day", 0),
                                "title": lesson_data.get("title", "Untitled"),
                                "summary": lesson_data.get("summary", ""),
                            })

                sorted_lessons = sorted(lessons, key=lambda x: x["day"])
                result.append({
                    "_id": roadmap_id,
                    "title": roadmap_title,
                    "roadmap_data": {
                        "topic": topic,
                        "roadmap": sorted_lessons
                    }
                })

            except Exception as e:
                print(f"⚠️ Skipping roadmap due to error: {str(e)}")
                continue

        return result

    except Exception as e:
        print(f"❌ Failed to fetch roadmaps: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving roadmaps: {str(e)}"
        )

@router.get("/{roadmap_id}")
async def get_roadmap_by_id(roadmap_id: str):
    """Retrieve a specific roadmap by its ID"""
    try:
        # Convert string ID to ObjectId
        roadmap_obj_id = ObjectId(roadmap_id)
        
        # Get the roadmap
        roadmaps_collection = Roadmap.get_motor_collection()
        roadmap = await roadmaps_collection.find_one({"_id": roadmap_obj_id})
        
        if not roadmap:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Roadmap with ID {roadmap_id} not found"
            )
        
        # Format the response
        formatted_roadmap = {
            "_id": str(roadmap.get("_id", "unknown")),
            "title": roadmap.get("title", "Untitled Roadmap"),
        }
        
        # Get the topic from the title
        topic = roadmap.get("title", "").replace(" Roadmap", "").strip() or "Untitled"
        
        # Process lessons
        lesson_refs = roadmap.get("lessons", [])
        lessons = []
        
        for lesson_ref in lesson_refs:
            lesson_id = None
            if isinstance(lesson_ref, dict) and "_id" in lesson_ref:
                lesson_id = lesson_ref["_id"]
            elif isinstance(lesson_ref, str):
                lesson_id = lesson_ref
            
            if lesson_id:
                lesson_data = await Lesson.get_motor_collection().find_one({"_id": lesson_id})
                if lesson_data:
                    lessons.append({
                        "day": lesson_data.get("day", 0),
                        "title": lesson_data.get("title", "Untitled"),
                        "summary": lesson_data.get("summary", ""),
                        "_id": str(lesson_data.get("_id", "unknown"))
                    })
        
        # Sort lessons by day
        sorted_lessons = sorted(lessons, key=lambda x: x["day"])
        
        # Add roadmap data to the response
        formatted_roadmap["roadmap_data"] = {
            "topic": topic,
            "roadmap": sorted_lessons
        }
        
        return formatted_roadmap
        
    except Exception as e:
        print(f"❌ Failed to fetch roadmap: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving roadmap: {str(e)}"
        )
