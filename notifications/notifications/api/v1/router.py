"""
API router for the notifications service
"""

from fastapi import APIRouter

from notifications.api.v1 import notifications

api_router = APIRouter()

api_router.include_router(
    notifications.router, prefix="/notifications", tags=["notifications"]
)
