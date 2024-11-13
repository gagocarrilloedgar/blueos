"""
API for notifications
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def get_notifications():
    """Get all notifications"""
    return {"message": "Hello, World!"}
