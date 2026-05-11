from openai import AsyncOpenAI
import json
import logging
from app.config.settings import settings
from app.utils.prompts import EXTRACTION_PROMPT

logger = logging.getLogger(__name__)

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def extract_topics(text: str) -> dict:
    """
    Sends text to GPT-4o and extracts structured JSON with topics and subtopics.
    """
    try:
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output structured JSON."},
                {"role": "user", "content": EXTRACTION_PROMPT.format(text=text)}
            ],
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        if not content:
            raise ValueError("Received empty response from OpenAI.")
            
        return json.loads(content)
        
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from GPT response: {e}")
        raise ValueError("GPT response was not valid JSON.")
    except Exception as e:
        logger.error(f"Error during GPT extraction: {e}")
        raise ValueError(f"Failed to extract topics: {str(e)}")
