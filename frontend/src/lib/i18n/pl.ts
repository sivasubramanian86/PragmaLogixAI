import type { Strings } from "./strings";
import { en } from "./en";

export const pl: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "Zyciowy System Decyzji",
  uploadSignal: "Przeslij sygnal zyciowy", uploadHelp: "Przeslij notatke glosowa, fakture lub liste zadan",
  ingestSignalHeader: "Przejm i przetworz sygnal zyciowy", ingestionLogs: "Dzienniki przetwarzania",
  ingestSummary: "Sygnal zyciowy przetworzony", extractedNodes: "Wyodrebnione wezly:", extractedEdges: "Wyodrebnione krawedzie:", extractedEvents: "Wyodrebnione zdarzenia:",
  tomorrowPlan: "Codzienna Podroz Energii i Skupienia", frictionBudget: "Podroz Budzetu Finansowego i Uwagi", logisticsRadar: "Radar Srodowiska i Rutyny",
  generatePlan: "Generuj Plan", activeSubscriptions: "Aktywne subskrypcje", hourlySchedule: "Harmonogram godzinowy",
  frictionActions: "Dzialania redukcji tarcia", lifeDiffs: "Roznice zyciowe", lintWarnings: "Kontrole planu", profileLabel: "Wybierz Profil",
  profiles: { student: "Dziecko / Student", adult: "Pracujacy Profesjonalista", senior: "Senior / Emeryt" },
  nav: { dashboard: "Panel", features: "Mozliwosci", about: "Architektura", faq: "FAQ", help: "Przewodnik Uzytkownika", settings: "Ustawienia" },
  workspace: "Obszar Roboczy", activeProfile: "Aktywny Profil", decisionOS: "OS Decyzji:", meshState: "Stan Sieci:", online: "Online",
  agentMeshPipeline: "Potok Agentow", systemDashboard: "Panel Systemu", journeyPlanOutcome: "Plan Podrozy i Wynik",
  decisionTemplates: "Szablony Decyzji", templatesDesc: "Wybierz szablon decyzji zyciowej, aby syntetyzowac wyniki agentow.",
  generatedFor: "Wygenerowano dla", awaitingSignal: "Oczekiwanie na sygnal zyciowy", awaitingDesc: "Skonfiguruj profil, przeslij sygnal zyciowy i kliknij Generuj Plan.",
  runningPipeline: "Siec agentow przetwarza...", generateFirst: "Przejdz do Generuj Plan, aby uruchomic potok.",
  notebookSummary: "Dialog Podcastu NotebookLM", loadingDialogue: "Generowanie skryptu dialogu...",
  dashboardTitle: "Panel Systemu", cognitiveClarity: "Indeks Jasnosci Poznawczej", dailyEnergy: "Dzienny Wynik Energii",
  financialLeaks: "Skontrolowane Wycieki Finansowe", routineFriction: "Tarcie Logistyki Rutynowej",
  activeKnowledgeGraph: "Aktywny Graf Wiedzy", tacticalNodes: "Taktyczne Encje (Wezly)", monitoredEdges: "Monitorowane Relacje (Krawedzie)",
  graphRAGLatency: "Opoznienie GraphRAG", recentDecisionLog: "Ostatni Dziennik Decyzji",
  confusingYou: "Co cie teraz myli?", selectTemplate: "Wybierz szablon, aby uruchomic symulacje planowania:",
  tpl1: "Mam popobudniowe zmeczenie praca. Zoptymalizuj moja gleboka prace.", tpl2: "Zbadaj miesiczne tarcia subskrypcji.", tpl3: "Sprawdz logistyke domowa i zaplanuj naprawy filtrow.",
};
