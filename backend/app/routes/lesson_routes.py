from fastapi import APIRouter, HTTPException, Body, status
from app.models.lesson import Lesson
from app.services.chatgpt_service import generate_lesson_plan_and_quiz
from bson import ObjectId

router = APIRouter()
@router.post("/complete/{id}")
async def complete_lesson(id: str):
    try:
        lesson_obj_id = ObjectId(id)
        lessons_collection = Lesson.get_motor_collection()

        result = await lessons_collection.update_one(
            {"_id": lesson_obj_id},
            {"$set": {"completed": True}}
        )

        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Lesson with ID {id} not found"
            )

        return {"message": f"Lesson {id} marked as completed ✅"}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error completing lesson: {str(e)}"
        )
@router.post("/generate/{id}")
async def generate_lesson_by_id(id: str):
    """
    Generate detailed content for a specific lesson by ObjectId
    """
    try:
        lesson_id = ObjectId(id)
        lesson_collection = Lesson.get_motor_collection()

        lesson_data = await lesson_collection.find_one({"_id": lesson_id})

        if not lesson_data:
            raise HTTPException(status_code=404, detail="Lesson not found")

        if lesson_data.get("lesson") and len(lesson_data["lesson"]) > 0:
            return lesson_data  # Already generated

        # Generate using ChatGPT
        day = lesson_data.get("day")
        title = lesson_data.get("title")
        topic = title.split(":")[0].strip()  # crude fallback from title

        generated = await generate_lesson_plan_and_quiz(day, title, topic)

        # Update lesson in DB
        await lesson_collection.update_one(
            {"_id": lesson_id},
            {"$set": {
                "summary": generated["summary"],
                "lesson": generated["lesson"],
                "quiz": generated["quiz"]
            }}
        )

        return generated

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error generating lesson: {str(e)}"
        )
    
@router.get("/{id}")
async def get_lesson_by_id(id: str):
    """
    Get the full lesson document by ObjectId
    """
    try:
        lesson_id = ObjectId(id)
        lesson_data = await Lesson.get_motor_collection().find_one({"_id": lesson_id})

        if not lesson_data:
            raise HTTPException(status_code=404, detail="Lesson not found")

        # Convert ObjectId to string before returning
        lesson_data["_id"] = str(lesson_data["_id"])
        return lesson_data

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving lesson: {str(e)}"
        )


# @router.post("/generate")
# async def generate_lesson_by_day(
#     day: int = Body(...),
#     title: str = Body(...),
#     topic: str = Body(...)
# ):
#     """
#     Generate or fetch detailed lesson + quiz by day/title/topic
#     """
#     try:
#         # Check if a lesson already exists with same day/title/topic
#         existing_lesson = await Lesson.find_one({
#             "day": day,
#             "title": title
#         })

#         if existing_lesson and existing_lesson.lesson:
#             return existing_lesson

#         # Generate new lesson using ChatGPT
#         lesson_data = await generate_lesson_plan_and_quiz(day, title, topic)

#         # Save new lesson if not found
#         if not existing_lesson:
#             new_lesson = Lesson(**lesson_data)
#             await new_lesson.insert()
#             return new_lesson
#         else:
#             # Update existing placeholder
#             existing_lesson.summary = lesson_data["summary"]
#             existing_lesson.lesson = lesson_data["lesson"]
#             existing_lesson.quiz = lesson_data["quiz"]
#             await existing_lesson.save()
#             return existing_lesson

#     except Exception as e:
#         import traceback
#         traceback.print_exc()
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Error generating lesson for Day {day}: {str(e)}"
#         )