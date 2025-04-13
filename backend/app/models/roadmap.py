from typing import List, Optional, Dict, Any
from beanie import Document, Link
from pydantic import Field, computed_field
from app.models.lesson import Lesson

class Roadmap(Document):
    title: str
    lessons: List[Link[Lesson]]
    
    @computed_field
    def roadmap_data(self) -> Dict[str, Any]:
        """Return the roadmap in the desired format for the frontend"""
        topic = self.title.replace(" Roadmap", "")
        roadmap_items = []
        
        # Convert lessons to roadmap items with day and title
        for lesson in self.lessons:
            if hasattr(lesson, "day") and hasattr(lesson, "title"):
                roadmap_items.append({
                    "day": lesson.day,
                    "title": lesson.title
                })
        
        return {
            "topic": topic,
            "roadmap": roadmap_items
        }
    
    class Settings:
        name = "roadmaps"
        
        # Customize the serialization to include computed fields
        model_dump_config = {
            "by_alias": True,
            "exclude_unset": False,
            "exclude_defaults": False,
            "exclude_none": False,
            "extras": "include"
        }