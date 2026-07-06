import type { Strings } from "./strings";
import { en } from "./en";

export const nl: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "Levens Beslissing OS",
  uploadSignal: "Levenssignaal uploaden", uploadHelp: "Stuur een spraaknotitie, factuur of takenlijst",
  ingestSignalHeader: "Levenssignaal opnemen en verwerken", ingestionLogs: "Verwerkingslogboeken",
  ingestSummary: "Levenssignaal verwerkt", extractedNodes: "Geextraheerde knooppunten:", extractedEdges: "Geextraheerde randen:", extractedEvents: "Geextraheerde gebeurtenissen:",
  tomorrowPlan: "Dagelijkse Energie en Focus Reis", frictionBudget: "Financieel en Aandachtsbudget Reis", logisticsRadar: "Omgeving en Routine Radar",
  generatePlan: "Plan Genereren", activeSubscriptions: "Actieve abonnementen", hourlySchedule: "Uurrooster",
  frictionActions: "Wrijvingsverminderingsacties", lifeDiffs: "Levensverschillen", lintWarnings: "Plancontroles", profileLabel: "Profiel Selecteren",
  profiles: { student: "Kind / Student", adult: "Werkende Professional", senior: "Bejaarde / Gepensioneerd" },
  nav: { dashboard: "Dashboard", features: "Mogelijkheden", about: "Architectuur", faq: "FAQ", help: "Gebruikershandleiding", settings: "Instellingen" },
  workspace: "Werkruimte", activeProfile: "Actief Profiel", decisionOS: "Beslissings-OS:", meshState: "Netwerkstatus:", online: "Online",
  agentMeshPipeline: "Agent Mesh Pipeline", systemDashboard: "Systeemdashboard", journeyPlanOutcome: "Reisplan en Resultaat",
  decisionTemplates: "Beslissingssjablonen", templatesDesc: "Selecteer een levensbesslissingssjabloon om agentresultaten te synthetiseren.",
  generatedFor: "Gegenereerd voor", awaitingSignal: "Wachten op levenssignaal", awaitingDesc: "Configureer uw profiel, upload een levenssignaal en klik op Plan Genereren.",
  runningPipeline: "Agent mesh verwerkt...", generateFirst: "Ga naar Plan Genereren om de pipeline te starten.",
  notebookSummary: "NotebookLM Podcast Dialoog", loadingDialogue: "Dialoogscript genereren...",
  dashboardTitle: "Systeemdashboard", cognitiveClarity: "Cognitieve Helderheidsindex", dailyEnergy: "Dagelijkse Energiescore",
  financialLeaks: "Gecontroleerde Financiele Lekken", routineFriction: "Routinelogistieke Wrijving",
  activeKnowledgeGraph: "Actief Kennisgraaf", tacticalNodes: "Tactische Entiteiten (Knooppunten)", monitoredEdges: "Bewaakte Relaties (Randen)",
  graphRAGLatency: "GraphRAG Latentie", recentDecisionLog: "Recent Beslissingslogboek",
  confusingYou: "Wat verwarrt u nu?", selectTemplate: "Selecteer een sjabloon voor een planningssimulatie:",
  tpl1: "Ik heb 's middags werkvermoeidheid. Optimaliseer mijn diep werk.", tpl2: "Maandelijkse abonnementsfrictie controleren.", tpl3: "Thuislogistiek controleren en filterreparaties plannen.",
};
