import type { Strings } from "./strings";
import { en } from "./en";

export const ar: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "نظام اتخاذ القرارات الحياتية",
  uploadSignal: "تحميل إشارة الحياة", uploadHelp: "أرسل مذكرة صوتية أو فاتورة أو قائمة مهام",
  ingestSignalHeader: "استيعاب ومعالجة إشارة الحياة", ingestionLogs: "سجلات المعالجة",
  ingestSummary: "تمت معالجة إشارة الحياة", extractedNodes: "العقد المستخرجة:", extractedEdges: "الحواف المستخرجة:", extractedEvents: "الأحداث المستخرجة:",
  tomorrowPlan: "مخطط الطاقة والتركيز اليومي", frictionBudget: "ميزانية الانتباه والمال", logisticsRadar: "رادار المنزل والروتين",
  generatePlan: "إنشاء الخطة", activeSubscriptions: "الاشتراكات النشطة", hourlySchedule: "الجدول الزمني بالساعة",
  frictionActions: "إجراءات تقليل الاحتكاك", lifeDiffs: "فروق الحياة", lintWarnings: "فحوصات الخطة", profileLabel: "اختر نوع الملف الشخصي",
  profiles: { student: "طفل / طالب", adult: "مهني نشط", senior: "كبار السن / متقاعد" },
  nav: { dashboard: "لوحة التحكم", features: "القدرات", about: "البنية", faq: "الأسئلة الشائعة", help: "دليل المستخدم", settings: "الإعدادات" },
  workspace: "مساحة العمل", activeProfile: "الملف الشخصي النشط", decisionOS: "نظام القرارات:", meshState: "حالة الشبكة:", online: "متصل",
  agentMeshPipeline: "خط أنابيب شبكة الوكلاء", systemDashboard: "لوحة تحكم النظام", journeyPlanOutcome: "خطة الرحلة والنتيجة",
  decisionTemplates: "قوالب القرارات", templatesDesc: "اختر قالب قرار حياتي أدناه لتوليف نتائج الوكيل.",
  generatedFor: "تم الإنشاء لـ", awaitingSignal: "في انتظار إشارة الحياة", awaitingDesc: "قم بتكوين ملفك الشخصي وتحميل إشارة الحياة ثم انقر على إنشاء الخطة.",
  runningPipeline: "شبكة الوكلاء تعالج...", generateFirst: "انتقل إلى إنشاء الخطة لبدء المسار.",
  notebookSummary: "حوار بودكاست NotebookLM", loadingDialogue: "جارٍ إنشاء نص الحوار...",
  dashboardTitle: "لوحة تحكم النظام", cognitiveClarity: "مؤشر الوضوح المعرفي", dailyEnergy: "درجة الطاقة اليومية",
  financialLeaks: "التسريبات المالية المدققة", routineFriction: "احتكاك لوجستيات الروتين",
  activeKnowledgeGraph: "رسم بياني للمعرفة النشط", tacticalNodes: "الكيانات التكتيكية (العقد)", monitoredEdges: "العلاقات المراقبة (الحواف)",
  graphRAGLatency: "زمن الاستجابة GraphRAG", recentDecisionLog: "سجل القرارات الأخيرة",
  confusingYou: "ما الذي يربكك الآن؟", selectTemplate: "اختر قالب قرار حياتي لتشغيل محاكاة التخطيط:",
  tpl1: "أعاني من إرهاق عمل في فترة ما بعد الظهر. حسّن عملي العميق.", tpl2: "مراجعة احتكاكات الاشتراكات الشهرية.", tpl3: "فحص لوجستيات المنزل وجدولة إصلاح الفلاتر.",
};
