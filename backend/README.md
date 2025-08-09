# Axiome Backend

Python backend for the Axiome algorithm learning platform.

## Setup

```bash
# Setup

# Install dependencies
uv sync

# Virtual environment
source .venv/bin/activate  # On Windows: source .venv/Scripts/activate

# Add a new dependency
uv add package-name

# Add a development dependency
uv add --dev pytest

# Update dependencies
uv sync --upgrade

# Run tests
uv run pytest

# Run the application
uv run python -m axiome_backend.main

# Development

# Run linting
uv run ruff check .

# Format code
uv run black .

# Type checking
uv run mypy .