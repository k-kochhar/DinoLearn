#!/bin/bash
# Start DinoLearn FastAPI backend

# Kill existing process on port 8000 if running
PID=$(lsof -t -i:8000 || echo "")
if [ -n "$PID" ]; then
  echo "Killing process $PID on port 8000"
  kill -9 $PID 2>/dev/null || true
fi

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Start the server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
