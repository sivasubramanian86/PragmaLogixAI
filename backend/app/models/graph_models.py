"""
Database models for PragmaLogixAI graph nodes and edges.
Supports platform-independent GUID and JSONB fallbacks for SQLite/PostgreSQL.
"""
from sqlalchemy import Column, String, Text, ForeignKey, Numeric, DateTime
from sqlalchemy.types import TypeDecorator, CHAR, JSON as pgJSON
from sqlalchemy.dialects.postgresql import UUID as pgUUID, JSONB as pgJSONB
from sqlalchemy.orm import declarative_base, relationship as orm_relationship
import uuid
import datetime

Base = declarative_base()

class GUID(TypeDecorator):
    """Platform-independent GUID type.
    Uses PostgreSQL's native UUID type, otherwise CHAR(36).
    """
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(pgUUID(as_uuid=True))
        else:
            return dialect.type_descriptor(CHAR(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == "postgresql":
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return str(uuid.UUID(value))
            return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                return uuid.UUID(value)
            return value

class SafeJSONB(TypeDecorator):
    """Platform-independent JSONB type.
    Uses PostgreSQL's native JSONB type, otherwise standard JSON.
    """
    impl = pgJSON
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(pgJSONB())
        else:
            return dialect.type_descriptor(pgJSON())

class GraphNode(Base):
    """
    SQLAlchemy model representing a node in the Life Knowledge Graph.
    """
    __tablename__ = "graph_nodes"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    label = Column(String(50), nullable=False)        # 'Habit', 'Pain', 'Event', 'Outcome', 'Task'
    name = Column(String(255), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    metadata_json = Column("metadata", SafeJSONB(), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=False)

    # Relationships
    outgoing_edges = orm_relationship("GraphEdge", foreign_keys="GraphEdge.source_id", back_populates="source_node", cascade="all, delete-orphan")
    incoming_edges = orm_relationship("GraphEdge", foreign_keys="GraphEdge.target_id", back_populates="target_node", cascade="all, delete-orphan")


class GraphEdge(Base):
    """
    SQLAlchemy model representing an edge (relationship) in the Life Knowledge Graph.
    """
    __tablename__ = "graph_edges"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    source_id = Column(GUID(), ForeignKey("graph_nodes.id", ondelete="CASCADE"), nullable=False)
    target_id = Column(GUID(), ForeignKey("graph_nodes.id", ondelete="CASCADE"), nullable=False)
    relationship = Column(String(50), nullable=False) # 'TRIGGERS', 'LEADS_TO', 'IMPACTS', 'BLOCKS'
    weight = Column(Numeric(3, 2), default=1.0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=False)

    # Relationships
    source_node = orm_relationship("GraphNode", foreign_keys=[source_id], back_populates="outgoing_edges")
    target_node = orm_relationship("GraphNode", foreign_keys=[target_id], back_populates="incoming_edges")
