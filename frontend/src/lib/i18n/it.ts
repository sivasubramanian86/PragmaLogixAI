import type { Strings } from "./strings";
import { en } from "./en";

export const it: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "OS Decisionale Vita",
  uploadSignal: "Carica segnale di vita", uploadHelp: "Invia nota vocale, fattura o lista attivita",
  ingestSignalHeader: "Carica ed elabora il segnale di vita", ingestionLogs: "Log di elaborazione",
  ingestSummary: "Segnale di vita elaborato", extractedNodes: "Nodi estratti:", extractedEdges: "Archi estratti:", extractedEvents: "Eventi estratti:",
  tomorrowPlan: "Piano Energia e Focus Giornaliero", frictionBudget: "Budget Finanziario e Attenzione", logisticsRadar: "Radar Ambiente e Routine",
  generatePlan: "Genera Piano", activeSubscriptions: "Abbonamenti attivi", hourlySchedule: "Orario",
  frictionActions: "Azioni di riduzione delle frizioni", lifeDiffs: "Differenze di vita", lintWarnings: "Verifiche del piano", profileLabel: "Seleziona Profilo",
  profiles: { student: "Bambino / Studente", adult: "Professionista Attivo", senior: "Anziano / Pensionato" },
  nav: { dashboard: "Dashboard", features: "Capacita", about: "Architettura", faq: "FAQ", help: "Guida Utente", settings: "Impostazioni" },
  workspace: "Area di Lavoro", activeProfile: "Profilo Attivo", decisionOS: "OS Decisionale:", meshState: "Stato Rete:", online: "Online",
  agentMeshPipeline: "Pipeline Agenti", systemDashboard: "Dashboard di Sistema", journeyPlanOutcome: "Piano Percorso e Risultato",
  decisionTemplates: "Modelli di Decisione", templatesDesc: "Seleziona un modello di decisione vita per sintetizzare i risultati degli agenti.",
  generatedFor: "Generato per", awaitingSignal: "In attesa del segnale di vita", awaitingDesc: "Configura il profilo, carica un segnale di vita, poi clicca Genera Piano.",
  runningPipeline: "Rete agenti in elaborazione...", generateFirst: "Vai a Genera Piano per avviare la pipeline.",
  notebookSummary: "Dialogo Podcast NotebookLM", loadingDialogue: "Generazione script dialogo...",
  dashboardTitle: "Dashboard di Sistema", cognitiveClarity: "Indice di Chiarezza Cognitiva", dailyEnergy: "Punteggio Energia Giornaliero",
  financialLeaks: "Perdite Finanziarie Verificate", routineFriction: "Attrito Logistico di Routine",
  activeKnowledgeGraph: "Grafo di Conoscenza Attivo", tacticalNodes: "Entita Tattiche (Nodi)", monitoredEdges: "Relazioni Monitorate (Archi)",
  graphRAGLatency: "Latenza GraphRAG", recentDecisionLog: "Registro Decisioni Recenti",
  confusingYou: "Cosa ti confonde in questo momento?", selectTemplate: "Seleziona un modello per una simulazione di pianificazione:",
  tpl1: "Ho stanchezza lavorativa nel pomeriggio. Ottimizza il mio lavoro profondo.", tpl2: "Verificare le frizioni degli abbonamenti mensili.", tpl3: "Controllare la logistica domestica e programmare riparazioni.",
};
