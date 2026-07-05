/**
 * Shared TypeScript types for PragmaLogixAI frontend.
 * Single source of truth — imported by all components and hooks.
 */

// ── Domain primitives ─────────────────────────────────────────────────────

export type AgeGroup = 'adult' | 'senior' | 'student';
export type Journey  = 'tomorrow' | 'month' | 'home';
export type Language = 'en' | 'hi' | 'ta' | 'kn' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'zh' | 'pt' | 'ru' | 'ko' | 'ar' | 'tr' | 'nl' | 'sv' | 'pl' | 'vi' | 'th' | 'id' | 'te';

// ── API response shapes ───────────────────────────────────────────────────

export interface DailyPlanItem {
  hour:        string;
  task:        string;
  energy_cost: number;
}

export interface PlanResult {
  task_id:                 string;
  status:                  'SUCCESS' | 'ERROR';
  age_group:               AgeGroup;
  journey:                 Journey;
  daily_plan:              DailyPlanItem[];
  friction_budget_actions: string[];
  life_diffs:              string[];
  lint_warnings:           string[];
  specialist_reports:      Record<string, string>;
  cache_hit:               boolean;
  multimodal_outcomes?: {
    image_url: string;
    audio_url: string;
    video_url: string;
  };
}

export interface IngestResult {
  status:          string;
  user_id?:        string;
  nodes_extracted: number;
  edges_extracted: number;
  events_extracted:number;
  node_names:      string[];
}

// ── UI state ──────────────────────────────────────────────────────────────

export type Stage =
  | 'idle'
  | 'uploading'
  | 'ingesting'
  | 'planning'
  | 'done'
  | 'error';

export interface PipelineState {
  stage:        Stage;
  error:        string | null;
  ingestResult: IngestResult | null;
  planResult:   PlanResult   | null;
}
