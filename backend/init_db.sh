#!/bin/bash
# Initialize DinoLearn database with sample data

# First test API connections
echo "Testing API connections..."
python -m app.test_apis

# Ask for confirmation before proceeding
echo ""
read -p "Do you want to continue with database initialization? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Database initialization cancelled."
    exit 0
fi

# Initialize database
echo ""
echo "Initializing DinoLearn database..."
python -m app.db_init

echo ""
echo "Database initialization complete."
echo "You can now start the server with: ./run.sh"