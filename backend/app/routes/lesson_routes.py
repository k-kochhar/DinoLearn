from fastapi import APIRouter, HTTPException
from app.models.lesson import Lesson
from app.services.chatgpt_service import generate_lesson_plan_and_quiz
from bson import ObjectId

router = APIRouter()

@router.post("/{lesson_id}/generate")
async def generate_lesson_details(lesson_id: str):
    """Generate full lesson + quiz for a given lesson ID"""
    try:
        lesson_collection = Lesson.get_motor_collection()
        lesson_data = await lesson_collection.find_one({"_id": ObjectId(lesson_id)})

        if not lesson_data:
            raise HTTPException(status_code=404, detail="Lesson not found")

        # If lesson already generated, return it
        if lesson_data.get("lesson") and len(lesson_data["lesson"]) > 0:
            return lesson_data

        # Generate lesson
        day = lesson_data["day"]
        title = lesson_data["title"]
        topic = title.split(":")[0]  # crude fallback

        from app.services.chatgpt_service import generate_lesson_plan_and_quiz
        lesson_full = await generate_lesson_plan_and_quiz(day, title, topic)

        # Update the database
        await lesson_collection.update_one(
            {"_id": ObjectId(lesson_id)},
            {"$set": {
                "summary": lesson_full["summary"],
                "lesson": lesson_full["lesson"],
                "quiz": lesson_full["quiz"]
            }}
        )

        return lesson_full

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error generating lesson: {str(e)}")

