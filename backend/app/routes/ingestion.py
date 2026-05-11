from fastapi import APIRouter, UploadFile, File, HTTPException, status
from app.services.pdf_parser import parse_pdf
from app.services.gpt_extractor import extract_topics
from app.models.topic_model import IngestionResponse, ExtractedTopics
import logging
import os
import aiofiles
from uuid import uuid4

router = APIRouter(prefix="/ingest", tags=["Ingestion"])
logger = logging.getLogger(__name__)

UPLOAD_DIR = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("", response_model=IngestionResponse)
async def ingest_pdf(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Unsupported file format. Please upload a PDF file."
        )
    
    try:
        content = await file.read()
        if not content:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty."
            )
            
        # Optional: Save file to uploads directory
        file_id = str(uuid4())
        safe_filename = file.filename.replace(" ", "_") if file.filename else "upload.pdf"
        file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{safe_filename}")
        
        async with aiofiles.open(file_path, 'wb') as f:
            await f.write(content)
            
        # Parse PDF
        try:
            transcript = await parse_pdf(content)
        except ValueError as e:
            logger.error(f"PDF parsing error: {e}")
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=str(e)
            )
            
        if not transcript.strip():
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Could not extract any text from the PDF."
            )
            
        # Extract Topics via GPT-4o
        try:
            topics_data = await extract_topics(transcript)
        except ValueError as e:
            logger.error(f"GPT extraction error: {e}")
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=str(e)
            )
            
        return IngestionResponse(
            transcript=transcript,
            extracted_topics=ExtractedTopics(**topics_data)
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions to be handled by FastAPI
        raise
    except Exception as e:
        logger.error(f"Unexpected error during ingestion: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred processing the upload."
        )
