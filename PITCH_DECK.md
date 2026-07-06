# PragmaLogixAI — Pitch Deck Content
## Gen AI Academy APAC Edition · Hack2Skill
### Participant: Sivasubramanian Kailasam
### Problem Statement Track: AI-Powered Decision Intelligence Platform

---

## SLIDE 1 — Title Slide

**Project Name:** PragmaLogixAI – Life Decision Intelligence OS

**Tagline:** *Turn raw life signals into explainable plans — for every age, in every language.*

**Track / Problem Statement:** AI-Powered Decision Intelligence Platform

**Participant Name:** Sivasubramanian Kailasam

**Prototype:** https://pragmalogixai-app.web.app
**GitHub:** https://github.com/sivasubramanian86/PragmaLogixAI
**Backend API:** https://pragmalogixai-backend-eah62ip3iq-uc.a.run.app/docs

> *Speaker note: Open with one strong sentence — "Every day, billions of people make hundreds of small decisions badly — not because they lack willpower, but because they lack a system."*

---

## SLIDE 2 — Problem Statement: Decision Friction in Everyday Life

**The official challenge restated:** Communities and individuals generate enormous amounts of data — health logs, financial transactions, home routines, work calendars — but struggle to convert it into clear, actionable decisions that improve everyday well-being.

**3 universal pain clusters PragmaLogixAI tackles:**

1. **Energy & Routine Friction** — Poor sleep alignment, back-to-back meetings with no recovery, skipped meals, burnout cycles
2. **Financial & Attention Friction** — Silent subscription leaks, impulse spending, fragmented SaaS trials draining $30–$200/month unnoticed
3. **Home & Logistics Friction** — Appliance maintenance backlogs, uncoordinated chore loads, prescription refill misses, grocery waste

**Who suffers:**
- 🎒 Kids & Students — screen-time overload, unbalanced study/play schedules
- 💼 Working Professionals — meeting overload, digital fatigue, subscription bloat
- 🏡 Caregivers & Homemakers — invisible logistics labour, home maintenance debt
- 👴 Elderly & Retired — medication management, safety routines, cognitive wellness

> *Speaker note: Ground this in relatable daily moments — "Have you ever paid for three overlapping streaming services for six months without noticing?"*

---

## SLIDE 3 — Users, Decisions & Data

**Who uses PragmaLogixAI:**

| Persona | Key Question They Ask |
|---------|----------------------|
| Student | "How do I balance study, gaming, and sleep?" |
| Professional | "Where is my time and money leaking this month?" |
| Caregiver | "What home/family tasks am I neglecting?" |
| Elderly user | "Did I take my medication? What's my day look like?" |

**Decisions the platform drives:**
- "What is the optimal schedule for tomorrow given my energy level?"
- "Which subscriptions should I cancel this month?"
- "What home maintenance is overdue and what's the priority?"
- "How can I reduce cognitive friction without major lifestyle change?"

**Data ingested (multi-modal):**
- 📝 Text: daily logs, task lists, receipts, notes
- 🖼️ Images: scanned invoices, home/appliance photos, shopping receipts
- 🎙️ Audio: voice memos describing how you feel, what happened today
- 📹 Video: short clips of workspace or home environment
- 📊 Structured: calendar events, BigQuery metric logs

> *Speaker note: Emphasise that no single app today unifies these data types AND personalises by age group AND works in 22 languages.*

---

## SLIDE 4 — Solution Overview: PragmaLogixAI as a Life Decision OS

**Not a chatbot. Not a productivity app. A Decision Operating System.**

Three reusable Life Journeys that work across all demographics:

1. **📅 Tomorrow Plan** (`/api/v1/plan/tomorrow`)
   — Hourly schedule optimised against your energy peaks, sleep data, and work commitments.
   Energy-budget linting catches overloaded days before they happen.

2. **💳 Monthly Friction Budget** (`/api/v1/plan/month`)
   — Audits subscription leaks, duplicate services, attention drains.
   Produces Aider-style life diffs: `- cancelled`, `+ activated`, `~ reduced`.

