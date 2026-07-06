import type { Strings } from "./strings";
import { en } from "./en";

export const de: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "Lebens-Entscheidungs-OS",
  uploadSignal: "Lebenssignal hochladen", uploadHelp: "Sprachnotiz, Rechnung oder Checkliste einreichen",
  ingestSignalHeader: "Lebenssignal einlesen und verarbeiten", ingestionLogs: "Verarbeitungsprotokolle",
  ingestSummary: "Lebenssignal verarbeitet", extractedNodes: "Extrahierte Knoten:", extractedEdges: "Extrahierte Kanten:", extractedEvents: "Extrahierte Ereignisse:",
  tomorrowPlan: "Tägliche Energie- & Fokusreise", frictionBudget: "Finanzielle & Aufmerksamkeitsbudgetreise", logisticsRadar: "Umgebungs- & Routineradar",
  generatePlan: "Plan erstellen", activeSubscriptions: "Aktive Abonnements", hourlySchedule: "Stundenplan",
  frictionActions: "Reibungsreduktionsmaßnahmen", lifeDiffs: "Lebensunterschiede", lintWarnings: "Planprüfungen", profileLabel: "Profil auswählen",
  profiles: { student: "Kind / Student", adult: "Berufstätiger Profi", senior: "Senior / Rentner" },
  nav: { dashboard: "Dashboard", features: "Fähigkeiten", about: "Architektur", faq: "FAQ", help: "Benutzerhandbuch", settings: "Einstellungen" },
  workspace: "Arbeitsbereich", activeProfile: "Aktives Profil", decisionOS: "Entscheidungs-OS:", meshState: "Netzwerkstatus:", online: "Online",
  agentMeshPipeline: "Agenten-Mesh-Pipeline", systemDashboard: "System-Dashboard", journeyPlanOutcome: "Reiseplan & Ergebnis",
  decisionTemplates: "Entscheidungsvorlagen", templatesDesc: "Wählen Sie eine Lebensentscheidungsvorlage aus, um Agentenergebnisse zu synthetisieren.",
  generatedFor: "Erstellt für", awaitingSignal: "Warten auf Lebenssignal", awaitingDesc: "Konfigurieren Sie Ihr Profil, laden Sie ein Lebenssignal hoch und klicken Sie auf Plan erstellen.",
  runningPipeline: "Agenten-Mesh verarbeitet...", generateFirst: "Gehen Sie zu Plan erstellen, um die Pipeline zu starten.",
  notebookSummary: "NotebookLM Podcast-Dialog", loadingDialogue: "Dialogskript wird erstellt...",
  dashboardTitle: "System-Dashboard", cognitiveClarity: "Kognitive Klarheitsindex", dailyEnergy: "Täglicher Energiewert",
  financialLeaks: "Geprüfte Finanzlecks", routineFriction: "Routinelogistikreibung",
  activeKnowledgeGraph: "Aktives Wissensgraph", tacticalNodes: "Taktische Entitäten (Knoten)", monitoredEdges: "Überwachte Beziehungen (Kanten)",
  graphRAGLatency: "GraphRAG-Latenz", recentDecisionLog: "Aktuelles Entscheidungsprotokoll",
  confusingYou: "Was verwirrt Sie gerade?", selectTemplate: "Wählen Sie eine Vorlage für eine Planungssimulation:",
  tpl1: "Ich habe nachmittags Arbeitsermüdung. Optimieren Sie meine Tiefenarbeit.", tpl2: "Monatliche Abonnementfriktion prüfen.", tpl3: "Haushaltslogistik prüfen und Filterreparaturen planen.",
};
