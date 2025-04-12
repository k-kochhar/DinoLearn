from typing import List, Optional
from beanie import Document, Link
from pydantic import Field
from app.models.lesson import Lesson

class Roadmap(Document):
    title: str
    lessons: List[Link[Lesson]]
    
    class Settings:
        name = "roadmaps"