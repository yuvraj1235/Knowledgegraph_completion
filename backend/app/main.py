from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.ingestion import router as ingestion_router
import logging

# Configure basic logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

app = FastAPI(
    title="Educational Knowledge Graph API",
    description="API for ingesting educational PDFs and extracting topic hierarchies using GPT-4o",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(ingestion_router)

@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to the Educational Knowledge Graph API. Visit /docs for the API reference."}

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}
