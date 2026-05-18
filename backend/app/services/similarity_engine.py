import os
from openai import AsyncOpenAI
from app.graph.neo4j_client import neo4j_client
from app.config.settings import settings
import logging
from typing import List
import numpy as np

logger = logging.getLogger(__name__)

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY, base_url=settings.BASE_URL if settings.BASE_URL else None)

async def get_embedding(text: str) -> List[float]:
    try:
        response = await client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        logger.error(f"Error generating embedding: {e}")
        return []

def cosine_similarity(a: List[float], b: List[float]) -> float:
    if not a or not b: return 0.0
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

async def run_batch_similarity():
    """
    Fetches all topics and subtopics from Neo4j, computes their embeddings,
    and creates SIMILAR_TO and SEMANTIC_OVERLAP edges.
    """
    logger.info("Starting batch similarity pipeline...")
    
    if not neo4j_client.driver:
        neo4j_client.connect()
        
    async with neo4j_client.driver.session() as session:
        # Fetch topics
        topic_result = await session.run("MATCH (t:Topic) RETURN t.id AS id, t.title AS title, t.summary AS summary")
        topics = [record.data() async for record in topic_result]
        
        # Fetch subtopics
        subtopic_result = await session.run("MATCH (s:SubTopic) RETURN s.id AS id, s.title AS title, s.description AS description")
        subtopics = [record.data() async for record in subtopic_result]
        
        # Topic embeddings
        topic_embs = {}
        for t in topics:
            emb = await get_embedding(f"{t.get('title', '')} {t.get('summary', '')}")
            if emb:
                topic_embs[t['id']] = emb
                
        # Compare topics
        topic_edges_created = 0
        for i in range(len(topics)):
            for j in range(i + 1, len(topics)):
                id1 = topics[i]['id']
                id2 = topics[j]['id']
                if id1 in topic_embs and id2 in topic_embs:
                    sim = cosine_similarity(topic_embs[id1], topic_embs[id2])
                    if sim > 0.85:
                        await session.run("""
                        MATCH (t1:Topic {id: $id1}), (t2:Topic {id: $id2})
                        MERGE (t1)-[r:SIMILAR_TO]-(t2)
                        ON CREATE SET r.score = $score
                        """, id1=id1, id2=id2, score=sim)
                        topic_edges_created += 1

        # Subtopic embeddings
        subtopic_embs = {}
        for s in subtopics:
            emb = await get_embedding(f"{s.get('title', '')} {s.get('description', '')}")
            if emb:
                subtopic_embs[s['id']] = emb
                
        # Compare subtopics
        subtopic_edges_created = 0
        for i in range(len(subtopics)):
            for j in range(i + 1, len(subtopics)):
                id1 = subtopics[i]['id']
                id2 = subtopics[j]['id']
                if id1 in subtopic_embs and id2 in subtopic_embs:
                    sim = cosine_similarity(subtopic_embs[id1], subtopic_embs[id2])
                    if sim > 0.85:
                        await session.run("""
                        MATCH (s1:SubTopic {id: $id1}), (s2:SubTopic {id: $id2})
                        MERGE (s1)-[r:SEMANTIC_OVERLAP]-(s2)
                        ON CREATE SET r.score = $score
                        """, id1=id1, id2=id2, score=sim)
                        subtopic_edges_created += 1

        logger.info(f"Batch similarity complete. Created {topic_edges_created} topic edges and {subtopic_edges_created} subtopic edges.")
