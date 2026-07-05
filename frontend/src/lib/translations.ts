/**
 * i18n translation strings for PragmaLogixAI.
 * Supports 22 global and regional languages.
 */

import type { Language, AgeGroup } from './types';

export interface Strings {
  title:               string;
  subtitle:            string;
  uploadSignal:        string;
  uploadHelp:          string;
  tomorrowPlan:        string;
  frictionBudget:      string;
  logisticsRadar:      string;
  generatePlan:        string;
  activeSubscriptions: string;
  hourlySchedule:      string;
  frictionActions:     string;
  lifeDiffs:           string;
  lintWarnings:        string;
  profileLabel:        string;
  ingestSummary:       string;
  profiles:            Record<AgeGroup, string>;
  languages:           Record<Language, string>;
  nav: {
    dashboard: string;
    features: string;
    about: string;
    faq: string;
    help: string;
    settings: string;
  };
}

// Complete list of native names for dropdown selection
const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español (Spanish)",
  fr: "Français (French)",
  de: "Deutsch (German)",
  it: "Italiano (Italian)",
  ja: "日本語 (Japanese)",
  zh: "简体中文 (Chinese)",
  pt: "Português (Portuguese)",
  ru: "Русский (Russian)",
  ko: "한국어 (Korean)",
  hi: "हिंदी (Hindi)",
  ta: "தமிழ் (Tamil)",
  kn: "ಕನ್ನಡ (Kannada)",
  te: "తెలుగు (Telugu)",
  ar: "العربية (Arabic)",
  tr: "Türkçe (Turkish)",
  nl: "Nederlands (Dutch)",
  sv: "Svenska (Swedish)",
  pl: "Polski (Polish)",
  vi: "Tiếng Việt (Vietnamese)",
  th: "ภาษาไทย (Thai)",
  id: "Bahasa Indonesia (Indonesian)"
};

// Base English translations to use as fallback/template
const baseEn: Strings = {
  title: "PragmaLogixAI",
  subtitle: "Life Decision OS",
  uploadSignal: "Upload Life Signal",
  uploadHelp: "Submit voice note, invoice, or daily checklist (audio/image/video)",
  tomorrowPlan: "Daily Energy & Focus Journey",
  frictionBudget: "Financial & Attention Budget Journey",
  logisticsRadar: "Environment & Routine Radar",
  generatePlan: "Generate Plan",
  activeSubscriptions: "Active Subscriptions",
  hourlySchedule: "Hourly Schedule",
  frictionActions: "Friction Reduction Actions",
  lifeDiffs: "Life Diffs (Incremental changes)",
  lintWarnings: "Plan Consistency Checks (Linter)",
  profileLabel: "Select Profile Role",
  ingestSummary: "Life Signal Processed",
  profiles: { student: "Kid / Student", adult: "Working Professional", senior: "Elderly / Retired" },
  languages: languageNames,
  nav: {
    dashboard: "Dashboard",
    features: "Capabilities",
    about: "Architecture",
    faq: "FAQ",
    help: "User Guide",
    settings: "Settings",
  },
};

