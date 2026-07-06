import type { Strings } from "./strings";
import { en } from "./en";

export const th: Strings = {
  ...en,
  title: "PragmaLogixAI", subtitle: "ระบบตัดสินใจชีวิต",
  uploadSignal: "อัปโหลดสัญญาณชีวิต", uploadHelp: "ส่งบันทึกเสียง ใบแจ้งหนี้ หรือรายการตรวจสอบ",
  ingestSignalHeader: "นำเข้าและประมวลผลสัญญาณชีวิต", ingestionLogs: "บันทึกการประมวลผล",
  ingestSummary: "ประมวลผลสัญญาณชีวิตแล้ว", extractedNodes: "โหนดที่ดึงออก:", extractedEdges: "ขอบที่ดึงออก:", extractedEvents: "เหตุการณ์ที่ดึงออก:",
  tomorrowPlan: "การเดินทางพลังงานและโฟกัสประจำวัน", frictionBudget: "การเดินทางงบประมาณการเงินและความสนใจ", logisticsRadar: "เรดาร์สภาพแวดล้อมและกิจวัตร",
  generatePlan: "สร้างแผน", activeSubscriptions: "การสมัครที่ใช้งานอยู่", hourlySchedule: "กำหนดการรายชั่วโมง",
  frictionActions: "การดำเนินการลดแรงเสียดทาน", lifeDiffs: "ความแตกต่างในชีวิต", lintWarnings: "การตรวจสอบแผน", profileLabel: "เลือกโปรไฟล์",
  profiles: { student: "เด็ก / นักเรียน", adult: "มืออาชีพที่ทำงาน", senior: "ผู้สูงอายุ / เกษียณอายุ" },
  nav: { dashboard: "แดชบอร์ด", features: "ความสามารถ", about: "สถาปัตยกรรม", faq: "คำถามที่พบบ่อย", help: "คู่มือผู้ใช้", settings: "การตั้งค่า" },
  workspace: "พื้นที่ทำงาน", activeProfile: "โปรไฟล์ที่ใช้งานอยู่", decisionOS: "ระบบตัดสินใจ:", meshState: "สถานะเครือข่าย:", online: "ออนไลน์",
  agentMeshPipeline: "ท่อส่งตัวแทน", systemDashboard: "แดชบอร์ดระบบ", journeyPlanOutcome: "แผนการเดินทางและผลลัพธ์",
  decisionTemplates: "เทมเพลตการตัดสินใจ", templatesDesc: "เลือกเทมเพลตการตัดสินใจชีวิตเพื่อสังเคราะห์ผลลัพธ์ตัวแทน",
  generatedFor: "สร้างสำหรับ", awaitingSignal: "รอสัญญาณชีวิต", awaitingDesc: "ตั้งค่าโปรไฟล์ อัปโหลดสัญญาณชีวิต จากนั้นคลิกสร้างแผน",
  runningPipeline: "เครือข่ายตัวแทนกำลังประมวลผล...", generateFirst: "ไปที่สร้างแผนเพื่อเริ่มต้นท่อส่ง",
  notebookSummary: "บทสนทนาพอดแคสต์ NotebookLM", loadingDialogue: "กำลังสร้างสคริปต์บทสนทนา...",
  dashboardTitle: "แดชบอร์ดระบบ", cognitiveClarity: "ดัชนีความชัดเจนทางปัญญา", dailyEnergy: "คะแนนพลังงานประจำวัน",
  financialLeaks: "การรั่วไหลทางการเงินที่ตรวจสอบแล้ว", routineFriction: "แรงเสียดทานโลจิสติกส์ตามปกติ",
  activeKnowledgeGraph: "กราฟความรู้ที่ใช้งานอยู่", tacticalNodes: "หน่วยงานทางยุทธวิธี (โหนด)", monitoredEdges: "ความสัมพันธ์ที่ตรวจสอบ (ขอบ)",
  graphRAGLatency: "ความหน่วง GraphRAG", recentDecisionLog: "บันทึกการตัดสินใจล่าสุด",
  confusingYou: "ตอนนี้อะไรทำให้คุณสับสน?", selectTemplate: "เลือกเทมเพลตการตัดสินใจชีวิตเพื่อเรียกใช้การจำลองการวางแผน:",
  tpl1: "ฉันมีความเหนื่อยล้าจากการทำงานในตอนบ่าย ปรับปรุงงานเชิงลึกของฉัน", tpl2: "ตรวจสอบการเสียดสีการสมัครสมาชิกรายเดือน", tpl3: "ตรวจสอบโลจิสติกส์บ้านและกำหนดการซ่อมแซมตัวกรอง",
};
