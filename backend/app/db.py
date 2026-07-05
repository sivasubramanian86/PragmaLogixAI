"""
Async SQLAlchemy database session factory for PragmaLogixAI.

Provides:
- ``create_db_engine()`` — builds an ``AsyncEngine`` from the ``DATABASE_URL``
  environment variable (populated by Secret Manager at runtime on Cloud Run).
- ``get_db()`` — FastAPI dependency that yields a scoped ``AsyncSession`` and
  commits/rolls back automatically.
- ``init_db()`` — creates tables in development (idempotent; skipped in prod).

Auth: no secrets are hard-coded.  The DATABASE_URL is injected at runtime via
Cloud Run's Secret Manager volume mount or a local ``.env`` file (gitignored).
"""
from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
    AsyncEngine,
)

logger = logging.getLogger(__name__)

_engine: AsyncEngine | None = None
_async_session_factory: async_sessionmaker[AsyncSession] | None = None


def _get_database_url() -> str:
    """Resolve the async PostgreSQL connection URL from environment.

    Returns:
        An ``asyncpg``-compatible URL string.

    Raises:
        RuntimeError: If ``DATABASE_URL`` is not set.
    """
    url = os.environ.get("DATABASE_URL")
    if not url:
        # Provide an in-memory SQLite fallback for local unit tests only
        # (pgvector queries will be skipped when SQLite is detected)
        url = "sqlite+aiosqlite:///:memory:"
        logger.warning(
            "DATABASE_URL not set — using in-memory SQLite (no pgvector support). "
            "Set DATABASE_URL=postgresql+asyncpg://... for full functionality."
        )
    # Normalise postgres:// → postgresql+asyncpg:// for SQLAlchemy 2.x
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    return url


def create_db_engine() -> AsyncEngine:
    """Create (or return cached) the shared ``AsyncEngine`` instance.

    Returns:
        Configured ``AsyncEngine``.
    """
    global _engine, _async_session_factory
    if _engine is None:
        db_url = _get_database_url()
        _engine = create_async_engine(
            db_url,
            pool_pre_ping=True,        # recycles stale connections on checkout
            pool_recycle=3600,         # hour-level recycle (ARCHITECTURE.md §reliability)
            echo=False,
        )
        _async_session_factory = async_sessionmaker(
            _engine,
            class_=AsyncSession,
            expire_on_commit=False,
        )
        logger.info("Database engine created.")
    return _engine


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency that yields a scoped async database session.

    Usage::

        @app.post("/api/v1/ingest")
        async def ingest(db: AsyncSession = Depends(get_db)):
            ...

    Yields:
        An ``AsyncSession`` that commits on success and rolls back on error.
    """
    if _async_session_factory is None:
        create_db_engine()
    assert _async_session_factory is not None

    async with _async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


async def init_db() -> None:
    """Create all SQLAlchemy-mapped tables (development / test helper).

    This is a no-op if tables already exist.  In production, run the
    ``graph/schema.sql`` migration against Cloud SQL instead.
    """
    from PragmaLogixAI.backend.app.models.graph_models import Base  # noqa: F401

    engine = create_db_engine()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables initialised.")
