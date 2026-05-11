import fitz  # PyMuPDF
import asyncio
import logging

logger = logging.getLogger(__name__)

def _extract_text_sync(file_content: bytes) -> str:
    """
    Synchronous function to extract text from a PDF stream using PyMuPDF.
    """
    try:
        doc = fitz.open(stream=file_content, filetype="pdf")
        text_chunks = []
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text_chunks.append(page.get_text())
        
        return "\n".join(text_chunks)
    except Exception as e:
        logger.error(f"PyMuPDF extraction error: {e}")
        raise ValueError(f"Failed to parse PDF: {str(e)}")

async def parse_pdf(file_content: bytes) -> str:
    """
    Asynchronously parse PDF bytes to extract text.
    Runs in a thread pool to prevent blocking the event loop.
    """
    # Using asyncio.to_thread to run the synchronous CPU-bound task
    return await asyncio.to_thread(_extract_text_sync, file_content)
