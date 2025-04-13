#!/usr/bin/env python3
import json
import os
import ssl
import certifi
from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId

# Custom JSON encoder to handle ObjectId
class MongoJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

# Load environment variables
load_dotenv()

# Get MongoDB URI from environment
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
print(f"Connecting to MongoDB at: {mongo_uri.split('@')[1] if '@' in mongo_uri else mongo_uri}")

try:
    # Connect to MongoDB with SSL certificate verification
    client = MongoClient(
        mongo_uri,
        tlsCAFile=certifi.where()  # Use certifi for SSL certificate verification
    )
    
    # Get database name
    if "mongodb+srv://" in mongo_uri and "mongodb.net" in mongo_uri:
        db = client.get_database("dinolearn")
    else:
        db = client.dinolearn_db
        
    print("Connected to database:", db.name)
    
    # Check collections
    collections = db.list_collection_names()
    print(f"Collections in database: {collections}")
    
    # Check roadmaps collection
    if "roadmaps" in collections:
        roadmaps = list(db.roadmaps.find())
        print(f"\nFound {len(roadmaps)} roadmaps")
        
        for roadmap in roadmaps:
            roadmap_id = roadmap.get("_id")
            title = roadmap.get("title", "No title")
            lessons = roadmap.get("lessons", [])
            
            print(f"\nRoadmap: {title} (ID: {roadmap_id})")
            print(f"Lessons count: {len(lessons)}")
            
            # Check if lessons exist
            for i, lesson_ref in enumerate(lessons):
                print(f"  Lesson ref {i+1}: {lesson_ref}")
                
                # Extract lesson ID, handling different possible formats
                lesson_id = None
                if isinstance(lesson_ref, dict):
                    if "_id" in lesson_ref:
                        lesson_id = lesson_ref["_id"]
                    elif "id" in lesson_ref:
                        lesson_id = lesson_ref["id"]
                elif hasattr(lesson_ref, "id"):
                    lesson_id = lesson_ref.id
                
                # Try to find the referenced lesson
                if lesson_id:
                    try:
                        # Convert string ID to ObjectId if needed
                        if isinstance(lesson_id, str):
                            try:
                                lesson_id = ObjectId(lesson_id)
                            except Exception as e:
                                print(f"    ! Error converting ID to ObjectId: {str(e)}")
                                continue
                        
                        lesson = db.lessons.find_one({"_id": lesson_id})
                        if lesson:
                            print(f"    ✓ Found lesson: {lesson.get('title', 'No title')}")
                        else:
                            print(f"    ✗ MISSING lesson with ID: {lesson_id}")
                    except Exception as e:
                        print(f"    ! Error finding lesson: {str(e)}")
                else:
                    print(f"    ! Could not extract lesson ID from reference")
    else:
        print("No roadmaps collection found")
    
    # Check lessons collection
    if "lessons" in collections:
        lessons = list(db.lessons.find())
        print(f"\nFound {len(lessons)} lessons")
        
        for i, lesson in enumerate(lessons[:5]):  # Show just first 5 for brevity
            lesson_id = lesson.get("_id")
            title = lesson.get("title", "No title")
            print(f"  Lesson {i+1}: {title} (ID: {lesson_id})")
    else:
        print("No lessons collection found")
    
except Exception as e:
    print(f"Error connecting to MongoDB: {str(e)}")
finally:
    if 'client' in locals():
        client.close()
        print("\nMongoDB connection closed")