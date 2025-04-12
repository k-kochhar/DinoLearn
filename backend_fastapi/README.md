# DinoLearn FastAPI Backend

This is the FastAPI implementation of the DinoLearn backend API.

## Features

- AI-powered course generation with OpenAI GPT-4 and Google Gemini
- MongoDB integration for data storage
- RESTful API for course management
- Auto-generated API documentation

## Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Create a `.env` file with the following variables:

```
PORT=5000
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

3. Run the server:

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --port 5000

# Production mode
uvicorn app.main:app --port 5000
```

## API Documentation

Once the server is running, you can access the auto-generated API documentation at:

- Swagger UI: http://localhost:5000/docs
- ReDoc: http://localhost:5000/redoc

## API Endpoints

### Roadmaps

- `GET /api/roadmaps` - Get all roadmaps
- `POST /api/roadmaps` - Create a new roadmap with topic-specific content

### Lessons

- `GET /api/lessons` - Get all lessons
- `GET /api/lessons/{lesson_id}` - Get a specific lesson by ID