/**
 * Typed API client for PragmaLogixAI backend.
 *
 * All calls go through Next.js /api/* rewrite (next.config.ts),
 * so no CORS headers are needed and no raw backend URL is exposed
 * in the browser bundle.
 *
 * Auth: Cloud Run service-to-service auth is handled server-side;
 * the browser only talks to the Next.js origin.
 */

import type { AgeGroup, Journey, PlanResult, IngestResult } from './types';

const API_BASE = typeof window === "undefined" ? (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080") : "";

// ── Helper ────────────────────────────────────────────────────────────────

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(`API ${path} → ${res.status}: ${detail}`);
  }
  return res.json() as Promise<T>;
}

// ── Ingest ────────────────────────────────────────────────────────────────

export async function ingestSignal(
  file:   File,
  userId: string,
): Promise<IngestResult> {
  const form = new FormData();
  form.append('file',    file);
  form.append('user_id', userId);

  const res = await fetch(`${API_BASE}/api/v1/ingest`, {
    method: 'POST',
    body:   form,
    // No Content-Type header — browser sets it with boundary automatically
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => res.statusText);
    throw new Error(`POST /api/v1/ingest → ${res.status}: ${detail}`);
  }
  return res.json() as Promise<IngestResult>;
}

// ── Journey plans ─────────────────────────────────────────────────────────

interface PlanRequest {
  user_id:   string;
  query:     string;
  age_group: AgeGroup;
}

export async function planTomorrow(req: PlanRequest): Promise<PlanResult> {
  return post<PlanResult>('/api/v1/plan/tomorrow', req);
}

export async function planMonth(req: PlanRequest): Promise<PlanResult> {
  return post<PlanResult>('/api/v1/plan/month', req);
}

export async function planHome(req: PlanRequest): Promise<PlanResult> {
  return post<PlanResult>('/api/v1/plan/home', req);
}

/** Dispatch to the correct journey endpoint. */
export async function plan(journey: Journey, req: PlanRequest): Promise<PlanResult> {
  const endpoints: Record<Journey, (r: PlanRequest) => Promise<PlanResult>> = {
    tomorrow: planTomorrow,
    month:    planMonth,
    home:     planHome,
  };
  return endpoints[journey](req);
}
