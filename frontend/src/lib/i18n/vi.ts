import type { Strings } from "./strings";
import { en } from "./en";

export const vi: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "He thong Quyet dinh Cuoc song",
  uploadSignal: "Tai len tin hieu cuoc song", uploadHelp: "Gui ghi chu giong noi, hoa don hoac danh sach nhiem vu",
  ingestSignalHeader: "Thu nap va xu ly tin hieu cuoc song", ingestionLogs: "Nhat ky xu ly thu nap",
  ingestSummary: "Tin hieu cuoc song da xu ly", extractedNodes: "Cac nut da trich xuat:", extractedEdges: "Cac canh da trich xuat:", extractedEvents: "Cac su kien da trich xuat:",
  tomorrowPlan: "Hanh trinh Nang luong va Tap trung Hang ngay", frictionBudget: "Hanh trinh Ngan sach Tai chinh va Chu y", logisticsRadar: "Radar Moi truong va Thoi quen",
  generatePlan: "Tao Ke hoach", activeSubscriptions: "Dang ky dang hoat dong", hourlySchedule: "Lich theo gio",
  frictionActions: "Hanh dong giam ma sat", lifeDiffs: "Su khac biet cuoc song", lintWarnings: "Kiem tra ke hoach", profileLabel: "Chon Ho so",
  profiles: { student: "Tre em / Hoc sinh", adult: "Chuyen gia Lam viec", senior: "Nguoi cao tuoi / Nghi huu" },
  nav: { dashboard: "Bang dieu khien", features: "Kha nang", about: "Kien truc", faq: "FAQ", help: "Huong dan Su dung", settings: "Cai dat" },
  workspace: "Khong gian Lam viec", activeProfile: "Ho so Dang hoat dong", decisionOS: "OS Quyet dinh:", meshState: "Trang thai Mang:", online: "Truc tuyen",
  agentMeshPipeline: "Duong ong Mang Tac nhan", systemDashboard: "Bang dieu khien He thong", journeyPlanOutcome: "Ke hoach Hanh trinh va Ket qua",
  decisionTemplates: "Mau Quyet dinh", templatesDesc: "Chon mau quyet dinh cuoc song de tong hop ket qua tac nhan.",
  generatedFor: "Duoc tao cho", awaitingSignal: "Dang cho tin hieu cuoc song", awaitingDesc: "Cau hinh ho so, tai len tin hieu cuoc song, sau do nhan Tao Ke hoach.",
  runningPipeline: "Mang tac nhan dang xu ly...", generateFirst: "Den Tao Ke hoach de khoi dong duong ong.",
  notebookSummary: "Hoi thoai Podcast NotebookLM", loadingDialogue: "Dang tao kich ban hoi thoai...",
  dashboardTitle: "Bang dieu khien He thong", cognitiveClarity: "Chi so Ro rang Nhan thuc", dailyEnergy: "Diem Nang luong Hang ngay",
  financialLeaks: "Ro ri Tai chinh da Kiem toan", routineFriction: "Ma sat Hau can Thuong ngay",
  activeKnowledgeGraph: "Do thi Kien thuc Dang hoat dong", tacticalNodes: "Thuc the Chien luoc (Nut)", monitoredEdges: "Quan he Giam sat (Canh)",
  graphRAGLatency: "Do tre GraphRAG", recentDecisionLog: "Nhat ky Quyet dinh Gan day",
  confusingYou: "Dieu gi dang lam ban boi roi luc nay?", selectTemplate: "Chon mau quyet dinh cuoc song de chay mo phong lap ke hoach:",
  tpl1: "Toi bi met moi cong viec vao buoi chieu. Toi uu hoa cong viec chuyen sau cua toi.", tpl2: "Kiem tra ma sat dang ky hang thang.", tpl3: "Kiem tra hau can gia dinh va len lich sua chua bo loc.",
};
