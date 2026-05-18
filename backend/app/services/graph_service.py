from app.graph.neo4j_client import neo4j_client
from app.models.topic_model import Topic
import uuid
import logging

logger = logging.getLogger(__name__)

async def insert_validated_topic(topic: Topic) -> str:
    topic_id = str(uuid.uuid4())
    
    subtopics = [
        {
            "id": str(uuid.uuid4()),
            "title": s.title,
            "description": s.description
        }
        for s in topic.subtopics
    ]
    
    query = """
    MERGE (t:Topic {title: $title})
    ON CREATE SET t.id = $topic_id, t.summary = $summary
    WITH t
    UNWIND $subtopics AS subtopic
    MERGE (s:SubTopic {title: subtopic.title})
    ON CREATE SET s.id = subtopic.id, s.description = subtopic.description
    MERGE (t)-[:HAS_SUBTOPIC]->(s)
    RETURN t.id AS id
    """
    
    try:
        if not neo4j_client.driver:
            neo4j_client.connect()
        async with neo4j_client.driver.session() as session:
            result = await session.run(
                query, 
                title=topic.title, 
                topic_id=topic_id, 
                summary=topic.summary, 
                subtopics=subtopics
            )
            record = await result.single()
            logger.info(f"Inserted Topic {topic.title} with {len(subtopics)} subtopics.")
            return record["id"] if record else topic_id
    except Exception as e:
        logger.error(f"Error inserting topic: {e}")
        raise e
