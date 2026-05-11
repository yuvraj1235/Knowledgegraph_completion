from pydantic import BaseModel
from typing import List

class Subtopic(BaseModel):
    title: str
    description: str

class Topic(BaseModel):
    title: str
    summary: str
    subtopics: List[Subtopic]

class ExtractedTopics(BaseModel):
    topics: List[Topic]
    
class IngestionResponse(BaseModel):
    transcript: str
    extracted_topics: ExtractedTopics
