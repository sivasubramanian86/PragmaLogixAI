"""
Database models for PragmaLogixAI graph nodes and edges.
"""
from sqlalchemy import Column, String, Text, ForeignKey, Numeric, DateTime, Table
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship as orm_relationship
import uuid
import datetime

Base = declarative_base()

class GraphNode(Base):
    """
    SQLAlchemy model representing a node in the Life Knowledge Graph.
    """
    __tablename__ = "graph_nodes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    label = Column(String(50), nullable=False)        # 'Habit', 'Pain', 'Event', 'Outcome', 'Task'
    name = Column(String(255), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    metadata_json = Column("metadata", JSONB, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=False)

    # Relationships
    outgoing_edges = orm_relationship("GraphEdge", foreign_keys="GraphEdge.source_id", back_populates="source_node", cascade="all, delete-orphan")
    incoming_edges = orm_relationship("GraphEdge", foreign_keys="GraphEdge.target_id", back_populates="target_node", cascade="all, delete-orphan")


class GraphEdge(Base):
    """
    SQLAlchemy model representing an edge (relationship) in the Life Knowledge Graph.
    """
    __tablename__ = "graph_edges"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_id = Column(UUID(as_uuid=True), ForeignKey("graph_nodes.id", ondelete="CASCADE"), nullable=False)
    target_id = Column(UUID(as_uuid=True), ForeignKey("graph_nodes.id", ondelete="CASCADE"), nullable=False)
    relationship = Column(String(50), nullable=False) # 'TRIGGERS', 'LEADS_TO', 'IMPACTS', 'BLOCKS'
    weight = Column(Numeric(3, 2), default=1.0, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.datetime.utcnow, nullable=False)

    # Relationships
    source_node = orm_relationship("GraphNode", foreign_keys=[source_id], back_populates="outgoing_edges")
    target_node = orm_relationship("GraphNode", foreign_keys=[target_id], back_populates="incoming_edges")
