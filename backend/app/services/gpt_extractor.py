from openai import AsyncOpenAI
import json
import logging
from app.config.settings import settings
from app.utils.prompts import EXTRACTION_PROMPT

logger = logging.getLogger(__name__)

client = AsyncOpenAI(
    api_key=settings.OPENAI_API_KEY,
    base_url=settings.BASE_URL if settings.BASE_URL else None
)

async def extract_topics(text: str) -> dict:
    """
    Sends text to GPT-4o and extracts structured JSON with topics and subtopics.
    """
    try:
        # The free API limits prompt tokens to 4096. We truncate the text to ~8000 characters
        # to ensure the prompt and text fit within this limit safely.
        if len(text) > 8000:
            logger.warning(f"Text too long ({len(text)} chars). Truncating to 8000 characters to fit API limits.")
            text = text[:8000] + "\n...[Content Truncated due to API token limits]..."

        response = await client.chat.completions.create(
            model=settings.MODEL,
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output structured JSON."},
                {"role": "user", "content": f"{EXTRACTION_PROMPT}\n\nText to analyze:\n{text}"}
            ],
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        if not content:
            raise ValueError("Received empty response from OpenAI.")
            
        # Clean potential markdown formatting
        cleaned_content = content.strip()
        if cleaned_content.startswith("```json"):
            cleaned_content = cleaned_content[7:]
        if cleaned_content.startswith("```"):
            cleaned_content = cleaned_content[3:]
        if cleaned_content.endswith("```"):
            cleaned_content = cleaned_content[:-3]
            
        return json.loads(cleaned_content.strip())
        
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from GPT response: {e}")
        raise ValueError("GPT response was not valid JSON.")
    except Exception as e:
        logger.error(f"Error during GPT extraction: {e}")
        raise ValueError(f"Failed to extract topics: {str(e)}")
