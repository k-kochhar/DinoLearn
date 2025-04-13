from typing import List, Optional
from beanie import Document
from pydantic import Field

class Lesson(Document):
    day: int
    title: str
    summary: str
    lesson: List[dict]
    
    class Settings:
        name = "lessons"