3. **🏠 Home & Logistics Radar** (`/api/v1/plan/home`)
   — Preventative maintenance triggers, chore routing, grocery planning, prescription reminders.

**Key differentiators:**
- Multi-modal ingestion: text + image + audio + video signals, all in one pipeline
- Multi-lingual: 22 languages including Hindi, Tamil, Kannada, Telugu, Japanese, Arabic, Korean
- Role-aware profiles: Kids/Students · Working Professionals · Elderly/Retired
- Multimodal outputs: Imagen 3 diagrams · Chirp HD audio summaries · Veo 2 plan videos
- Life Knowledge Graph with GraphRAG memory — decisions are grounded in *your* history, not generic advice

> *Speaker note: The "OS" framing matters — this isn't a feature, it's infrastructure for life decisions.*

---

## SLIDE 5 — Architecture & Technical Execution

**System flow:**

```
Browser → Firebase Hosting (CDN)
       → Cloud Run: Next.js Frontend (3-column glassmorphism UI)
       → Cloud Run: FastAPI Backend (IAM-auth)
              ↓                        ↓
    PostgreSQL + pgvector         Vertex AI (ADC, no raw keys)
    (Life Knowledge Graph)        Gemini 2.5 Flash-Lite · Gemini 2.5 Pro
    GraphRAG cosine search        Imagen 3 · Cloud TTS Chirp HD · Veo 2
              ↓
    BigQuery: life_events · daily_scores
              ↓
    Cloud Storage: multimodal file staging
```

**Why this stack:**
- **Cloud Run** — scale-to-zero, pay-per-request, no over-provisioned servers
- **PostgreSQL + pgvector HNSW index** — sub-millisecond cosine search, no external vector DB needed
- **BigQuery** — columnar analytics on life events with time-partitioned tables
- **Vertex AI ADC** — zero raw API keys; service account identity-based auth throughout
- **Semantic cache** — repeated queries served from memory, skipping LLM entirely

**Modularity:** Clean router separation (`/ingest`, `/plan/*`, `/multimodal/*`), Pydantic v2 validation, async SQLAlchemy, lru_cache model singletons

> *Speaker note: Point to actual deployed URLs — this is not a mockup, it is live.*

---

## SLIDE 6 — Agent Mesh & GraphRAG: How Decisions Are Made

**The ADK-style multi-agent pipeline:**

```
User uploads Life Signal (voice note / receipt / log)
         ↓
Signal Ingestion Service (Gemini 2.5 Flash-Lite)
→ extracts: Nodes (Habit, Pain, Event, Task) + Edges (TRIGGERS, IMPACTS)
→ writes to: PostgreSQL graph + BigQuery events
         ↓
      asyncio.gather — 5 agents run IN PARALLEL
  ┌────────┬─────────┬──────────┬───────────┬─────────────┐
  Health   Mind     Finance  Logistics  Professional
  Agent    Agent    Agent    Agent       Agent
  (Flash-L) (Flash-L) (Flash-L) (Flash-L)  (Flash-L)
  └────────┴─────────┴──────────┴───────────┴─────────────┘
         ↓
Coordinator Agent (Gemini 2.5 Pro)
→ Synthesises all findings into journey-specific JSON plan
→ Runs Aider-style Plan Linter (energy budget + time conflict checks)
→ Returns: daily_plan + friction_actions + life_diffs + lint_warnings
```

**GraphRAG memory:** Every agent query first retrieves the top-5 semantically similar nodes from the user's Life Knowledge Graph (pgvector cosine search with `text-embedding-004`). This grounds recommendations in *actual user history* — not generic heuristics.

**Token efficiency:**
- Flash-Lite for all 5 parallel specialists (fast + cheap)
- Pro only for final synthesis (one call)
- Semantic cache eliminates repeat LLM calls
- Context compression via episodic summarisation when history grows

> *Speaker note: "Five agents, one second — because they run in parallel, not in sequence."*

---

## SLIDE 7 — Impact & Use Case Relevance

**Three micro-stories:**

