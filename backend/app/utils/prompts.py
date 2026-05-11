EXTRACTION_PROMPT = """
You are an expert educational content analyzer.
Extract the main topics, a summary for each topic, and detailed subtopics with descriptions from the following text.
The text is from an educational document.

Analyze the text and return ONLY a structured JSON response matching this exact schema:
{
  "topics": [
    {
      "title": "Topic title",
      "summary": "Brief summary of the topic",
      "subtopics": [
        {
          "title": "Subtopic title",
          "description": "Detailed description of the subtopic"
        }
      ]
    }
  ]
}

Text to analyze:
{text}
"""
