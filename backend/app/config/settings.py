from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    BASE_URL: str | None = None
    MODEL: str = "gpt-4o"
    NEO4J_URI: str = "bolt://localhost:7687"
    NEO4J_USER: str = "neo4j"
    NEO4J_PASSWORD: str = "password"

    class Config:
        env_file = ".env"
        extra = "ignore"

# Initialize settings
settings = Settings()
