import type { Strings } from "./strings";
import { en } from "./en";

export const fr: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "OS de Décision de Vie",
  uploadSignal: "Télécharger un signal de vie", uploadHelp: "Soumettre une note vocale, facture ou liste de tâches",
  ingestSignalHeader: "Ingérer et traiter le signal de vie", ingestionLogs: "Journaux de traitement",
  ingestSummary: "Signal de vie traité", extractedNodes: "Nœuds extraits :", extractedEdges: "Arêtes extraites :", extractedEvents: "Événements extraits :",
  tomorrowPlan: "Plan Énergie & Focus Quotidien", frictionBudget: "Budget Financier & Attentionnel", logisticsRadar: "Radar Environnement & Routine",
  generatePlan: "Générer le plan", activeSubscriptions: "Abonnements actifs", hourlySchedule: "Emploi du temps horaire",
  frictionActions: "Actions de réduction des frictions", lifeDiffs: "Différences de vie", lintWarnings: "Vérifications du plan", profileLabel: "Sélectionner le profil",
  profiles: { student: "Enfant / Étudiant", adult: "Professionnel Actif", senior: "Personne Âgée / Retraité" },
  nav: { dashboard: "Tableau de bord", features: "Capacités", about: "Architecture", faq: "FAQ", help: "Guide utilisateur", settings: "Paramètres" },
  workspace: "Espace de travail", activeProfile: "Profil actif", decisionOS: "OS de décision :", meshState: "État du réseau :", online: "En ligne",
  agentMeshPipeline: "Pipeline agent mesh", systemDashboard: "Tableau de bord système", journeyPlanOutcome: "Plan de parcours & Résultat",
  decisionTemplates: "Modèles de décision", templatesDesc: "Sélectionnez un modèle de décision de vie pour synthétiser les résultats.",
  generatedFor: "Généré pour", awaitingSignal: "En attente du signal de vie", awaitingDesc: "Configurez votre profil, téléchargez un signal de vie, puis cliquez sur Générer le plan.",
  runningPipeline: "Traitement du réseau d'agents...", generateFirst: "Allez à Générer le plan pour démarrer.",
  notebookSummary: "Dialogue Podcast NotebookLM", loadingDialogue: "Génération du script de dialogue...",
  dashboardTitle: "Tableau de bord système", cognitiveClarity: "Indice de clarté cognitive", dailyEnergy: "Score d'énergie quotidien",
  financialLeaks: "Fuites financières auditées", routineFriction: "Friction logistique routine",
  activeKnowledgeGraph: "Graphe de connaissances actif", tacticalNodes: "Entités tactiques (Nœuds)", monitoredEdges: "Relations surveillées (Arêtes)",
  graphRAGLatency: "Latence GraphRAG", recentDecisionLog: "Journal des décisions récentes",
  confusingYou: "Qu'est-ce qui vous trouble en ce moment ?", selectTemplate: "Sélectionnez un modèle de décision pour lancer une simulation de planification :",
  tpl1: "J'ai une fatigue professionnelle l'après-midi. Optimisez mon travail approfondi.", tpl2: "Auditer les frictions d'abonnements mensuelsy.", tpl3: "Vérifier la logistique domestique et planifier des réparations de filtres.",
};
