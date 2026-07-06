import type { Strings } from "./strings";
import { en } from "./en";

export const zh: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "人生决策OS",
  uploadSignal: "上传生活信号", uploadHelp: "提交语音备忘录、发票或日常清单",
  ingestSignalHeader: "摄取并处理生活信号", ingestionLogs: "摄取处理日志",
  ingestSummary: "生活信号已处理", extractedNodes: "提取的节点:", extractedEdges: "提取的边:", extractedEvents: "提取的事件:",
  tomorrowPlan: "日常能量与专注之旅", frictionBudget: "财务与注意力预算之旅", logisticsRadar: "环境与日常雷达",
  generatePlan: "生成计划", activeSubscriptions: "活跃订阅", hourlySchedule: "小时计划",
  frictionActions: "摩擦减少行动", lifeDiffs: "生活差异", lintWarnings: "计划检查", profileLabel: "选择档案类型",
  profiles: { student: "孩子 / 学生", adult: "职场专业人士", senior: "老年人 / 退休人员" },
  nav: { dashboard: "仪表板", features: "功能", about: "架构", faq: "常见问题", help: "用户指南", settings: "设置" },
  workspace: "工作区", activeProfile: "活跃档案", decisionOS: "决策OS:", meshState: "网络状态:", online: "在线",
  agentMeshPipeline: "智能代理管道", systemDashboard: "系统仪表板", journeyPlanOutcome: "旅程计划与结果",
  decisionTemplates: "决策模板", templatesDesc: "选择以下生活决策模板来综合代理结果。",
  generatedFor: "为以下对象生成", awaitingSignal: "等待生活信号", awaitingDesc: "配置您的档案，上传生活信号，然后点击生成计划。",
  runningPipeline: "智能代理网格处理中...", generateFirst: "前往生成计划以启动流水线。",
  notebookSummary: "NotebookLM播客对话", loadingDialogue: "正在生成对话脚本...",
  dashboardTitle: "系统仪表板", cognitiveClarity: "认知清晰度指数", dailyEnergy: "日常能量得分",
  financialLeaks: "审计的财务漏洞", routineFriction: "日常物流摩擦",
  activeKnowledgeGraph: "活跃知识图谱", tacticalNodes: "战术实体（节点）", monitoredEdges: "监控关系（边）",
  graphRAGLatency: "GraphRAG延迟", recentDecisionLog: "最近决策日志",
  confusingYou: "现在什么让您感到困惑？", selectTemplate: "选择一个生活决策模板来运行规划模拟：",
  tpl1: "我下午有工作疲劳。优化我的深度工作。", tpl2: "审计每月订阅摩擦并检查屏幕时间泄漏。", tpl3: "检查家庭物流并安排定期家用过滤器维修。",
};
