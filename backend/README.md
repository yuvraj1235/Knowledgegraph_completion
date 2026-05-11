# Educational Knowledge Graph API

A FastAPI backend for an AI-powered educational knowledge graph platform.

## Features
- PDF document ingestion
- Text extraction using PyMuPDF (`fitz`)
- Topic and Subtopic hierarchy extraction using OpenAI GPT-4o
- Structured JSON responses
- Asynchronous processing
- Scalable and modular architecture

## Project Structure
- `app/main.py`: Application entrypoint and configuration.
- `app/routes/`: API endpoint definitions (e.g., `ingestion.py`).
- `app/services/`: Core logic like PDF parsing and GPT interactions.
- `app/utils/`: Shared utilities, including prompts for GPT.
- `app/models/`: Pydantic models for request/response validation.
- `app/config/`: Application settings and environment variables.
- `uploads/`: Temporary storage for uploaded PDF files.

## Setup

1. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   Update the `.env` file with your actual OpenAI API key.
   ```env
   OPENAI_API_KEY=your-api-key-here
   ```

4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

5. Access the API Docs:
   Navigate to `http://localhost:8000/docs` in your browser.
