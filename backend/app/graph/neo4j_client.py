import os
from neo4j import AsyncGraphDatabase
import logging
from app.config.settings import settings

logger = logging.getLogger(__name__)

NEO4J_URI = settings.NEO4J_URI
NEO4J_USER = settings.NEO4J_USER
NEO4J_PASSWORD = settings.NEO4J_PASSWORD

class Neo4jClient:
    def __init__(self):
        self.driver = None

    def connect(self):
        if not self.driver:
            self.driver = AsyncGraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
            logger.info("Neo4j driver initialized")

    async def close(self):
        if self.driver:
            await self.driver.close()

    async def init_schema(self):
        if not self.driver:
            self.connect()
        async with self.driver.session() as session:
            try:
                await session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (t:Topic) REQUIRE t.id IS UNIQUE")
                await session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (s:SubTopic) REQUIRE s.id IS UNIQUE")
                await session.run("CREATE CONSTRAINT IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE")
                logger.info("Neo4j schema constraints initialized.")
            except Exception as e:
                logger.error(f"Error initializing Neo4j schema: {e}")

neo4j_client = Neo4jClient()
