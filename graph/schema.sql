-- ==========================================
-- PostgreSQL Life Knowledge Graph Schema
-- ==========================================

-- Enable pgvector and UUID extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Nodes: Entities in the user's life (Habits, Pains, Events, Outcomes, Tasks)
CREATE TABLE IF NOT EXISTS graph_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(50) NOT NULL,            -- 'Habit', 'Pain', 'Event', 'Outcome', 'Task'
    name VARCHAR(255) NOT NULL,
    description TEXT,
    embedding vector(768),                 -- Vector embedding (Vertex text-embedding-004)
    metadata JSONB,                        -- Extensible JSON for source/payload references
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HNSW index for fast vector similarity searches
CREATE INDEX IF NOT EXISTS idx_graph_nodes_embedding ON graph_nodes 
    USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- Edges: Relationships connecting entities (TRIGGERS, LEADS_TO, IMPACTS, BLOCKS)
CREATE TABLE IF NOT EXISTS graph_edges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
    target_id UUID NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL,     -- 'TRIGGERS', 'LEADS_TO', 'IMPACTS', 'BLOCKS'
    weight NUMERIC(3,2) DEFAULT 1.0,       -- Strength of relationship (e.g. 0.0 to 1.0)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_edge_pair UNIQUE (source_id, target_id, relationship)
);

CREATE INDEX IF NOT EXISTS idx_graph_edges_source ON graph_edges(source_id);
CREATE INDEX IF NOT EXISTS idx_graph_edges_target ON graph_edges(target_id);

-- ==========================================
-- BigQuery Tabular Analytics Schemas (DRAFT)
-- ==========================================

-- Table: pragmalogix.daily_scores
-- Fields:
--   - score_id: STRING (UUID)
--   - date: DATE (Partition Key)
--   - energy_score: FLOAT64 (Predicted/Tracked energy level)
--   - focus_score: FLOAT64 (Focus hours/quality)
--   - friction_score: FLOAT64 (Friction budget consumed)
--   - updated_at: TIMESTAMP

-- Table: pragmalogix.life_events
-- Fields:
--   - event_id: STRING (UUID)
--   - timestamp: TIMESTAMP (Partition Key)
--   - category: STRING ('FINANCE', 'HEALTH', 'MIND', 'LOGISTICS')
--   - description: STRING
--   - value: NUMERIC (Optional monetary cost or score value)
--   - metadata: JSON
