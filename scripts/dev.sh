#!/bin/bash

# Function to stop containers on exit
cleanup() {
  echo "Stopping docker containers..."
  docker-compose down
}

# Trap EXIT signal (happens on script finish or interruption)
trap cleanup EXIT

# Start Docker containers in the background
echo "Starting database..."
docker-compose up -d

# Wait a moment for DB to initialize (optional, but good practice)
echo "Waiting for database..."
sleep 2

# Start the NestJS application
echo "Starting application..."
pnpm start:dev
