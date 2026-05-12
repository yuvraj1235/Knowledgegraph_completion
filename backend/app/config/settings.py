from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    BASE_URL: str | None = None
    MODEL: str = "gpt-4o"

    class Config:
        env_file = ".env"
        extra = "ignore"

# Initialize settings
settings = Settings()
