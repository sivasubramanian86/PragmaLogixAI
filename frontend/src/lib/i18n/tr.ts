import type { Strings } from "./strings";
import { en } from "./en";

export const tr: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "Yasam Karar OS",
  uploadSignal: "Yasam Sinyali Yukle", uploadHelp: "Sesli not, fatura veya gorev listesi gonderin",
  ingestSignalHeader: "Yasam sinyalini al ve isle", ingestionLogs: "Isleme gunlukleri",
  ingestSummary: "Yasam sinyali islendi", extractedNodes: "Cikartilan dugumler:", extractedEdges: "Cikartilan kenarlar:", extractedEvents: "Cikartilan olaylar:",
  tomorrowPlan: "Gunluk Enerji ve Odak Yolculugu", frictionBudget: "Mali ve Dikkat Butcesi Yolculugu", logisticsRadar: "Cevre ve Rutin Radar",
  generatePlan: "Plan Olustur", activeSubscriptions: "Aktif abonelikler", hourlySchedule: "Saatlik takvim",
  frictionActions: "Surtusmey azaltma eylemleri", lifeDiffs: "Yasam farkliliklari", lintWarnings: "Plan kontrolleri", profileLabel: "Profil Secin",
  profiles: { student: "Cocuk / Ogrenci", adult: "Calisan Profesyonel", senior: "Yasli / Emekli" },
  nav: { dashboard: "Gosterge Paneli", features: "Yetenekler", about: "Mimari", faq: "SSS", help: "Kullanici Kilavuzu", settings: "Ayarlar" },
  workspace: "Calisma Alani", activeProfile: "Aktif Profil", decisionOS: "Karar OS:", meshState: "Ag Durumu:", online: "Cevrimici",
  agentMeshPipeline: "Ajan Ag Hatti", systemDashboard: "Sistem Gosterge Paneli", journeyPlanOutcome: "Yolculuk Plani ve Sonucu",
  decisionTemplates: "Karar Sablonlari", templatesDesc: "Ajan sonuclarini sentezlemek icin bir yasam karar sablonu secin.",
  generatedFor: "Olusturuldu:", awaitingSignal: "Yasam Sinyali Bekleniyor", awaitingDesc: "Profilinizi yapilandirin, bir yasam sinyali yukleyin ve Plan Olustur a tiklayin.",
  runningPipeline: "Ajan agi isliyor...", generateFirst: "Is hattini baslatmak icin Plan Olustur a gidin.",
  notebookSummary: "NotebookLM Podcast Diyalogu", loadingDialogue: "Diyalog betigi olusturuluyor...",
  dashboardTitle: "Sistem Gosterge Paneli", cognitiveClarity: "Bilissel Netlik Endeksi", dailyEnergy: "Gunluk Enerji Puani",
  financialLeaks: "Denetlenmis Mali Sizintilar", routineFriction: "Rutin Lojistik Surtusmesi",
  activeKnowledgeGraph: "Aktif Bilgi Grafigi", tacticalNodes: "Taktik Varliklar (Dugumler)", monitoredEdges: "Izlenen Iliskiler (Kenarlar)",
  graphRAGLatency: "GraphRAG Gecikmesi", recentDecisionLog: "Son Karar Gunlugu",
  confusingYou: "Su an sizi ne karistiriyor?", selectTemplate: "Planlama simulasyonu calistirmak icin bir sablon secin:",
  tpl1: "Ogleden sonra is yorgunlugum var. Derin calismami optimize edin.", tpl2: "Aylik abonelik surtusmesini denetleyin.", tpl3: "Ev lojistigini kontrol edin ve filtre bakim larini planlayin.",
};
