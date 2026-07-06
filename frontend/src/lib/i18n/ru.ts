import type { Strings } from "./strings";
import { en } from "./en";

export const ru: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "ОС жизненных решений",
  uploadSignal: "Загрузить жизненный сигнал", uploadHelp: "Отправить голосовую заметку, счёт или контрольный список",
  ingestSignalHeader: "Принять и обработать жизненный сигнал", ingestionLogs: "Журналы обработки",
  ingestSummary: "Жизненный сигнал обработан", extractedNodes: "Извлечённые узлы:", extractedEdges: "Извлечённые рёбра:", extractedEvents: "Извлечённые события:",
  tomorrowPlan: "Ежедневный маршрут энергии и фокуса", frictionBudget: "Финансовый маршрут и бюджет внимания", logisticsRadar: "Радар окружения и рутины",
  generatePlan: "Создать план", activeSubscriptions: "Активные подписки", hourlySchedule: "Расписание по часам",
  frictionActions: "Действия по снижению трений", lifeDiffs: "Жизненные различия", lintWarnings: "Проверки плана", profileLabel: "Выбрать профиль",
  profiles: { student: "Ребёнок / Студент", adult: "Работающий профессионал", senior: "Пожилой / На пенсии" },
  nav: { dashboard: "Панель управления", features: "Возможности", about: "Архитектура", faq: "ЧЗВ", help: "Руководство", settings: "Настройки" },
  workspace: "Рабочее пространство", activeProfile: "Активный профиль", decisionOS: "ОС решений:", meshState: "Состояние сети:", online: "Онлайн",
  agentMeshPipeline: "Конвейер агентов", systemDashboard: "Системная панель", journeyPlanOutcome: "Маршрутный план и результат",
  decisionTemplates: "Шаблоны решений", templatesDesc: "Выберите шаблон жизненного решения для синтеза результатов агентов.",
  generatedFor: "Создано для", awaitingSignal: "Ожидание жизненного сигнала", awaitingDesc: "Настройте профиль, загрузите жизненный сигнал, затем нажмите Создать план.",
  runningPipeline: "Сеть агентов обрабатывает...", generateFirst: "Перейдите к Создать план для запуска конвейера.",
  notebookSummary: "Диалог подкаста NotebookLM", loadingDialogue: "Создание диалогового сценария...",
  dashboardTitle: "Системная панель", cognitiveClarity: "Индекс когнитивной ясности", dailyEnergy: "Ежедневный энергетический балл",
  financialLeaks: "Проверенные финансовые утечки", routineFriction: "Рутинная логистическая фрикция",
  activeKnowledgeGraph: "Активный граф знаний", tacticalNodes: "Тактические сущности (узлы)", monitoredEdges: "Отслеживаемые связи (рёбра)",
  graphRAGLatency: "Задержка GraphRAG", recentDecisionLog: "Последние решения",
  confusingYou: "Что вас сейчас смущает?", selectTemplate: "Выберите шаблон для запуска симуляции планирования:",
  tpl1: "У меня дневная усталость. Оптимизируйте мою глубокую работу.", tpl2: "Проверить трение ежемесячных подписок.", tpl3: "Проверить домашнюю логистику и запланировать обслуживание фильтров.",
};
