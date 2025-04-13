from fastapi import APIRouter
from app.services.chatgpt_service import generate_lesson_plan_and_quiz

router = APIRouter()

@router.post("/test/lesson")
async def test_lesson_generation(data: dict):
    day = data.get("day", 1)
    title = data.get("title", "Dynamic Programming")
    topic = data.get("topic", "Algorithms")
    result = await generate_lesson_plan_and_quiz(day, title, topic)
    return result
