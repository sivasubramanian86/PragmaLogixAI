import type { Strings } from "./strings";
import { en } from "./en";

export const pt: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "OS de Decisao de Vida",
  uploadSignal: "Enviar sinal de vida", uploadHelp: "Envie nota de voz, fatura ou lista de tarefas",
  ingestSignalHeader: "Ingerir e processar sinal de vida", ingestionLogs: "Registros de processamento",
  ingestSummary: "Sinal de vida processado", extractedNodes: "Nos extraidos:", extractedEdges: "Arestas extraidas:", extractedEvents: "Eventos extraidos:",
  tomorrowPlan: "Jornada Diaria de Energia e Foco", frictionBudget: "Jornada de Orcamento Financeiro e Atencao", logisticsRadar: "Radar de Ambiente e Rotina",
  generatePlan: "Gerar Plano", activeSubscriptions: "Assinaturas Ativas", hourlySchedule: "Agenda por horas",
  frictionActions: "Acoes de Reducao de Friccao", lifeDiffs: "Diferencas de vida", lintWarnings: "Verificacoes do plano", profileLabel: "Selecionar Perfil",
  profiles: { student: "Crianca / Estudante", adult: "Profissional Ativo", senior: "Idoso / Aposentado" },
  nav: { dashboard: "Painel", features: "Capacidades", about: "Arquitetura", faq: "FAQ", help: "Guia do Usuario", settings: "Configuracoes" },
  workspace: "Area de Trabalho", activeProfile: "Perfil Ativo", decisionOS: "OS de Decisao:", meshState: "Estado da Rede:", online: "Online",
  agentMeshPipeline: "Pipeline de Agentes", systemDashboard: "Painel do Sistema", journeyPlanOutcome: "Plano de Jornada e Resultado",
  decisionTemplates: "Modelos de Decisao", templatesDesc: "Selecione um modelo de decisao de vida para sintetizar os resultados dos agentes.",
  generatedFor: "Gerado para", awaitingSignal: "Aguardando Sinal de Vida", awaitingDesc: "Configure seu perfil, carregue um sinal de vida e clique em Gerar Plano.",
  runningPipeline: "Rede de agentes processando...", generateFirst: "Va para Gerar Plano para iniciar o pipeline.",
  notebookSummary: "Dialogo de Podcast NotebookLM", loadingDialogue: "Gerando script de dialogo...",
  dashboardTitle: "Painel do Sistema", cognitiveClarity: "Indice de Clareza Cognitiva", dailyEnergy: "Pontuacao de Energia Diaria",
  financialLeaks: "Vazamentos Financeiros Auditados", routineFriction: "Friccao de Logistica de Rotina",
  activeKnowledgeGraph: "Grafico de Conhecimento Ativo", tacticalNodes: "Entidades Taticas (Nos)", monitoredEdges: "Relacoes Monitoradas (Arestas)",
  graphRAGLatency: "Latencia GraphRAG", recentDecisionLog: "Registro de Decisoes Recentes",
  confusingYou: "O que esta te confundindo agora?", selectTemplate: "Selecione um modelo de decisao de vida para executar uma simulacao de planejamento:",
  tpl1: "Tenho fadiga de trabalho a tarde. Otimize meu trabalho profundo.", tpl2: "Auditar atrito de assinaturas mensais.", tpl3: "Verificar logistica domestica e agendar reparos de filtros.",
};
