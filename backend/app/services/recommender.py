from app.graph.neo4j_client import neo4j_client
import logging

logger = logging.getLogger(__name__)

async def get_user_recommendations(user_id: str, target_topic_id: str = None):
    if not neo4j_client.driver:
        neo4j_client.connect()
        
    async with neo4j_client.driver.session() as session:
        # Create user if not exists
        await session.run("MERGE (u:User {id: $user_id})", user_id=user_id)
        
        # If target_topic_id is provided, set as WANTS_TO_LEARN
        if target_topic_id:
            await session.run("""
            MATCH (u:User {id: $user_id}), (t:Topic {id: $target_topic_id})
            MERGE (u)-[:WANTS_TO_LEARN]->(t)
            """, user_id=user_id, target_topic_id=target_topic_id)
            
        # Recommendation logic
        query = """
        MATCH (u:User {id: $user_id})
        MATCH (u)-[:WANTS_TO_LEARN]->(target:Topic)
        
        // Subtopics for target
        OPTIONAL MATCH (target)-[:HAS_SUBTOPIC]->(sub:SubTopic)
        WHERE NOT (u)-[:KNOWS]->(sub)
        
        // Semantically similar topics and their subtopics
        OPTIONAL MATCH (target)-[:SIMILAR_TO]-(related:Topic)
        OPTIONAL MATCH (related)-[:HAS_SUBTOPIC]->(rel_sub:SubTopic)
        WHERE NOT (u)-[:KNOWS]->(rel_sub)
        
        RETURN 
            target.id AS target_id,
            target.title AS target_title,
            collect(DISTINCT {id: sub.id, title: sub.title, description: sub.description}) AS required_subtopics,
            collect(DISTINCT {
                topic_id: related.id, 
                topic_title: related.title, 
                subtopic_id: rel_sub.id, 
                subtopic_title: rel_sub.title
            }) AS related_items
        """
        
        result = await session.run(query, user_id=user_id)
        records = [record.data() async for record in result]
        
        recommendations = []
        for rec in records:
            if not rec.get("target_id"): continue
            
            # Filter out empty dicts from collects
            req_subs = [s for s in rec["required_subtopics"] if s.get("id")]
            rel_items = [i for i in rec["related_items"] if i.get("topic_id")]
            
            path = {
                "target_topic": {
                    "id": rec["target_id"],
                    "title": rec["target_title"],
                },
                "subtopics_to_learn": req_subs,
                "related_exploration": rel_items
            }
            recommendations.append(path)
            
        return {"recommended_path": recommendations}
