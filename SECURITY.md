# Security Policy - PragmaLogixAI

## Supported Versions

Only the active prototype is currently supported for security updates:

| Version | Supported |
| ------- | --------- |
| 1.0.x   | Yes       |

## Threat Model & Access Control

*   **Multimodal Ingestion:** Audited to filter PII and prompt injection.
*   **Access Credentials:** All API tokens (Vertex AI, BigQuery) are read from Secret Manager.
*   **IAM Identity:** Custom service accounts limit access to `roles/secretmanager.secretAccessor` and specific BigQuery/PostgreSQL datasets.

## Reporting a Vulnerability

Please do not open GitHub Issues for security vulnerabilities. Send security reports directly via private email or contact the hackathon team coordinators.
