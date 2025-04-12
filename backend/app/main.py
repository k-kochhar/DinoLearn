from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import motor.motor_asyncio
from beanie import init_beanie
import os
from dotenv import load_dotenv

from app.models.lesson import Lesson
from app.models.roadmap import Roadmap
from app.routes import lesson_routes, roadmap_routes

# Load environment variables
load_dotenv()

# Create FastAPI application
app = FastAPI(
    title="DinoLearn API",
    description="API for the DinoLearn educational platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection setup
@app.on_event("startup")
async def startup_db_client():
    # Get MongoDB URI from environment variable
    mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    app.mongodb_client = motor.motor_asyncio.AsyncIOMotorClient(mongo_uri)
    
    # Extract database name from connection string or use default
    if "mongodb+srv://" in mongo_uri and "mongodb.net" in mongo_uri:
        # For MongoDB Atlas connections, use the same database as connection
        app.mongodb = app.mongodb_client.get_database("dinolearn")
    else:
        # For local connections, use dinolearn_db
        app.mongodb = app.mongodb_client.dinolearn_db
    
    # Initialize Beanie with our document models
    await init_beanie(
        database=app.mongodb,
        document_models=[Lesson, Roadmap]
    )
    
    # Log connection info (hide password)
    safe_uri = mongo_uri.split('@')[1] if '@' in mongo_uri else mongo_uri
    print(f"Connected to MongoDB at: {safe_uri}")

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
    print("MongoDB connection closed")

# Include our API routes
app.include_router(
    roadmap_routes.router,
    prefix="/api/roadmaps",
    tags=["roadmaps"]
)

app.include_router(
    lesson_routes.router,
    prefix="/api/lessons",
    tags=["lessons"]
)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to DinoLearn API. Visit /docs for API documentation."}

# Run the application 
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)