const translations: Record<Language, Strings> = {
  en: baseEn,
  es: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "OS de Decisiones de Vida",
    uploadSignal: "Subir Señal de Vida",
    uploadHelp: "Sube notas de voz, facturas o listas de tareas",
    tomorrowPlan: "Plan Diario de Energía y Enfoque",
    frictionBudget: "Presupuesto de Atención y Finanzas",
    logisticsRadar: "Radar de Rutinas y Hogar",
    generatePlan: "Generar Plan",
    profileLabel: "Seleccionar Rol de Perfil",
    ingestSummary: "Señal de Vida Procesada",
    profiles: { student: "Niño / Estudiante", adult: "Profesional Activo", senior: "Adulto Mayor / Retirado" }
  },
  fr: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "OS de Décision de Vie",
    uploadSignal: "Télécharger un Signal de Vie",
    uploadHelp: "Soumettre une note vocale, une facture ou une checklist",
    tomorrowPlan: "Plan Quotidien Énergie & Concentration",
    frictionBudget: "Budget Attention & Finances",
    logisticsRadar: "Radar Routine & Logistique",
    generatePlan: "Générer le Plan",
    profileLabel: "Sélectionner le Profil",
    ingestSummary: "Signal de Vie Traité",
    profiles: { student: "Enfant / Étudiant", adult: "Actif Professionnel", senior: "Senior / Retraité" }
  },
  de: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "Lebensentscheidungs-Betriebssystem",
    uploadSignal: "Lebenssignal hochladen",
    uploadHelp: "Sprachnotizen, Rechnungen oder Checklisten hochladen",
    tomorrowPlan: "Täglicher Energie- & Fokusplan",
    frictionBudget: "Finanz- & Aufmerksamkeitsbudget",
    logisticsRadar: "Haushalts- & Routine-Radar",
    generatePlan: "Plan generieren",
    profileLabel: "Profilrolle auswählen",
    ingestSummary: "Lebenssignal verarbeitet",
    profiles: { student: "Kind / Student", adult: "Berufstätig", senior: "Senioren / Im Ruhestand" }
  },
  it: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "OS per le Decisioni di Vita",
    uploadSignal: "Carica Segnale di Vita",
    uploadHelp: "Carica note vocali, ricevute o liste di controllo",
    tomorrowPlan: "Piano Giornaliero Energia & Focus",
    frictionBudget: "Budget Finanziario e Attenzione",
    logisticsRadar: "Radar Casa e Routine",
    generatePlan: "Genera Piano",
    profileLabel: "Seleziona Profilo",
    ingestSummary: "Segnale di Vita Elaborato",
    profiles: { student: "Bambino / Studente", adult: "Professionista", senior: "Anziano / Pensionato" }
  },
  ja: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "ライフ意思決定システム OS",
    uploadSignal: "ライフシグナルをアップロード",
    uploadHelp: "音声メモ、レシート、チェックリストの送信",
    tomorrowPlan: "エネルギー＆集中力デイリープラン",
    frictionBudget: "財務＆注意力の予算管理",
    logisticsRadar: "日常ルーティン＆環境レーダー",
    generatePlan: "プランを作成",
    profileLabel: "プロファイルを選択",
    ingestSummary: "シグナルの解析完了",
    profiles: { student: "子供 / 学生", adult: "社会人 / 専門職", senior: "シニア / 退職者" }
  },
  zh: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "生活决策智能操作系统",
    uploadSignal: "上传生活数据信号",
    uploadHelp: "支持语音便签、发票、日常清单的识别",
    tomorrowPlan: "每日能量与专注力规划",
    frictionBudget: "财务漏损与注意力审计",
    logisticsRadar: "家庭日常与物流管理雷达",
    generatePlan: "生成决策规划",
    profileLabel: "选择身份角色",
    ingestSummary: "数据信号解析成功",
    profiles: { student: "儿童 / 学生", adult: "在职专业人士", senior: "老年人 / 退休人员" }
  },
  pt: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "OS de Decisões de Vida",
    uploadSignal: "Enviar Sinal de Vida",
    uploadHelp: "Enviar notas de voz, faturas ou checklists",
    tomorrowPlan: "Plano Diário de Energia & Foco",
    frictionBudget: "Orçamento Financeiro e de Atenção",
    logisticsRadar: "Radar de Rotinas e Doméstico",
    generatePlan: "Gerar Plano",
    profileLabel: "Selecionar Perfil",
    ingestSummary: "Sinal de Vida Processado",
    profiles: { student: "Criança / Estudante", adult: "Profissional Ativo", senior: "Idoso / Aposentado" }
  },
  ru: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "ОС для принятия жизненных решений",
    uploadSignal: "Загрузить сигнал жизнедеятельности",
    uploadHelp: "Загрузить голосовую заметку, счет или список задач",
    tomorrowPlan: "Дневной план энергии и фокуса",
    frictionBudget: "Бюджет внимания и финансов",
    logisticsRadar: "Радар быта и рутины",
    generatePlan: "Создать план",
    profileLabel: "Выбрать роль профиля",
    ingestSummary: "Сигнал успешно обработан",
    profiles: { student: "Ребенок / Студент", adult: "Работающий специалист", senior: "Пожилой / На пенсии" }
  },
  ko: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "인생 의사 결정 OS",
    uploadSignal: "인생 신호 업로드",
    uploadHelp: "음성 메모, 영수증, 할 일 목록 업로드",
    tomorrowPlan: "에너지 & 집중력 일일 계획",
    frictionBudget: "재정 & 집중도 관리 계획",
    logisticsRadar: "가정 루틴 & 주변 레이더",
    generatePlan: "계획 생성",
    profileLabel: "프로필 역할 선택",
    ingestSummary: "인생 신호 처리 완료",
    profiles: { student: "학생", adult: "직장인", senior: "고령자 / 은퇴자" }
  },
  hi: {
    ...baseEn,
    title: "प्राग्मालोगिक्स एआई",
    subtitle: "जीवन निर्णय ओएस",
    uploadSignal: "जीवन संकेत अपलोड करें",
    uploadHelp: "आवाज संदेश, इनवॉइस, या दैनिक कार्य सूची सबमिट करें",
    tomorrowPlan: "दैनिक ऊर्जा और फोकस यात्रा",
    frictionBudget: "वित्तीय और ध्यान बजट यात्रा",
    logisticsRadar: "पर्यावरण और नियमित रडार",
    generatePlan: "योजना बनाएं",
    profileLabel: "प्रोफ़ाइल भूमिका चुनें",
    ingestSummary: "जीवन संकेत संसाधित",
    hourlySchedule: "घंटेवार शेड्यूल",
    frictionActions: "घर्षण कम करने के कार्य",
    lifeDiffs: "जीवन परिवर्तन (वृद्धिशील बदलाव)",
    lintWarnings: "योजना की जाँच (लिंटर)",
    activeSubscriptions: "सक्रिय सदस्यताएं",
    profiles: { student: "बच्चे / छात्र", adult: "काम करने वाले पेशेवर", senior: "बुजुर्ग / सेवानिवृत्त" },
    nav: {
      dashboard: "डैशबोर्ड",
      features: "क्षमताएं",
      about: "आर्किटेक्चर",
      faq: "सामान्य प्रश्न",
      help: "उपयोगकर्ता गाइड",
      settings: "सेटिंग्स",
    },
  },
  ta: {
    ...baseEn,
    title: "பிராக்மாலோஜிக்ஸ் ஏஐ",
    subtitle: "வாழ்க்கை முடிவு ஓஎஸ்",
    uploadSignal: "வாழ்க்கை சமிக்ஞையை பதிவேற்று",
    uploadHelp: "குரல் பதிவு, விலைப்பட்டியல் அல்லது தினசரி சரிபார்ப்புப் பட்டியலைச் சமர்ப்பிக்கவும்",
    tomorrowPlan: "தினசரி ஆற்றல் & கவனம் பயணம்",
    frictionBudget: "நிதி & கவன வரவுசெலவுத் திட்டம்",
    logisticsRadar: "சுற்றுச்சூழல் & வழக்கமான ரேடார்",
    generatePlan: "திட்டத்தை உருவாக்கு",
    profileLabel: "சுயவிவரப் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்",
    ingestSummary: "வாழ்க்கை சமிக்ஞை செயலாக்கப்பட்டது",
    hourlySchedule: "மணிநேர அட்டவணை",
    frictionActions: "தடை குறைப்பு நடவடிக்கைகள்",
    lifeDiffs: "வாழ்க்கை மாற்றங்கள்",
    lintWarnings: "திட்ட சரிபார்ப்பு",
    activeSubscriptions: "செயலில் உள்ள சந்தாக்கள்",
    profiles: { student: "குழந்தை / மாணவர்", adult: "வேலை செய்யும் தொழில்முறை", senior: "முதியவர் / ஓய்வு பெற்றவர்" },
    nav: {
      dashboard: "டாஷ்போர்டு",
      features: "திறன்கள்",
      about: "கட்டமைப்பு",
      faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      help: "பயனர் வழிகாட்டி",
      settings: "அமைப்புகள்",
    },
  },
  kn: {
    ...baseEn,
    title: "ಪ್ರಾಗ್ಮಾಲಾಜಿಕ್ಸ್ ಎಐ",
    subtitle: "ಜೀವನ ನಿರ್ಧಾರ ಓಎಸ್",
    uploadSignal: "ಜೀವನ ಸಂಕೇतವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    uploadHelp: "ಧ್ವನಿ ಟಿಪ್ಪಣಿ, ರಸೀದಿ ಅಥವಾ ದಿನಚರಿ ಪಟ್ಟಿಯನ್ನು ಸಲ್ಲಿಸಿ",
    tomorrowPlan: "ದೈನಂದิน ಶಕ್ತಿ ಮತ್ತು ಗಮನದ ಪ್ರಯಾಣ",
    frictionBudget: "ಹಣಕาสು ಮತ್ತು ಗಮನ ಬಜೆಟ್ ಪ್ರಯಾಣ",
    logisticsRadar: "ಪರಿಸರ ಮತ್ತು ವಾಡಿಕೆಯ ರೇಡಾರ್",
    generatePlan: "ಯೋಜನೆ ರೂಪಿಸಿ",
    profileLabel: "ಪ್ರೊಫೈಲ್ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    ingestSummary: "ಜೀವನ ಸಂಕೇತ ಸಂಸ್ಕರಿಸಲಾಗಿದೆ",
    hourlySchedule: "ಗಂಟೆಯ ವೇಳಾಪಟ್ಟಿ",
    frictionActions: "ಘರ್ಷಣೆ ಕಡಿಮೆ ಮಾಡುವ ಕ್ರಮಗಳು",
    lifeDiffs: "ಜೀವನ ಬದಲಾವಣೆಗಳು",
    lintWarnings: "ಯೋಜನೆ ಪರಿಶೀಲನೆ",
    activeSubscriptions: "ಸಕ್ರಿಯ ಚಂದಾದಾರಿಕೆಗಳು",
    profiles: { student: "ಮಕ್ಕಳು / ವಿದ್ಯಾರ್ಥಿ", adult: "ಉದ್ಯೋಗಿ ವೃತ್ತಿಪರ", senior: "ಹಿರಿಯರು / ನಿವೃತ್ತರು" },
    nav: {
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      features: "ಸಾಮರ್ಥ್ಯಗಳು",
      about: "ಆರ್ಕಿಟೆಕ್ಚರ್",
      faq: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
      help: "ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ",
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    },
  },
  te: {
    ...baseEn,
    title: "ప్రాగ్మా లాజిక్స్ AI",
    subtitle: "జీవిత నిర్ణయాల సహాయక OS",
    uploadSignal: "జీవిత డేటా సిగ్నల్ అప్‌లోడ్ చేయి",
    uploadHelp: "వాయిస్ నోట్, రసీదు లేదా దినచర్య జాబితాను సమర్పించండి",
    tomorrowPlan: "రోజువారీ ఎనర్జీ & ఫోకస్ జర్నీ",
    frictionBudget: "ఆర్థిక & అటెన్షన్ బడ్జెట్ జర్నీ",
    logisticsRadar: "ఇంటి పనులు & రొటీన్ రాడార్",
    generatePlan: "ప్లాన్ సృష్టించు",
    profileLabel: "ప్రొఫైల్ పాత్రను ఎంచుకోండి",
    ingestSummary: "సిగ్నల్ విజయవంతంగా విశ్లేషించబడింది",
    hourlySchedule: "గంటల వారీ షెడ్యూల్",
    frictionActions: "అవరోధం తగ్గించే చర్యలు",
    lifeDiffs: "జీవిత మార్పులు",
    lintWarnings: "ప్లాన్ తనిఖీ",
    activeSubscriptions: "క్రియాశీల సభ్యత్వాలు",
    profiles: { student: "పిల్లవాడు / విద్యార్థి", adult: "ఉద్యోగి / నిపుణుడు", senior: "పెద్దలు / విశ్రాంత ఉద్యోగి" },
    nav: {
      dashboard: "డాష్‌బోర్డ్",
      features: "సామర్థ్యాలు",
      about: "నిర్మాణం",
      faq: "తరచుగా అడిగే ప్రశ్నలు",
      help: "వినియోగదారు గైడ్",
      settings: "సెట్టింగులు",
    },
  },
  ar: {
    ...baseEn,
    title: "براغمالوجيكس",
    subtitle: "نظام اتخاذ القرارات الحياتية",
    uploadSignal: "تحميل إشارة الحياة",
    uploadHelp: "أرسل مذكرة صوتية أو فاتورة أو قائمة مهام",
    tomorrowPlan: "مخطط الطاقة والتركيز اليومي",
    frictionBudget: "ميزانية الانتباه والمال",
    logisticsRadar: "رادار المنزل والروتين",
    generatePlan: "إنشاء الخطة",
    profileLabel: "اختر نوع الملف الشخصي",
    ingestSummary: "تم معالجة الإشارة بنجاح",
    profiles: { student: "طفل / طالب", adult: "مهني نشط", senior: "كبار السن / متقاعد" }
  },
  tr: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "Yaşam Karar İşletim Sistemi",
    uploadSignal: "Yaşam Sinyali Yükle",
    uploadHelp: "Ses kaydı, fatura veya görev listesi gönderin",
    tomorrowPlan: "Günlük Enerji ve Odak Planı",
    frictionBudget: "Finansal ve Dikkat Bütçesi",
    logisticsRadar: "Ev ve Rutin Radarı",
    generatePlan: "Plan Oluştur",
    profileLabel: "Profil Rolü Seç",
    ingestSummary: "Yaşam Sinyali İşlendi",
    profiles: { student: "Çocuk / Öğrenci", adult: "Çalışan Profesyonel", senior: "Yaşlı / Emekli" }
  },
  nl: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "Levensbeslissing Besturingssysteem",
    uploadSignal: "Upload Levenssignaal",
    uploadHelp: "Stuur een spraakbericht, factuur of controlelijst in",
    tomorrowPlan: "Dagelijks Energie- & Focusplan",
    frictionBudget: "Financieel & Aandachtsbudget",
    logisticsRadar: "Huishoud- & Routineradar",
    generatePlan: "Genereer Plan",
    profileLabel: "Selecteer Profielrol",
    ingestSummary: "Levenssignaal Verwerkt",
    profiles: { student: "Kind / Student", adult: "Werkende Professional", senior: "Oudere / Gepensioneerd" }
  },
  sv: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "Livsbeslutsoperativsystem",
    uploadSignal: "Ladda upp livssignal",
    uploadHelp: "Skicka röstanteckning, faktura eller checklista",
    tomorrowPlan: "Daglig energi- & fokusplan",
    frictionBudget: "Ekonomi- & uppmärksamhetsbudget",
    logisticsRadar: "Hem- & rutinradar",
    generatePlan: "Generera plan",
    profileLabel: "Välj profilroll",
    ingestSummary: "Livssignal behandlad",
    profiles: { student: "Barn / Student", adult: "Arbetande professionell", senior: "Äldre / Pensionerad" }
  },
  pl: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "System Decyzyjny Życia",
    uploadSignal: "Prześlij Sygnał Życiowy",
    uploadHelp: "Prześlij notatkę głosową, fakturę lub listę kontrolną",
    tomorrowPlan: "Codzienny Plan Energii i Koncentracji",
    frictionBudget: "Budżet Finansów i Uwagi",
    logisticsRadar: "Radar Domu i Rutyny",
    generatePlan: "Generuj Plan",
    profileLabel: "Wybierz Rolę Profilu",
    ingestSummary: "Sygnał Życiowy Przetworzony",
    profiles: { student: "Dziecko / Student", adult: "Aktywny Zawodowo", senior: "Senior / Emeryt" }
  },
  vi: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "Hệ Điều Hành Quyết Định Cuộc Sống",
    uploadSignal: "Tải lên Tín hiệu Cuộc sống",
    uploadHelp: "Gửi ghi âm giọng ải, hóa đơn hoặc danh sách công việc",
    tomorrowPlan: "Kế hoạch Năng lượng & Tập trung Hàng ngày",
    frictionBudget: "Quản lý Ngân sách & Sự Tập trung",
    logisticsRadar: "Radar Việc nhà & Thói quen",
    generatePlan: "Tạo Kế hoạch",
    profileLabel: "Chọn Vai trò Hồ sơ",
    ingestSummary: "Tín hiệu đã được xử lý",
    profiles: { student: "Trẻ em / Học sinh", adult: "Người đi làm", senior: "Người cao tuổi / Hưu trí" }
  },
  th: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "ระบบปฏิบัติการการตัดสินใจในชีวิต",
    uploadSignal: "อัปโหลดสัญญาณชีวิต",
    uploadHelp: "ส่งบันทึกเสียง ใบเสร็จ หรือรายการสิ่งที่ต้องทำ",
    tomorrowPlan: "แผนพลังงานและการโฟกัสรายวัน",
    frictionBudget: "การบริหารงบประมาณและการดึงความสนใจ",
    logisticsRadar: "เรดาร์การทำงานบ้านและกิจวัตร",
    generatePlan: "สร้างแผนงาน",
    profileLabel: "เลือกบทบาทโปรไฟล์",
    ingestSummary: "ประมวลผลสัญญาณชีวิตสำเร็จ",
    profiles: { student: "เด็ก / นักเรียน", adult: "วัยทำงาน", senior: "ผู้สูงอายุ / เกษียณอายุ" }
  },
  id: {
    ...baseEn,
    title: "PragmaLogixAI",
    subtitle: "Sistem Operasi Keputusan Hidup",
    uploadSignal: "Unggah Sinyal Kehidupan",
    uploadHelp: "Kirim catatan suara, tagihan, atau daftar tugas",
    tomorrowPlan: "Rencana Energi & Fokus Harian",
    frictionBudget: "Anggaran Keuangan & Atensi",
    logisticsRadar: "Radar Rutinitas & Rumah Tangga",
    generatePlan: "Buat Rencana",
    profileLabel: "Pilih Peran Profil",
    ingestSummary: "Sinyal Kehidupan Diproses",
    profiles: { student: "Anak / Pelajar", adult: "Profesional Aktif", senior: "Lansia / Pensiunan" }
  }
};

export function useTranslations(lang: Language): Strings {
  return translations[lang] || baseEn;
}

export default translations;