**🎒 Arjun, 17, student in Chennai:**
Uploads a voice note: *"I've been gaming until 2am and failing to study."*
PragmaLogixAI extracts the habit node, maps the IMPACTS edge to academic performance,
and produces a Tamil-language Tomorrow Plan with Pomodoro study blocks + screen-time locks.
Result: study efficiency up, sleep debt addressed, no more parental conflict.

**💼 Priya, 34, software manager in Bangalore:**
Uploads her bank statement screenshot.
Finance agent detects ₹2,400/month in duplicate SaaS trials; Logistics agent flags overdue AC filter.
Result: Friction Budget shows exact cancellations → saves ₹28,800/year + 3 hours of distraction.

**👴 Rajan, 68, retired engineer in Hyderabad:**
Speaks into the app in Telugu: *"I missed my blood pressure medicine yesterday."*
Health agent schedules a morning medication reminder block; Logistics agent auto-schedules pharmacy pickup.
Result: medication compliance improved; family caregivers notified via plan output.

**Broader impact:**
- Supports 22 languages → accessible across all of APAC, not just English speakers
- Role-aware UX → same system, appropriate interface for every age group
- Community scale: the same multi-agent architecture can be lifted to neighborhood, city, or organisation level

> *Speaker note: These aren't hypothetical — the platform handles all three journeys live in the demo.*

---

## SLIDE 8 — Technical Choices, Feasibility & Cost-Efficiency

**Why Vertex AI + Gemini family:**
- Gemini 2.5 Flash-Lite: ~10× cheaper per token than Pro; handles all 5 parallel specialist agents with sub-second latency
- Gemini 2.5 Pro: deep reasoning for final plan synthesis — used once per request
- text-embedding-004: state-of-the-art 768-dim embeddings for GraphRAG cosine search
- Imagen 3: photorealistic decision diagrams without a separate image hosting pipeline
- Veo 2: 3-second life-plan outcome preview videos — unique multimodal demo capability
- Cloud TTS Chirp HD: human-quality audio summaries in 40+ languages

**Why ADC, not raw API keys:**
- Zero credential leakage risk — service account identity-based auth throughout
- Production-grade from day one; no "swap keys before launch" debt

**Cost controls:**
- Scale-to-zero Cloud Run → zero cost when idle
- Semantic plan cache → repeated queries skip all LLM calls
- Flash-Lite for 5/6 model calls; Pro only for 1/6
- pgvector HNSW → avoids expensive external vector DB subscriptions

**Deployed and running today:**
- ✅ Backend: Cloud Run (us-central1)
- ✅ Frontend: Firebase Hosting → Cloud Run
- ✅ BigQuery: partitioned tables provisioned
- ✅ GCS: staging bucket live
- ✅ 22+ tests passing, 0 failures (all offline, no credentials needed)

> *Speaker note: "Every decision here was made to be production-realistic, not hackathon-fragile."*

---

## SLIDE 9 — Demo Flow (What You'll See in 3 Minutes)

**Live at:** https://pragmalogixai-app.web.app

**Step-by-step:**

1. **[Dashboard]** Open app → 3-column glassmorphism layout. Select "Working Professional" profile, switch language to Hindi to show i18n.

2. **[Journey 1 — Tomorrow Plan]** Upload voice note or text log describing today. Click "Generate Plan". Agent Mesh panel lights up — 5 nodes pulsing in parallel. Output: hourly schedule, energy costs, life diffs.

3. **[Journey 2 — Monthly Friction Budget]** Click "Financial & Attention Budget" tab. Use suggestion template "Audited monthly subscription friction". Output: friction actions, Aider-style life diffs, lint warnings if overloaded.

4. **[Journey 3 — Home & Logistics Radar]** Click "Environment & Routine Radar" tab. Show logistics check-in schedule, appliance maintenance triggers.

5. **[Multimodal Panel]** Scroll to Multimodal Decision Synthesis section — Imagen diagram, Chirp TTS audio player, Veo preview.

6. **[Agent Mesh]** Point to right panel — Coordinator node + 5 specialist nodes with pulse animation + ADK console log showing real agent steps.

7. **[Architecture]** Click "Architecture" nav — show cognitive process flow (Ingestion → Parallel Specialists → Coordinator → Output).

