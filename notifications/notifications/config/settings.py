"""
Settings module for the notifications service
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Settings for the notifications service"""

    PROJECT_NAME: str = "Notifications Service"
    VERSION: str = "0.0.1"
    DESCRIPTION: str = "Service for handling notifications"

    # API Settings
    API_V1_STR: str = "/api/v1"

    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost:5173",
    ]

    # Database
    DATABASE_URL: str

    class Config:
        """Config for the settings"""

        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
