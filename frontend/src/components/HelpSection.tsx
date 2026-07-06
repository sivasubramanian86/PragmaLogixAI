import React from "react";
import type { Language } from "../lib/types";

interface HelpSectionProps {
  lang: Language;
}

const localT: Record<string, any> = {
  en: {
    title: "User Guide & Documentation",
    desc: "Get started with PragmaLogixAI using our step-by-step pipeline onboarding guide.",
    usefulCmds: "Useful Commands",
    usefulCmdsDesc: "To verify or execute the test suite, you can run the following commands from your workspace terminal:",
    steps: [
      {
        num: "01",
        title: "Configure Profile & Language",
        desc: "Use the sidebar to choose your target demographic (Student, Adult, or Senior) and preferred language (English, Hindi, Tamil, or Kannada). The linter adjusts its evaluation thresholds dynamically based on this profile.",
      },
      {
        num: "02",
        title: "Prepare Life Signal File",
        desc: "Record a voice note describing your sleep pattern (e.g. 'Slept at 11 PM, woke up at 6 AM'), upload a monthly bill invoice (image/PDF), or write out your tasks for the week in a text file.",
      },
      {
        num: "03",
        title: "Trigger Ingestion Pipeline",
        desc: "Browse and select your file. Click 'Generate Plan'. The system runs parallel agent loops to extract core events, update the GraphRAG store, and calculate a consolidated decision journey plan.",
      },
      {
        num: "04",
        title: "View Journeys & Logs",
        desc: "Use the tabs to switch between tomorrow's plan, subscription audit details, and logistics routines. Check out the Agent Visualizer to observe execution steps in real-time.",
      },
    ]
  },
  es: {
    title: "Guía de Usuario y Documentación",
    desc: "Comience con PragmaLogixAI utilizando nuestra guía de incorporación paso a paso.",
    usefulCmds: "Comandos Útiles",
    usefulCmdsDesc: "Para verificar o ejecutar la suite de pruebas, puede ejecutar los siguientes comandos desde la terminal de su espacio de trabajo:",
    steps: [
      {
        num: "01",
        title: "Configurar Perfil e Idioma",
        desc: "Use la barra lateral para elegir su grupo demográfico objetivo (Estudiante, Adulto o Mayor) y su idioma preferido. El linter ajusta sus umbrales dinámicamente según el perfil.",
      },
      {
        num: "02",
        title: "Preparar Archivo de Señal",
        desc: "Grabe una nota de voz que describa su patrón de sueño, cargue una factura mensual (imagen/PDF) o escriba sus tareas para la semana en un archivo de texto.",
      },
      {
        num: "03",
        title: "Iniciar Flujo de Ingesta",
        desc: "Busque y seleccione su archivo. Haga clic en 'Generar Plan'. El sistema ejecuta bucles de agentes en paralelo para calcular un plan de decisión consolidado.",
      },
      {
        num: "04",
        title: "Ver Jornadas y Registros",
        desc: "Use las pestañas para cambiar entre el plan de mañana, la auditoría de suscripciones y las rutinas. Consulte el Visualizador de Agentes en tiempo real.",
      },
    ]
  },
  hi: {
    title: "उपयोगकर्ता गाइड और दस्तावेज़",
    desc: "हमारे चरण-दर-चरण ऑनबोर्डिंग गाइड का उपयोग करके प्राग्मालोगिक्स एआई के साथ शुरुआत करें.",
    usefulCmds: "उपयोगी कमांड",
    usefulCmdsDesc: "परीक्षण सूट को सत्यापित या निष्पादित करने के लिए, आप अपने कार्यक्षेत्र टर्मिनल से निम्न कमांड चला सकते हैं:",
    steps: [
      {
        num: "01",
        title: "प्रोफ़ाइल और भाषा कॉन्फ़िगर करें",
        desc: "अपने लक्षित जनसांख्यिकीय (छात्र, वयस्क, या वरिष्ठ) और पसंदीदा भाषा का चयन करने के लिए साइडबार का उपयोग करें. लिंटर इस प्रोफ़ाइल के आधार पर अपने मूल्यांकन थ्रेसहोल्ड को गतिशील रूप से समायोजित करता है.",
      },
      {
        num: "02",
        title: "जीवन संकेत फ़ाइल तैयार करें",
        desc: "अपनी नींद के पैटर्न का वर्णन करने वाला एक वॉयस नोट रिकॉर्ड करें, मासिक बिल इनवॉइस अपलोड करें, या एक टेक्स्ट फ़ाइल में सप्ताह के अपने कार्यों को लिखें.",
      },
      {
        num: "03",
        title: "अंतर्ग्रहण पाइपलाइन ट्रिगर करें",
        desc: "अपनी फ़ाइल ब्राउज़ करें और चुनें. 'योजना बनाएं' पर क्लिक करें. सिस्टम कोर घटनाओं को निकालने और एक समेकित निर्णय यात्रा योजना की गणना करने के लिए समानांतर विशेषज्ञ एजेंट चलाता है.",
      },
      {
        num: "04",
        title: "यात्राएं और लॉग देखें",
        desc: "कल की योजना, सदस्यता ऑडिट विवरण और रसद दिनचर्या के बीच स्विच करने के लिए टैब का उपयोग करें. वास्तविक समय में निष्पादन चरणों का निरीक्षण करने के लिए एजेंट विज़ुअलाइज़र देखें.",
      },
    ]
  },
  ta: {
    title: "பயனர் வழிகாட்டி & ஆவணங்கள்",
    desc: "எங்கள் படிப்படியான வழிகாட்டியைப் பயன்படுத்தி பிராக்மாலோஜிக்ஸ் ஏஐ ஐப் பயன்படுத்தத் தொடங்குங்கள்.",
    usefulCmds: "பயனுள்ள கட்டளைகள்",
    usefulCmdsDesc: "சோதனைத் தொகுப்பைச் சரிபார்க்க அல்லது இயக்க, உங்கள் பணிமனை முனையத்திலிருந்து பின்வரும் கட்டளைகளை இயக்கலாம்:",
    steps: [
      {
        num: "01",
        title: "சுயவிவரம் & மொழியை உள்ளமைக்கவும்",
        desc: "உங்கள் இலக்கு சுயவிவரம் (மாணவர், வயதுவந்தோர் அல்லது முதியவர்) மற்றும் விருப்பமான மொழியைத் தேர்ந்தெடுக்க பக்கவாட்டுப் பட்டியைப் பயன்படுத்தவும். இந்த சுயவிவரத்தின் அடிப்படையில் லிண்டர் அதன் வரம்புகளை மாற்றியமைக்கிறது.",
      },
      {
        num: "02",
        title: "சமிக்ஞை கோப்பைத் தயார் செய்யவும்",
        desc: "உங்கள் தூக்க முறையை விவரிக்கும் குரல் குறிப்பை பதிவு செய்யவும், மாதாந்திர விலைப்பட்டியலை பதிவேற்றவும் அல்லது உங்கள் வாராந்திர பணிகளை உரை கோப்பில் எழுதவும்.",
      },
      {
        num: "03",
        title: "உட்கொள்ளல் குழாய்வழியைத் தூண்டவும்",
        desc: "உங்கள் கோப்பைத் தேர்ந்தெடுத்து 'திட்டத்தை உருவாக்கு' என்பதைக் கிளிக் செய்யவும். நிகழ்வுகளைப் பிரித்தெடுத்து ஒருங்கிணைந்த வாழ்க்கை திட்டத்தைக் கணக்கிட கணினி இணையான முகவர்களை இயக்குகிறது.",
      },
      {
        num: "04",
        title: "பயணங்கள் & பதிவுகளைக் காண்க",
        desc: "நாளைய திட்டம், சந்தா தணிக்கை மற்றும் தளவாடங்களுக்கு இடையே மாற தாவல்களைப் பயன்படுத்தவும். முகவர் செயல்பாடுகளை நிகழ்நேரத்தில் கவனிக்க ஏஜென்ட் விசுவலைசரை பார்க்கவும்.",
      },
    ]
  },
  kn: {
    title: "ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ದಾಖಲೆಗಳು",
    desc: "ನಮ್ಮ ಹಂತ-ಹಂತದ ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಬಳಸಿಕೊಂಡು ಪ್ರಾಗ್ಮಾಲಾಜಿಕ್ಸ್ ಎಐ ನೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ.",
    usefulCmds: "ಉಪಯುಕ್ತ ಆಜ್ಞೆಗಳು",
    usefulCmdsDesc: "ಪರೀಕ್ಷಾ ಸೂಟ್ ಅನ್ನು ಪರಿಶೀಲಿಸಲು ಅಥವಾ ಚಲಾಯಿಸಲು, ನಿಮ್ಮ ವರ್ಕ್‌ಸ್ಪೇಸ್ ಟರ್ಮಿನಲ್‌ನಿಂದ ಈ ಕೆಳಗಿನ ಆಜ್ಞೆಗಳನ್ನು ಚಲಾಯಿಸಬಹುದು:",
    steps: [
      {
        num: "01",
        title: "ಪ್ರೊಫೈಲ್ ಮತ್ತು ಭಾಷೆಯನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ",
        desc: "ನಿಮ್ಮ ಗುರಿ ಜನಸಂಖ್ಯಾಶಾಸ್ತ್ರ (ವಿದ್ಯಾರ್ಥಿ, ವಯಸ್ಕರು ಅಥವಾ ಹಿರಿಯರು) ಮತ್ತು ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಸೈಡ್‌ಬಾರ್ ಬಳಸಿ. ಲಿಂಟರ್ ಈ ಪ್ರೊಫೈಲ್ ಆಧರಿಸಿ ತನ್ನ ಮಿತಿಗಳನ್ನು ಹೊಂದಿಸುತ್ತದೆ.",
      },
      {
        num: "02",
        title: "ಲೈಫ್ ಸಿಗ್ನಲ್ ಫೈಲ್ ಸಿದ್ಧಪಡಿಸಿ",
        desc: "ನಿಮ್ಮ ನಿದ್ರೆಯ ಮಾದರಿಯನ್ನು ವಿವರಿಸುವ ಧ್ವನಿ ಟಿಪ್ಪಣಿಯನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಿ, ಮಾಸಿಕ ಬಿಲ್ ಇನ್‌ವಾಯ್ಸ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಪಠ್ಯ ಫೈಲ್‌ನಲ್ಲಿ ವಾರದ ಕಾರ್ಯಗಳನ್ನು ಬರೆಯಿರಿ.",
      },
      {
        num: "03",
        title: "ಇಂಜೆಷನ್ ಪೈಪ್‌ಲೈನ್ ಪ್ರಚೋದಿಸಿ",
        desc: "ನಿಮ್ಮ ಫೈಲ್ ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿ 'ಯೋಜನೆ ರೂಪಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ. ಸಿಸ್ಟಮ್ ಪ್ರಮುಖ ಘಟನೆಗಳನ್ನು ಹೊರತೆಗೆಯಲು ಮತ್ತು ಸಮಗ್ರ ನಿರ್ಧಾರ ಯೋಜನೆಯನ್ನು ಲೆಕ್ಕಹಾಕಲು ಏಜೆಂಟ್ ಲೂಪ್‌ಗಳನ್ನು ರನ್ ಮಾಡುತ್ತದೆ.",
      },
      {
        num: "04",
        title: "ಪ್ರಯಾಣಗಳು ಮತ್ತು ಲಾಗ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
        desc: "ನಾಳೆಯ ಯೋಜನೆ, ಚಂದಾದಾರಿಕೆ ಆಡಿಟ್ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್ ನಡುವೆ ಬದಲಾಯಿಸಲು ಟ್ಯಾಬ್‌ಗಳನ್ನು ಬಳಸಿ. ನೈಜ ಸಮಯದಲ್ಲಿ ಏಜೆಂಟ್ ಹಂತಗಳನ್ನು ಗಮನಿಸಲು ಏಜೆಂಟ್ ವಿಝುವಲೈಸರ್ ಪರಿಶೀಲಿಸಿ.",
      },
    ]
  },
  te: {
    title: "వినియోగదారు గైడ్ & డాక్యుమెంటేషన్",
    desc: "మా దశల వారీ ఆన్‌బోర్డింగ్ గైడ్‌ని ఉపయోగించి ప్రాగ్మా లాజిక్స్ AI తో ప్రారంభించండి.",
    usefulCmds: "ఉపయోగకరమైన ఆదేశాలు",
    usefulCmdsDesc: "టెస్ట్ సూట్‌ను ధృవీకరించడానికి లేదా రన్ చేయడానికి, మీరు మీ వర్క్‌స్పేస్ టెర్మినల్ నుండి క్రింది ఆదేశాలను రన్ చేయవచ్చు:",
    steps: [
      {
        num: "01",
        title: "ప్రొఫైల్ & భాషను కాన్ఫిగర్ చేయండి",
        desc: "మీ లక్ష్య ప్రొఫైల్ (విద్యార్థి, వయోజనుడు లేదా సీనియర్) మరియు ప్రాధాన్య భాషను ఎంచుకోవడానికి సైడ్‌బార్‌ను ఉపయోగించండి. లింటర్ ఈ ప్రొఫైల్ ఆధారంగా థ్రెషోల్డ్‌లను సర్దుబాటు చేస్తుంది.",
      },
      {
        num: "02",
        title: "లైఫ్ సిగ్నల్ ఫైల్‌ను సిద్ధం చేయండి",
        desc: "మీ నిద్ర విధానాన్ని వివరించే వాయిస్ నోట్‌ను రికార్డ్ చేయండి, నెలవారీ బిల్లు రసీదుని అప్‌లోడ్ చేయండి లేదా టెక్స్ట్ ఫైల్‌లో పనులను వ్రాయండి.",
      },
      {
        num: "03",
        title: "ఇంగెషన్ పైప్‌లైన్‌ను ప్రారంభించండి",
        desc: "మీ ఫైల్‌ను ఎంచుకుని 'ప్లాన్ సృష్టించు' పై క్లిక్ చేయండి. సిగ్నల్ ని విశ్లేషించి తుది ప్రణాళికను లెక్కించడానికి సిస్టమ్ సమాంతర ఏజెంట్లను రన్ చేస్తుంది.",
      },
      {
        num: "04",
        title: "జర్నీలు & లాగ్‌లను వీక్షించండి",
        desc: "రేపటి ప్లాన్, సబ్‌స్క్రిప్షన్ ఆడిట్ మరియు లాజిస్టిక్స్ పనుల మధ్య మారడానికి ట్యాబ్‌లను ఉపయోగించండి. నిజ సమయంలో ఏజెంట్ల ప్రవాహాన్ని గమనించడానికి ఏజెంట్ విజువలైజర్ చూడండి.",
      },
    ]
  }
};

export default function HelpSection({ lang }: HelpSectionProps) {
  const activeLang = localT[lang] ? lang : "en";
  const tLocal = localT[activeLang];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", animation: "fadeIn 0.3s ease" }}>
      <div>
        <h2 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
          {tLocal.title}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          {tLocal.desc}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {tLocal.steps.map((s: any, idx: number) => (
          <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative" }}>
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--border-subtle)", position: "absolute", top: "1rem", right: "1.25rem" }}>
              {s.num}
            </span>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-teal)" }}>{s.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{tLocal.usefulCmds}</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {tLocal.usefulCmdsDesc}
        </p>
        <pre style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>
          python -m pytest tests/ -v
        </pre>
      </div>
    </div>
  );
}