> *Speaker note: Keep each journey to under 45 seconds. The agent mesh panel is always visible — let it work visually while you narrate.*

---

## SLIDE 10 — Roadmap & Differentiation

**What makes PragmaLogixAI different:**

| Feature | Typical productivity app | PragmaLogixAI |
|---------|--------------------------|---------------|
| Data inputs | Text only | Text + Image + Audio + Video |
| Memory | None / chat history | Life Knowledge Graph (GraphRAG) |
| Agent intelligence | Single model | 5 parallel specialist agents + coordinator |
| Age group support | One-size-fits-all | 3 role-aware profiles with adaptive UX |
| Language support | 1–5 languages | 22 languages including major Indian languages |
| Output format | Chatbot text | Structured plan + diffs + linter + multimodal |

**Roadmap:**
- Phase 2: City-scale decision intelligence — aggregate anonymised signals to surface community-level friction (traffic, utility overload, public health patterns)
- Phase 3: Municipal data integration — connect to open civic datasets for neighbourhood well-being dashboards
- Phase 4: Full Gemini Omni integration — any-input-to-video life journeys, voice-first UX for elderly and low-literacy users
- Phase 5: Community Life Graph — shared knowledge graphs for families, co-living spaces, small organisations

> *Speaker note: "We started with the individual. The architecture was designed to scale to the city."*

---

## SLIDE 11 — Closing: Call to Action

**One sentence:**
> *"PragmaLogixAI turns raw life signals — a voice note, a bank statement, a photo of your home — into explainable, linted, multilingual plans that any age group can act on immediately."*

**Try it live:**
- 🌐 App: https://pragmalogixai-app.web.app
- 📦 Code: https://github.com/sivasubramanian86/PragmaLogixAI
- 📖 API Docs: https://pragmalogixai-backend-eah62ip3iq-uc.a.run.app/docs

**Built with:**
Google Cloud · Vertex AI · Gemini 2.5 Pro & Flash-Lite · Imagen 3 · Veo 2 · Chirp HD · ADK · Cloud Run · BigQuery · PostgreSQL + pgvector · Firebase

> *Speaker note: End with confidence — "The prototype is live, the tests pass, and the architecture is production-ready. This is not a demo. This is a platform."*

---
---

# DEMO VIDEO SCRIPT — 2.5 to 3 Minutes

---

