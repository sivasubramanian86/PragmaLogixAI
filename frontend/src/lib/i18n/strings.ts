/**
 * Strings interface — single source of truth for all translatable UI keys.
 * Kept in a standalone file so language files can import it WITHOUT
 * creating a circular dependency with translations.ts.
 *
 * Import chain (no cycles):
 *   strings.ts          ← no imports from this package
 *   i18n/en.ts          ← imports { Strings } from "./strings"
 *   i18n/es.ts…id.ts   ← imports { Strings } from "./strings", { en } from "./en"
 *   translations.ts     ← imports language files, re-exports Strings + helpers
 */
import type { Language, AgeGroup } from "../types";

export interface Strings {
  // Brand
  title:    string;
  subtitle: string;

  // Upload / Ingest
  uploadSignal:        string;
  uploadHelp:          string;
  ingestSignalHeader:  string;
  ingestionLogs:       string;
  ingestSummary:       string;
  extractedNodes:      string;
  extractedEdges:      string;
  extractedEvents:     string;

  // Journey Plans
  tomorrowPlan:  string;
  frictionBudget:string;
  logisticsRadar:string;
  generatePlan:  string;

  // Plan output sections
  activeSubscriptions: string;
  hourlySchedule:      string;
  frictionActions:     string;
  lifeDiffs:           string;
  lintWarnings:        string;

  // Profile
  profileLabel: string;
  profiles:     Record<AgeGroup, string>;

  // Language picker
  languages: Record<Language, string>;

  // Navigation
  nav: {
    dashboard: string;
    features:  string;
    about:     string;
    faq:       string;
    help:      string;
    settings:  string;
  };

  // Sidebar status
  workspace:        string;
  activeProfile:    string;
  decisionOS:       string;
  meshState:        string;
  online:           string;
  agentMeshPipeline:string;

  // Workspace header / section titles
  systemDashboard:   string;
  journeyPlanOutcome:string;

  // Outcomes view
  decisionTemplates: string;
  templatesDesc:     string;
  generatedFor:      string;

  // Plan section — empty state + actions
  awaitingSignal:     string;
  awaitingDesc:       string;
  runningPipeline:    string;
  generateFirst:      string;
  notebookSummary:    string;
  loadingDialogue:    string;

  // Metric Dashboard
  dashboardTitle:        string;
  cognitiveClarity:      string;
  dailyEnergy:           string;
  financialLeaks:        string;
  routineFriction:       string;
  activeKnowledgeGraph:  string;
  tacticalNodes:         string;
  monitoredEdges:        string;
  graphRAGLatency:       string;
  recentDecisionLog:     string;
  confusingYou:          string;
  selectTemplate:        string;
  tpl1: string;
  tpl2: string;
  tpl3: string;
}
