"""
Main module for the Notifications Service
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from notifications.api.v1.router import api_router
from notifications.config.settings import settings


def create_app() -> FastAPI:
    """Create the FastAPI app"""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        description=settings.DESCRIPTION,
    )

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Configure exception handlers
    # configure_exceptions(app)

    # Add routes
    app.include_router(api_router, prefix="/api/v1")

    return app


app = create_app()