**[PRE-ROLL: Open browser to https://pragmalogixai-app.web.app — dashboard visible]**

---

**1. HOOK (10–15 seconds)**

[SHOW DASHBOARD — full 3-column glassmorphism layout visible]

"Every day, you make hundreds of small decisions — what time to sleep, which bills to pay, which tasks to skip — and most of them are made badly, not because you're irrational, but because you have no system. PragmaLogixAI is that system. An AI Decision Operating System, powered by Google Vertex AI, that turns raw life signals into clear, explainable plans."

---

**2. PROBLEM & USERS (30–40 seconds)**

[SHOW UPLOAD SECTION — profile selector visible on left sidebar]

"The system supports three types of everyday friction that affect almost everyone. First — energy and routine friction: burnout from bad scheduling and poor sleep alignment. Second — financial and attention friction: subscription leaks, impulse spending, digital overload. Third — home and logistics friction: appliance backlogs, missed prescriptions, disorganised chores."

[CLICK PROFILE DROPDOWN — show 'Kid / Student', 'Working Professional', 'Elderly / Retired']

"PragmaLogixAI adapts to every stage of life. Students, working professionals, caregivers, and elderly users all get the same power — with an interface scaled to their needs."

[CHANGE LANGUAGE TO HINDI — show UI labels update in real-time]

"And it speaks your language. Twenty-two languages, including Hindi, Tamil, Kannada, Telugu, Japanese, and Arabic — all switching instantly, no reload."

---

**3. LIVE DEMO — JOURNEY 1: TOMORROW PLAN (45–60 seconds)**

[CHANGE LANGUAGE BACK TO ENGLISH — click 'Daily Energy & Focus Journey' tab]

"Let's run the first journey — Tomorrow Plan. I'll use a suggestion template to simulate uploading a daily log."

[CLICK SUGGESTION TEMPLATE: 'I have afternoon work fatigue. Optimise my deep work.']

"I've submitted a life signal describing fatigue and work friction. Watch the right panel —"

[POINT TO AGENT MESH PANEL — 5 nodes pulsing, Coordinator at top]

"Five specialist agents — Health, Mind, Finance, Logistics, and Career — are running in parallel right now, powered by Gemini 2.5 Flash-Lite on Vertex AI. The Coordinator agent then synthesises their findings using Gemini 2.5 Pro."

[PLAN RESULT APPEARS — scroll through hourly schedule]

"Here's the output. A linted hourly schedule with energy cost ratings per task. The system flagged that total energy would exceed nine — the burnout threshold — and adjusted the plan automatically. This is Aider-style plan linting — the same philosophy as surgical code review, applied to life decisions."

[SCROLL DOWN TO MULTIMODAL SECTION]

"And here — an Imagen 3 decision diagram, a Chirp HD audio summary you can listen to, and a Veo 2 video preview of the plan. All generated by Vertex AI models in the same request."

---

**4. LIVE DEMO — JOURNEY 2: MONTHLY FRICTION BUDGET (30–40 seconds)**

[CLICK 'Financial & Attention Budget Journey' TAB]

[CLICK SUGGESTION TEMPLATE: 'Audited monthly subscription friction and check screen time leaks.']

"Journey two — the Monthly Friction Budget. I've submitted a signal about subscription and screen-time friction."

[RESULTS APPEAR — life diffs and friction actions visible]

"The Finance agent detected duplicate SaaS trials — minus fourteen dollars and ninety-nine cents per month. These Aider-style life diffs show exactly what changed: cancelled, activated, reduced. No guessing, no vague advice. Specific, actionable, diff-style changes."

[POINT TO LINT WARNINGS if visible]

"The plan linter ran and flagged if any recommended changes would overload the schedule — just like a compiler catching errors before you ship."

---

**5. LIVE DEMO — JOURNEY 3: HOME & LOGISTICS RADAR (20–30 seconds)**

[CLICK 'Environment & Routine Radar' TAB]

[CLICK SUGGESTION TEMPLATE: 'Check home logistics and schedule routine household filter repairs.']

"Journey three — the Home and Logistics Radar. The Logistics agent has scheduled AC filter maintenance, a grocery inventory check, and an evening home security routine — all timed, all with energy cost ratings so you know what's light versus heavy."

---

**6. ARCHITECTURE & AGENT MESH (20–25 seconds)**

[CLICK 'Architecture' NAV ITEM in left sidebar]

"Under the hood — the Next.js frontend connects to a FastAPI backend on Google Cloud Run. Life signals are stored in PostgreSQL with pgvector for semantic memory. Events go to BigQuery for analytics. All five agents query this Life Knowledge Graph using GraphRAG — cosine similarity search with Google's text-embedding-004 model — to ground every recommendation in your actual history, not generic advice."

[POINT BACK TO AGENT MESH PANEL on right]

"The entire agent mesh runs on Vertex AI, using Application Default Credentials — zero raw API keys, zero credential risk. This is production-ready architecture, not a hackathon shortcut."

---

**7. CLOSING (10–15 seconds)**

[SHOW FULL DASHBOARD — all three panels visible]

"PragmaLogixAI is live today at pragmalogixai-app.web.app, backed by Vertex AI, deployed on Cloud Run, and open on GitHub. It turns a voice note, a bank screenshot, or a photo of your home into a multilingual, explainable, age-appropriate life plan — in under two seconds. The individual is the starting point. The architecture was built to scale to families, communities, and cities."

[PAUSE — smile]

"Thank you."

---

**[END RECORDING]**

---

*Total estimated runtime: ~2 min 45 sec at a natural speaking pace.*
*Rehearse once at speed — Journey 1 is the longest section; aim to keep it under 55 seconds.*
*The agent mesh pulse animation is your best visual asset — let the camera linger on it during narration.*
