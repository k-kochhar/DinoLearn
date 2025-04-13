from fastapi import APIRouter, HTTPException, Body, status
from app.models.lesson import Lesson
from app.services.chatgpt_service import generate_lesson_plan_and_quiz
from bson import ObjectId

router = APIRouter()

@router.post("/generate")
async def generate_lesson_by_day(
    day: int = Body(...),
    title: str = Body(...),
    topic: str = Body(...)
):
    """
    Generate or fetch detailed lesson + quiz by day/title/topic
    """
    try:
        # Check if a lesson already exists with same day/title/topic
        existing_lesson = await Lesson.find_one({
            "day": day,
            "title": title
        })

        if existing_lesson and existing_lesson.lesson:
            return existing_lesson

        # Generate new lesson using ChatGPT
        lesson_data = await generate_lesson_plan_and_quiz(day, title, topic)

        # Save new lesson if not found
        if not existing_lesson:
            new_lesson = Lesson(**lesson_data)
            await new_lesson.insert()
            return new_lesson
        else:
            # Update existing placeholder
            existing_lesson.summary = lesson_data["summary"]
            existing_lesson.lesson = lesson_data["lesson"]
            existing_lesson.quiz = lesson_data["quiz"]
            await existing_lesson.save()
            return existing_lesson

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating lesson for Day {day}: {str(e)}"
        )