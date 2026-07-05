"""
Pydantic schemas for multimodal Ingestion.
"""
from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class NodeSchema(BaseModel):
    """
    Schema for a graph node extracted from a user signal.
    """
    label: str = Field(description="Entity label: e.g. Habit, Pain, Event, Outcome, Task")
    name: str = Field(description="Unique name of the node entity")
    description: Optional[str] = Field(None, description="Description of the entity")
    metadata: Optional[Dict] = Field(default_factory=dict, description="Extensible metadata attributes")

class EdgeSchema(BaseModel):
    """
    Schema for an edge linking two extracted nodes.
    """
    source_name: str = Field(description="Name of the source node")
    target_name: str = Field(description="Name of the target node")
    relationship: str = Field(description="Relationship label: e.g. TRIGGERS, LEADS_TO, IMPACTS, BLOCKS")
    weight: float = Field(1.0, ge=0.0, le=1.0, description="Relationship weight/strength")

class EventSchema(BaseModel):
    """
    Schema for a tabular event recorded in BigQuery.
    """
    category: str = Field(description="Event category: e.g. HEALTH, MIND, FINANCE, LOGISTICS")
    description: str = Field(description="Summary description of the event")
    value: Optional[float] = Field(None, description="Quantitative value associated with the event")
    metadata: Optional[Dict] = Field(default_factory=dict, description="Extensible event metadata")

class IngestionResult(BaseModel):
    """
    The structured output returned from processing a multimodal signal.
    """

    model_config = {"populate_by_name": True}

    extracted_nodes: List[NodeSchema] = Field(default_factory=list, alias="nodes")
    extracted_edges: List[EdgeSchema] = Field(default_factory=list, alias="edges")
    extracted_events: List[EventSchema] = Field(default_factory=list, alias="events")
