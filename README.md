# PragmaLogixAI: Life Decision Intelligence OS

PragmaLogixAI is a role-aware personal and professional **Life OS (Decision Operating System)** designed for the Gen AI APAC Hack2Skill Hackathon. It reduces everyday friction across career, health, mind, money, and logistics using a graph-based multi-agent orchestration layer (built with Google ADK), GraphRAG memory, and Aider-style state diffing.

---

## 1. Product Concept & Life-Wide Journeys

PragmaLogixAI frames personal, family, and career logistics into three reusable, life-wide journeys:

*   **Daily Energy & Focus Journey:** Optimizes hourly schedules by mapping priorities (studying, deep work, medication) to predicted physical and mental energy peaks.
*   **Financial & Attention Budget Journey:** Audits transaction leaks and screen-time trends, compiling an actionable "Friction Budget" to balance attention and expenses.
*   **Environment & Routine Radar:** Active routine monitors mapping logistics, chores, device maintenance, or wellness check-ins for homes, co-working offices, or campuses.

---

## 2. Role-Aware Profiles & Age-Appropriate UX

To support all age groups and demographics, the agent mesh runs under a customizable **Profile Layer**:

*   **Kids & Students Mode:** 
    *   *Focus:* Study planning, homework tasks, screen-time balance, and study milestones.
    *   *UX:* Traffic-light safety signals (green/yellow/red) instead of dense charts, larger fonts, and voice-first audio ingestion.
*   **Working Professionals Mode:**
    *   *Focus:* Career roadmaps, technical certifications, deep-work blocks, subscription bloat, and meeting load audits.
    *   *UX:* Compact developer dashboards, Gantt-style planning grids, and financial transaction lists.
*   **Elderly & Retired Mode:**
    *   *Focus:* Health routines, medicine check-ins, safety, and cognitive puzzles.
    *   *UX:* Large icon-driven simple navigation, bold text, and audio voice logs.

---

## 3. ADK Multi-Agent Topology

The decision intelligence logic runs via a coordinated graph of specialist agents:

```text
                  +--------------------------------+
                  |     Signal Ingestion Agent     | (Ingests voice, images, text)
                  +---------------+----------------+
                                  |
                                  v
            +---------------------+---------------------+
            |                     |                     |
            v                     v                     v
     +--------------+      +--------------+      +--------------+
     | Health/Energy|      |  Mind/Focus  |      | Finance/Work | (Runs in Parallel)
     |    Agent     |      |    Agent     |      |    Agent     |
     +------+-------+      +------+-------+      +------+-------+
            |                     |                     |
            +---------------------+---------------------+
                                  |
                                  v
                  +---------------+----------------+
                  |  Professional Career Agent     | (Career roadmaps & certification paths)
                  +---------------+----------------+
                                  |
                                  v
                  +---------------+----------------+
                  |       Coordinator Agent        | (Validates plans & handles Life Diffs)
                  +--------------------------------+
```

*   **Signal Ingestion Agent:** Processes multimodal uploads (voice logs, receipts, lists) using Gemini 2.0 Flash and creates Graph nodes/edges.
*   **Health & Energy Agent:** Predicts daily energy levels based on sleep, active logs, and age-group parameters.
*   **Mind & Focus Agent:** Manages digital habits, focus hours, and learning schedules.
*   **Finance & Work Agent:** Detects billing leaks and monitors financial friction.
*   **Professional Career Agent:** Tracks professional milestones, study goals, and hobby projects.
*   **Coordinator Agent:** Aggregates specialist reports, validates plans (Linter checks), and outputs structured schedules.

---

## 4. Aider-Style Algorithms for Life State

We borrow the design philosophy of **Aider** (surgical changes, mapping, and automated testing) and apply it to Life OS state management:

*   **Codebase Map ➔ Life Graph Map:** Rather than loading raw chat logs, PragmaLogixAI builds and maintains a graph of the user's habits, events, and tasks (the *Life Knowledge Graph*). Agents update this map incrementally like commits.
*   **Git Diffs ➔ Life Diffs:** Updates and budgets are formatted in visual diffs:
    ```diff
    - Cancelled duplicate SaaS cloud trial account (-$14.99/mo)
    + Activated daily focus window (10:00 - 12:00)
    ~ Reduced administrative meeting load from 3 to 1 daily
    ```
*   **Plan Linting (Linter/Tests):** Just like Aider checks for compiler errors after a code change, the Coordinator agent runs automated validation checks on schedules (e.g. flagging overlapping tasks or exceeding energy thresholds) before outputting the plan.

---

## 5. System Architecture & Google Cloud Integration

*   **Frontend:** Next.js 15 (TypeScript) utilizing uniform `oklch()` color tokens and dynamic LLM translations.
*   **Backend:** Python (FastAPI) microservice on **Cloud Run** with IAM least-privilege service accounts.
*   **Database:** **BigQuery** for tabular events/metrics and **PostgreSQL** (`pgvector`) for GraphRAG.
*   **Models:** Gemini 2.5 Pro (planning) and Gemini 2.0 Flash (fast ingestion/summarization) via **Vertex AI**.
*   **Token Optimization:** Semantic caching and episodic summarization.
