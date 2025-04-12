"""
Test script for API integrations
"""

import asyncio
import os
from dotenv import load_dotenv
from app.services.gemini_service import generate_roadmap_from_gemini
from app.services.chatgpt_service import generate_lesson_content

async def test_gemini_api():
    """Test connection to Google Gemini API"""
    print("\n--- Testing Gemini API ---")
    try:
        topic = "Time Management"
        print(f"Generating roadmap for: {topic}")
        roadmap_data = await generate_roadmap_from_gemini(topic)
        
        print(f"Successfully generated roadmap: {roadmap_data['title']}")
        print(f"Lesson titles generated ({len(roadmap_data['lesson_titles'])}):")
        for i, title in enumerate(roadmap_data['lesson_titles'][:3], 1):
            print(f"  {i}. {title}")
        print("...(more titles available)")
        
        return True
    except Exception as e:
        print(f"Error testing Gemini API: {str(e)}")
        return False

async def test_openai_api():
    """Test connection to OpenAI API"""
    print("\n--- Testing OpenAI API ---")
    try:
        title = "Effective Time Blocking"
        print(f"Generating lesson content for: {title}")
        lesson_content = await generate_lesson_content(title)
        
        print(f"Successfully generated lesson content.")
        print(f"Overview: {lesson_content['overview'][:100]}...")
        print(f"Questions generated ({len(lesson_content['questions'])}):")
        for i, question in enumerate(lesson_content['questions'], 1):
            print(f"  {i}. {question}")
        
        return True
    except Exception as e:
        print(f"Error testing OpenAI API: {str(e)}")
        return False

async def run_tests():
    """Run all API tests"""
    load_dotenv()
    
    print("=== DinoLearn API Integration Tests ===")
    print(f"GEMINI_API_KEY: {'Set' if os.getenv('GEMINI_API_KEY') else 'NOT SET'}")
    print(f"OPENAI_API_KEY: {'Set' if os.getenv('OPENAI_API_KEY') else 'NOT SET'}")
    
    gemini_success = await test_gemini_api()
    openai_success = await test_openai_api()
    
    print("\n=== Test Results ===")
    print(f"Gemini API: {'✅ SUCCESS' if gemini_success else '❌ FAILED'}")
    print(f"OpenAI API: {'✅ SUCCESS' if openai_success else '❌ FAILED'}")
    
    if gemini_success and openai_success:
        print("\n✅ All APIs are working correctly!")
        print("You can run the database initialization script safely.")
    else:
        print("\n❌ Some APIs are not working properly.")
        print("Please check your API keys and try again.")

if __name__ == "__main__":
    asyncio.run(run_tests())