# Architecture Blueprint - PragmaLogixAI

This document provides the high-level system architecture, security boundaries, and data design of **PragmaLogixAI**, aligning with the **Google Cloud Well-Architected Framework**.

---

## 1. System Topology & Data Flow

```text
                               +-----------------------------+
                               |    Next.js Web Frontend     | (Ingress: HTTPS / WAF)
                               +--------------+--------------+
                                              |
                                     (SSE / REST APIs)
                                              v
                               +-----------------------------+
                               |   FastAPI on Cloud Run      | (Bound to PORT, IAM Auth)
                               +-------+--------------+------+
                                       |              |
                    (SQL / pgvector)   v              v   (API Client / Vertex AI)
                               +-------+------+      +------+-------+
                               |  PostgreSQL  |      |  Vertex AI   | (Gemini 2.5 Pro /
                               |  (GraphRAG)  |      | Agent Garden |  Gemini 2.5 Flash)
                               +--------------+      +--------------+
                                       |
                                       v (Cloud Logging / Export)
                               +--------------+
                               |   BigQuery   | (Structured Tabular logs & Metrics)
                               +--------------+
```

---

## 2. Component Design & Responsibilities

### A. Frontend Layer (Next.js 15 App Router)
*   **Aesthetics:** Implements uniform OKLCH color spaces, glassmorphism card highlights, and accessible landmark layouts.
*   **Accessibility (a11y):** Fully WCAG 2.2 AA compliant. Preserves keyboard focus tab orders, includes skip navigation controls, and dynamically switches between a developer compact mode and a simplified large-font voice-first layout (for children and elderly profiles).
*   **Internationalization (i18n):** Handles dynamic multilingual prompts across English, Hindi, Tamil, and Kannada.

### B. Core Execution Layer (FastAPI on Cloud Run)
*   **Modularity:** Uses a clean separation of concerns:
    *   `/api`: Expressive HTTP routers.
    *   `/services`: Functional services (Ingestion, GraphRAG, Semantic Cache, Summarizer).
    *   `/models`: SQL schemas and Pydantic models.
*   **ADK Multi-Agent Mesh:** Wire specialist sub-agents (Health, Mind, Finance, Logistics, and Professional) that execute in parallel to construct plans and detect cognitive or budget friction.

### C. Data & GraphRAG Layer
*   **PostgreSQL with pgvector:** Houses the **Life Knowledge Graph** (Nodes: Habits, Pains, Tasks, Events; Edges: TRIGGERS, IMPACTS, BLOCKS).
*   **BigQuery:** Stores daily metrics and score histories.
*   **Semantic Cache:** Intercepts incoming queries and returns cached responses if semantic match distance is high.

---

## 3. Well-Architected Framework Pillars

### Security & Compliance
*   **Least-Privilege Custom IAM:** The backend service account is granted only specific permissions (e.g. `secretmanager.secretAccessor` and restricted GCS scopes).
*   **PII & Logging Compliance:** Structured logs redact personal usernames, email addresses, and transaction balances, routing only anonymized tactical IDs (`INC-YYYY-ISO2-NN`).
*   **Secrets Isolation:** API tokens and connection strings are retrieved from GCP Secret Manager instead of raw `.env` files.

### Reliability
*   **Plan Linting (Consistency Checks):** Automatically runs safety validation tests on compiled schedules (e.g., flagging overlapping tasks or total energy budget exhaustion) before planning delivery.
*   **Connection Pool Pre-Ping:** Keeps database connections active and recycles stale processes every hour to prevent silent 500 errors.

### Cost & Performance Optimization
*   **Context Compression:** Periodically runs episodic summarization to compress conversational logs when context size approaches limit thresholds.
*   **GraphRAG Grounding:** Queries PostgreSQL using cosine distance embeddings to retrieve only the relevant local neighborhood. This prevents passing large conversational histories to the LLM.
