import type { Strings } from "./strings";
import { en } from "./en";

export const id: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "OS Keputusan Hidup",
  uploadSignal: "Unggah Sinyal Kehidupan", uploadHelp: "Kirim catatan suara, faktur, atau daftar tugas",
  ingestSignalHeader: "Ambil dan proses sinyal kehidupan", ingestionLogs: "Log pemrosesan",
  ingestSummary: "Sinyal kehidupan diproses", extractedNodes: "Node yang diekstrak:", extractedEdges: "Tepi yang diekstrak:", extractedEvents: "Peristiwa yang diekstrak:",
  tomorrowPlan: "Perjalanan Energi dan Fokus Harian", frictionBudget: "Perjalanan Anggaran Keuangan dan Perhatian", logisticsRadar: "Radar Lingkungan dan Rutinitas",
  generatePlan: "Buat Rencana", activeSubscriptions: "Langganan aktif", hourlySchedule: "Jadwal per jam",
  frictionActions: "Tindakan pengurangan gesekan", lifeDiffs: "Perbedaan kehidupan", lintWarnings: "Pemeriksaan rencana", profileLabel: "Pilih Profil",
  profiles: { student: "Anak / Siswa", adult: "Profesional Bekerja", senior: "Lansia / Pensiunan" },
  nav: { dashboard: "Dasbor", features: "Kemampuan", about: "Arsitektur", faq: "FAQ", help: "Panduan Pengguna", settings: "Pengaturan" },
  workspace: "Ruang Kerja", activeProfile: "Profil Aktif", decisionOS: "OS Keputusan:", meshState: "Status Jaringan:", online: "Online",
  agentMeshPipeline: "Pipeline Jaringan Agen", systemDashboard: "Dasbor Sistem", journeyPlanOutcome: "Rencana Perjalanan dan Hasil",
  decisionTemplates: "Templat Keputusan", templatesDesc: "Pilih templat keputusan hidup untuk mensintesis hasil agen.",
  generatedFor: "Dibuat untuk", awaitingSignal: "Menunggu sinyal kehidupan", awaitingDesc: "Konfigurasikan profil Anda, unggah sinyal kehidupan, lalu klik Buat Rencana.",
  runningPipeline: "Jaringan agen memproses...", generateFirst: "Pergi ke Buat Rencana untuk memulai pipeline.",
  notebookSummary: "Dialog Podcast NotebookLM", loadingDialogue: "Membuat skrip dialog...",
  dashboardTitle: "Dasbor Sistem", cognitiveClarity: "Indeks Kejernihan Kognitif", dailyEnergy: "Skor Energi Harian",
  financialLeaks: "Kebocoran Keuangan yang Diaudit", routineFriction: "Gesekan Logistik Rutin",
  activeKnowledgeGraph: "Graf Pengetahuan Aktif", tacticalNodes: "Entitas Taktis (Node)", monitoredEdges: "Hubungan Dipantau (Tepi)",
  graphRAGLatency: "Latensi GraphRAG", recentDecisionLog: "Log Keputusan Terbaru",
  confusingYou: "Apa yang membingungkan Anda sekarang?", selectTemplate: "Pilih templat keputusan hidup untuk menjalankan simulasi perencanaan:",
  tpl1: "Saya mengalami kelelahan kerja di sore hari. Optimalkan pekerjaan mendalam saya.", tpl2: "Memeriksa friksi langganan bulanan.", tpl3: "Periksa logistik rumah dan jadwalkan perbaikan filter.",
};
