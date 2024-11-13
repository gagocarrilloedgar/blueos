"""
CLI for the notifications API
"""

import uvicorn

APP_NAME = "notifications.main:app"


def dev():
    """Development server with auto-reload"""
    uvicorn.run(APP_NAME, host="0.0.0.0", port=8000, reload=True)


def start():
    """Start the server"""
    uvicorn.run(APP_NAME, reload=True)


def start_prod():
    """Start the server in production mode"""
    uvicorn.run(APP_NAME, host="0.0.0.0", port=8000)
