from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models.topic_model import Topic
from app.services.graph_service import insert_validated_topic
from app.services.similarity_engine import run_batch_similarity
from app.services.recommender import get_user_recommendations

router = APIRouter(tags=["Graph"])

@router.post("/approve-topic")
async def approve_topic(topic: Topic, background_tasks: BackgroundTasks):
    try:
        topic_id = await insert_validated_topic(topic)
        # We can run batch similarity in background or just wait for cron
        # For this MVP, we can trigger it in background
        background_tasks.add_task(run_batch_similarity)
        return {"status": "success", "topic_id": topic_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/recommend/{user_id}")
async def recommend(user_id: str, target_topic_id: str = None):
    try:
        recs = await get_user_recommendations(user_id, target_topic_id)
        return recs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
@router.post("/run-similarity")
async def trigger_similarity(background_tasks: BackgroundTasks):
    """Manually trigger the batch similarity pipeline"""
    background_tasks.add_task(run_batch_similarity)
    return {"status": "batch similarity started in background"}
