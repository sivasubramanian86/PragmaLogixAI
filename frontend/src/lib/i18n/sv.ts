import type { Strings } from "./strings";
import { en } from "./en";

export const sv: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "Livsbeslut OS",
  uploadSignal: "Ladda upp livssignal", uploadHelp: "Skicka röstanteckning, faktura eller checklista",
  ingestSignalHeader: "Ta in och bearbeta livssignal", ingestionLogs: "Bearbetningsloggar",
  ingestSummary: "Livssignal bearbetad", extractedNodes: "Extraherade noder:", extractedEdges: "Extraherade kanter:", extractedEvents: "Extraherade handelser:",
  tomorrowPlan: "Daglig Energi och Fokusresa", frictionBudget: "Finansiell och Uppmarksamhetsbudgetresa", logisticsRadar: "Miljo och Rutinradar",
  generatePlan: "Generera Plan", activeSubscriptions: "Aktiva prenumerationer", hourlySchedule: "Timschema",
  frictionActions: "Friktionsminskningsatgarder", lifeDiffs: "Livsskillnader", lintWarnings: "Plankontroller", profileLabel: "Valj Profil",
  profiles: { student: "Barn / Student", adult: "Yrkesverksam", senior: "Senior / Pensionar" },
  nav: { dashboard: "Instrumentpanel", features: "Funktioner", about: "Arkitektur", faq: "Vanliga fragor", help: "Anvandarguide", settings: "Installningar" },
  workspace: "Arbetsyta", activeProfile: "Aktivt Profil", decisionOS: "Besluts-OS:", meshState: "Natverksstatus:", online: "Online",
  agentMeshPipeline: "Agent Mesh Pipeline", systemDashboard: "Systeminstrumentpanel", journeyPlanOutcome: "Reseplan och Resultat",
  decisionTemplates: "Beslutsmallar", templatesDesc: "Valj en livsbeslutsmall for att syntetisera agentresultat.",
  generatedFor: "Genererad for", awaitingSignal: "Vantar pa livssignal", awaitingDesc: "Konfigurera din profil, ladda upp en livssignal och klicka pa Generera Plan.",
  runningPipeline: "Agentmesh bearbetar...", generateFirst: "Ga till Generera Plan for att starta pipelinen.",
  notebookSummary: "NotebookLM Podcast Dialog", loadingDialogue: "Genererar dialogskript...",
  dashboardTitle: "Systeminstrumentpanel", cognitiveClarity: "Kognitiv Klarhetsindex", dailyEnergy: "Daglig Energipong",
  financialLeaks: "Granskade Finansiella Lackor", routineFriction: "Rutinlogistisk Friktion",
  activeKnowledgeGraph: "Aktivt Kunskapsgraaf", tacticalNodes: "Taktiska Entiteter (Noder)", monitoredEdges: "Overvakade Relationer (Kanter)",
  graphRAGLatency: "GraphRAG Latens", recentDecisionLog: "Senaste Beslutslogg",
  confusingYou: "Vad forvirrar dig just nu?", selectTemplate: "Valj en mall for en planeringssimuling:",
  tpl1: "Jag har arbetsutmattning pa eftermiddagen. Optimera mitt djupa arbete.", tpl2: "Granska manatliga abonnemangsfriktion.", tpl3: "Kontrollera hemlogistik och schemalägg filterreparationer.",
};
