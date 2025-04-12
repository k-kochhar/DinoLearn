from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.lesson import Lesson

router = APIRouter()

@router.get("/", response_model=List[Lesson])
async def get_lessons():
    """Get all lessons"""
    lessons = await Lesson.find_all().to_list()
    return lessons

@router.get("/{lesson_id}", response_model=Lesson)
async def get_lesson(lesson_id: str):
    """Get a specific lesson by ID"""
    lesson = await Lesson.get(lesson_id)
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found"
        )
    return lesson