from typing import List, Optional
from beanie import Document
from pydantic import Field

class Lesson(Document):
    title: str
    overview: str
    questions: List[str]
    
    class Settings:
        name = "lessons"