# Axiome Backend

Python backend for the Axiome algorithm learning platform.

## Setup

```bash
# Install dependencies
uv sync

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