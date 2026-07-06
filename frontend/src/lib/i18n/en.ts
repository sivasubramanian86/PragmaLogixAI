import type { Strings } from "./strings";

export const en: Strings = {
  // Brand
  title:    "PragmaLogixAI",
  subtitle: "Life Decision OS",

  // Upload / Ingest
  uploadSignal:        "Upload Life Signal",
  uploadHelp:          "Submit voice note, invoice, or daily checklist (audio/image/video)",
  ingestSignalHeader:  "Ingest & Process Life Signal",
  ingestionLogs:       "Ingestion Processing Logs",
  ingestSummary:       "Life Signal Processed",
  extractedNodes:      "Extracted Nodes:",
  extractedEdges:      "Extracted Edges:",
  extractedEvents:     "Extracted Events:",

  // Journey Plans
  tomorrowPlan:   "Daily Energy & Focus Journey",
  frictionBudget: "Financial & Attention Budget Journey",
  logisticsRadar: "Environment & Routine Radar",
  generatePlan:   "Generate Plan",

  // Plan output sections
  activeSubscriptions: "Active Subscriptions",
  hourlySchedule:      "Hourly Schedule",
  frictionActions:     "Friction Reduction Actions",
  lifeDiffs:           "Life Diffs (Incremental changes)",
  lintWarnings:        "Plan Consistency Checks (Linter)",

  // Profile
  profileLabel: "Select Profile Role",
  profiles: {
    student: "Kid / Student",
    adult:   "Working Professional",
    senior:  "Elderly / Retired",
  },

  // Language picker — filled dynamically by aggregator
  languages: {} as any,

  // Navigation
  nav: {
    dashboard: "Dashboard",
    features:  "Capabilities",
    about:     "Architecture",
    faq:       "FAQ",
    help:      "User Guide",
    settings:  "Settings",
  },

  // Sidebar status
  workspace:         "Workspace",
  activeProfile:     "Active Profile",
  decisionOS:        "Decision OS:",
  meshState:         "Mesh State:",
  online:            "Online",
  agentMeshPipeline: "Agent Mesh Pipeline",

  // Workspace header
  systemDashboard:    "System Dashboard",
  journeyPlanOutcome: "Journey Plan & Outcome",

  // Outcomes view
  decisionTemplates: "Decision Templates",
  templatesDesc:     "Select a pre-loaded life decision profile below to synthesize agent outcomes.",
  generatedFor:      "Generated for",

  // Plan section — empty state
  awaitingSignal:  "Awaiting Life Signal Ingestion",
  awaitingDesc:    "Configure your profile, choose or upload a life signal in the Generate Plan section, then click Generate Plan to start the analysis.",
  runningPipeline: "Agent Mesh Processing...",
  generateFirst:   "Go to Generate Plan to start the pipeline.",
  notebookSummary: "NotebookLM Podcast Dialogue",
  loadingDialogue: "Generating dialogue script...",

  // Metric Dashboard
  dashboardTitle:       "System Dashboard",
  cognitiveClarity:     "Cognitive Clarity Index",
  dailyEnergy:          "Daily Energy Score",
  financialLeaks:       "Audited Financial Leaks",
  routineFriction:      "Routine Logistics Friction",
  activeKnowledgeGraph: "Active Knowledge Graph",
  tacticalNodes:        "Tactical Entities (Nodes)",
  monitoredEdges:       "Monitored Relations (Edges)",
  graphRAGLatency:      "GraphRAG Grounding Latency",
  recentDecisionLog:    "Recent Decision Log",
  confusingYou:         "What is confusing you right now?",
  selectTemplate:       "Select a life decision template below to run a planning simulation immediately:",
  tpl1: "I have afternoon work fatigue. Optimise my deep work.",
  tpl2: "Audited monthly subscription friction and check screen time leaks.",
  tpl3: "Check home logistics and schedule routine household filter repairs.",
};
