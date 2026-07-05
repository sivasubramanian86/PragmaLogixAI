'use client';
/**
 * usePipeline — custom React hook that manages the full
 * signal-ingestion → plan-generation pipeline state.
 *
 * Decouples all async logic from presentation components.
 */

import { useState, useCallback } from 'react';
import { ingestSignal, plan } from '@/lib/api';
import type { AgeGroup, Journey, PipelineState } from '@/lib/types';

const INITIAL: PipelineState = {
  stage:        'idle',
  error:        null,
  ingestResult: null,
  planResult:   null,
};

export interface PipelineActions {
  runPipeline: (
    file:     File | null,
    userId:   string,
    query:    string,
    ageGroup: AgeGroup,
    journey:  Journey,
  ) => Promise<void>;
  reset: () => void;
}

export function usePipeline(): [PipelineState, PipelineActions] {
  const [state, setState] = useState<PipelineState>(INITIAL);

  const reset = useCallback(() => setState(INITIAL), []);

  const runPipeline = useCallback(async (
    file:     File | null,
    userId:   string,
    query:    string,
    ageGroup: AgeGroup,
    journey:  Journey,
  ) => {
    setState({ ...INITIAL, stage: 'uploading' });

    try {
      // ── Step 1: ingest (optional — only if a file was attached) ──────
      let ingestResult = null;
      if (file) {
        setState(s => ({ ...s, stage: 'ingesting' }));
        ingestResult = await ingestSignal(file, userId);
      }

      // ── Step 2: plan ─────────────────────────────────────────────────
      setState(s => ({ ...s, stage: 'planning', ingestResult }));
      const planResult = await plan(journey, { user_id: userId, query, age_group: ageGroup });

      setState({ stage: 'done', error: null, ingestResult, planResult });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setState(s => ({ ...s, stage: 'error', error: message }));
    }
  }, []);

  return [state, { runPipeline, reset }];
}
