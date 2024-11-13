"""
API for notifications
"""

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from notifications.db.prisma import db

router = APIRouter()


@router.get("")
async def get_notifications():
    """Get all notifications"""
    notifications = await db.notification.count()
    json_compatible_data = jsonable_encoder(
        {
            "message": "Hello, World!",
            "notifications": notifications,
        }
    )
    return json_compatible_data
