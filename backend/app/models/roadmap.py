from typing import List, Optional, Dict, Any
from beanie import Document, Link
from pydantic import Field, computed_field
from app.models.lesson import Lesson

class Roadmap(Document):
    title: str = ""
    lessons: List[Link[Lesson]] = Field(default_factory=list)
    
    @computed_field
    def roadmap_data(self) -> Dict[str, Any]:
        """Return the roadmap in the desired format for the frontend"""
        title = self.title if hasattr(self, "title") else ""
        topic = title.replace(" Roadmap", "").strip() or "Untitled Topic"
        roadmap_items = []
        
        # Convert lessons to roadmap items with day and title
        if hasattr(self, "lessons") and self.lessons:
            for lesson in self.lessons:
                try:
                    if hasattr(lesson, "day") and hasattr(lesson, "title"):
                        roadmap_items.append({
                            "day": lesson.day,
                            "title": lesson.title
                        })
                except Exception as e:
                    print(f"Error processing lesson in computed_field: {str(e)}")
                    continue
        
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