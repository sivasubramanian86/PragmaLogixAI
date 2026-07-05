# Security Policy — PragmaLogixAI

> **Principle:** No raw API key ever enters the codebase, runtime environment, or Git history.  
> All Google Cloud access uses Application Default Credentials (ADC) and IAM identity-based auth.

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x (current) | ✅ Yes |

---

## Threat Model

### Assets & Attack Surfaces

| Asset | Location | Protection |
|-------|----------|-----------|
| Vertex AI / Gemini access | Cloud Run service account | IAM `roles/aiplatform.user` only — no key export |
| PostgreSQL credentials | GCP Secret Manager | Injected via `--set-secrets` at Cloud Run start; never in env plaintext or logs |
| BigQuery data | GCP project | SA scoped to `roles/bigquery.dataEditor` on `pragmalogix` dataset only |
| GCS staging bucket | `gs://pragmalogixai-staging` | SA scoped to `roles/storage.objectAdmin` on that bucket only |
| Multimodal uploads | GCS → Gemini inline | Files staged to GCS; referenced by URI; not stored in DB |
| User life-signal data | PostgreSQL graph_nodes | No PII stored — only anonymised tactical IDs (`user_adult`, `user_123`) |

### Mitigated Threats

| Threat | Mitigation |
|--------|-----------|
| Credential leakage via Git | `.env`, `.env.local`, `*.pem`, `*.key`, `service-account-key.json` in `.gitignore` |
| Prompt injection via uploaded files | Gemini processes files via structured extraction prompt with strict JSON schema; raw content never reaches SQL |
| SQL injection | SQLAlchemy parameterised queries throughout (`text()` with named params, never f-strings) |
| CORS bypass | `ALLOWED_ORIGINS` env var; `*` only in local dev; restricted to Cloud Run origin in production |
| Unauthenticated backend access | `--no-allow-unauthenticated` on Cloud Run backend; only frontend (and service accounts) can invoke it |
| Over-privileged service account | Dedicated `pragmalogixai-backend` SA with exactly 5 specific roles; no project Owner/Editor |
| Secret rotation lag | Secrets versioned in Secret Manager; Cloud Run references `:latest` — rotate by creating new version |

---

## Credential Architecture

```
Local Dev:
  gcloud auth application-default login
  → ~/.config/gcloud/application_default_credentials.json
  → Picked up by vertexai.init(), google-cloud-*, etc.

Cloud Run (Production):
  Service Account: pragmalogixai-backend@genai-apac-2026-491004.iam.gserviceaccount.com
  → Attached to Cloud Run service at deploy time (--service-account flag)
  → All Google Cloud SDK calls automatically use this SA identity
  → No JSON key file ever created or downloaded

DATABASE_URL:
  Stored in: projects/genai-apac-2026-491004/secrets/pragmalogixai-db-url
  Injected at startup: gcloud run deploy ... --set-secrets=DATABASE_URL=pragmalogixai-db-url:latest
  Available in process as: os.environ["DATABASE_URL"]
  Never logged, never returned in API responses
```

---

## IAM Role Summary

| Role | Granted To | Scope |
|------|-----------|-------|
| `roles/aiplatform.user` | `pragmalogixai-backend` SA | Project-level (Vertex AI inference) |
| `roles/bigquery.dataEditor` | `pragmalogixai-backend` SA | Project-level (insert to `pragmalogix` dataset) |
| `roles/storage.objectAdmin` | `pragmalogixai-backend` SA | `gs://pragmalogixai-staging` bucket |
| `roles/secretmanager.secretAccessor` | `pragmalogixai-backend` SA | `pragmalogixai-db-url` secret only |
| `roles/run.invoker` | `pragmalogixai-backend` SA | Backend service (inter-service calls) |

No `roles/owner`, `roles/editor`, or `roles/iam.serviceAccountTokenCreator` are granted.

---

## Data Handling & PII

- **No PII is stored.** User IDs are anonymised tactical identifiers (`user_adult`, `user_123`) — never email addresses, names, or phone numbers.
- **Uploaded files** are staged to GCS (`uploads/{filename}`) and referenced by URI. Raw bytes are not persisted in the database.
- **Life events in BigQuery** contain only category, description, and numeric value — no identifying personal data.
- **Graph nodes** store habit/pain/event labels and descriptions extracted by Gemini — no sensitive personal identifiers.

---

## Dependency Security

- All Python dependencies are pinned to minimum versions in `requirements.txt`.
- `npm audit` warnings for Next.js `15.3.4` (CVE-2025-66478) — tracked; upgrade path is `next@15.3.5+` when available.
- No `--omit=dev` in frontend Docker build stage (TypeScript types needed for compilation); dev deps are excluded from the final runtime image via multi-stage build.

---

## Reporting a Vulnerability

**Do not open a public GitHub Issue for security vulnerabilities.**

Contact the maintainer directly:
- GitHub: [@sivasubramanian86](https://github.com/sivasubramanian86)
- Repository: https://github.com/sivasubramanian86/PragmaLogixAI

Please include:
1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested mitigation (if known)

We aim to acknowledge reports within 48 hours and provide a fix or mitigation within 7 days for critical issues.
