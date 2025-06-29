#!/bin/bash

# Setup script for the project

# Function to check existence of a command
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for Node.js and npm
if ! command_exists node; then
    echo "Error: Node.js is not installed or not in PATH." >&2
    exit 1
fi

if ! command_exists npm; then
    echo "Error: npm is not installed or not in PATH." >&2
    exit 1
fi

# Install npm dependencies if node_modules directory is missing
if [ ! -d node_modules ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Create directories data and fotky if they do not exist
for dir in data fotky; do
    if [ ! -d "$dir" ]; then
        echo "Creating directory $dir"
        mkdir -p "$dir"
    fi
done

echo "Setup completed." 
