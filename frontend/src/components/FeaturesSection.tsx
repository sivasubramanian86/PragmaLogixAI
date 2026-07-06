import React from "react";
import type { Language } from "../lib/types";

interface FeaturesSectionProps {
  lang: Language;
}

const localT: Record<string, any> = {
  en: {
    title: "System Capabilities",
    desc: "PragmaLogixAI operates on a multi-agent decision mesh, enabling autonomous cognitive assistance.",
    poweredBy: "Powered by Vertex AI · Gemini 2.5 Pro · Gemini 2.5 Flash · Imagen 3 · Cloud Run · BigQuery",
    features: [
      {
        icon: "🎯",
        title: "Tomorrow Plan Journey",
        desc: "Optimises daily schedules by aligning sleep schedules, focus hours, work meetings, and logistics into a single cohesive timeline.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "💳",
        title: "Monthly Friction Budget",
        desc: "Audits subscription leaks, unused digital services, and attention drains to propose micro-adjustments that save money and mental bandwidth.",
        accent: "var(--accent-amber)",
      },
      {
        icon: "🏠",
        title: "Home & Logistics Radar",
        desc: "Triggers preventative actions for appliance check-ins, routine maintenance logs, chores routing, and household inventory management.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🧬",
        title: "Multi-Agent ADK Mesh",
        desc: "Five specialized agents (Health, Mind, Finance, Logistics, Career) execute in parallel to extract insights, which are synthesized by a central coordinator.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "🔍",
        title: "Tactical GraphRAG",
        desc: "Uses a local PostgreSQL db with pgvector to query related nodes, constructing a rich local contextual knowledge graph for LLM generation.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🎙️",
        title: "Multimodal Ingestion",
        desc: "Upload text notes, invoices, daily checklists, or audio logs. The system processes text, images, video, and audio signals uniformly.",
        accent: "var(--accent-rose)",
      }
    ]
  },
  es: {
    title: "Capacidades del Sistema",
    desc: "PragmaLogixAI opera en una red de decisión multiagente, lo que permite una asistencia cognitiva autónoma.",
    poweredBy: "Impulsado por Vertex AI · Gemini 2.5 Pro · Gemini 2.5 Flash · Imagen 3 · Cloud Run · BigQuery",
    features: [
      {
        icon: "🎯",
        title: "Jornada del Plan de Mañana",
        desc: "Optimiza los horarios diarios alineando las horas de sueño, las horas de enfoque, las reuniones de trabajo y la logística en una sola línea de tiempo cohesiva.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "💳",
        title: "Presupuesto de Fricción Mensual",
        desc: "Audita fugas de suscripciones, servicios digitales no utilizados y pérdidas de atención para proponer microajustes que ahorran dinero y ancho de banda mental.",
        accent: "var(--accent-amber)",
      },
      {
        icon: "🏠",
        title: "Radar de Hogar y Logística",
        desc: "Activa acciones preventivas para el control de electrodomésticos, registros de mantenimiento de rutina, asignación de tareas y gestión de inventario doméstico.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🧬",
        title: "Red ADK Multiagente",
        desc: "Cinco agentes especializados (Salud, Mente, Finanzas, Logística, Carrera) se ejecutan en paralelo para extraer información, sintetizada por un coordinador central.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "🔍",
        title: "GraphRAG Táctico",
        desc: "Utiliza una base de datos local PostgreSQL con pgvector para consultar nodos relacionados, construyendo un rico grafo de conocimiento contextual para la generación de LLM.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🎙️",
        title: "Ingesta Multimodal",
        desc: "Sube notas de texto, facturas, listas de verificación o grabaciones de audio. El sistema procesa señales de texto, imágenes, video y audio de manera uniforme.",
        accent: "var(--accent-rose)",
      }
    ]
  },
  hi: {
    title: "सिस्टम की क्षमताएं",
    desc: "प्राग्मालोगिक्स एआई एक मल्टी-एजेंट निर्णय मेश पर संचालित होता है, जो स्वायत्त संज्ञानात्मक सहायता को सक्षम बनाता है.",
    poweredBy: "Vertex AI · Gemini 2.5 Pro · Gemini 2.5 Flash · Imagen 3 · Cloud Run · BigQuery द्वारा संचालित",
    features: [
      {
        icon: "🎯",
        title: "कल की योजना यात्रा",
        desc: "नींद के कार्यक्रम, फोकस घंटे, काम की बैठकों और रसद को एक सुसंगत समयरेखा में संरेखित करके दैनिक कार्यक्रम को अनुकूलित करता है.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "💳",
        title: "मासिक घर्षण बजट",
        desc: "पैसे और मानसिक बैंडविड्थ को बचाने वाले सूक्ष्म समायोजन का प्रस्ताव करने के लिए सदस्यता लीक, अप्रयुक्त डिजिटल सेवाओं और ध्यान की कमी का ऑडिट करता है.",
        accent: "var(--accent-amber)",
      },
      {
        icon: "🏠",
        title: "गृह एवं रसद रडार",
        desc: "उपकरण चेक-इन, नियमित रखरखाव लॉग, घरेलू काम रूटिंग और घरेलू सूची प्रबंधन के लिए निवारक क्रियाओं को ट्रिगर करता है.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🧬",
        title: "मल्टी-एजेंट एडीके मेश",
        desc: "अंतर्दृष्टि निकालने के लिए पांच विशेषज्ञ एजेंट (स्वास्थ्य, मन, वित्त, रसद, करियर) समानांतर में निष्पादित होते हैं, जिन्हें एक केंद्रीय समन्वयक द्वारा संश्लेषित किया जाता है.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "🔍",
        title: "सामरिक GraphRAG",
        desc: "संबंधित नोड्स को क्वेरी करने के लिए pgvector के साथ एक स्थानीय PostgreSQL डेटाबेस का उपयोग करता है, जिससे LLM पीढ़ी के लिए एक समृद्ध स्थानीय प्रासंगिक ज्ञान ग्राफ का निर्माण होता है.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🎙️",
        title: "मल्टीमॉडल अंतर्ग्रहण",
        desc: "पाठ नोट्स, चालान, दैनिक चेकलिस्ट या ऑडियो लॉग अपलोड करें. सिस्टम पाठ, चित्र, वीडियो और ऑडियो संकेतों को समान रूप से संसाधित करता है.",
        accent: "var(--accent-rose)",
      }
    ]
  },
  ta: {
    title: "கணினி திறன்கள்",
    desc: "பிராக்மாலோஜிக்ஸ் ஏஐ ஒரு மல்டி-ஏஜென்ட் முடிவு மெஷில் இயங்குகிறது, இது தன்னாட்சி அறிவாற்றல் உதவியை செயல்படுத்துகிறது.",
    poweredBy: "வெர்டெக்ஸ் ஏஐ · ஜெமினி 2.5 ப்ரோ · ஜெமினி 2.5 ஃபிளாஷ் · இமேஜன் 3 · கிளவுட் ரன் · பிக்வெரி மூலம் இயக்கப்படுகிறது",
    features: [
      {
        icon: "🎯",
        title: "நாளை திட்டப் பயணம்",
        desc: "தூக்க அட்டவணைகள், கவனம் செலுத்தும் நேரம், பணி கூட்டங்கள் மற்றும் தளவாடங்களை ஒற்றை ஒத்திசைவான காலவரிசையில் சீரமைப்பதன் மூலம் தினசரி அட்டவணைகளை மேம்படுத்துகிறது.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "💳",
        title: "மாதாந்திர தடை வரவுசெலவுத் திட்டம்",
        desc: "பணம் மற்றும் மன அலைவரிசையைச் சேமிக்கும் நுண்-சரிசெய்தல்களை முன்மொழிவதற்கு சந்தா கசிவுகள், பயன்படுத்தப்படாத டிஜிட்டல் சேவைகள் மற்றும் கவனச்சிதறல்களை தணிக்கை செய்கிறது.",
        accent: "var(--accent-amber)",
      },
      {
        icon: "🏠",
        title: "வீடு & தளவாட ரேடார்",
        desc: "சாதன சோதனைகள், வழக்கமான பராமரிப்பு பதிவுகள், வீட்டு வேலைகள் மற்றும் வீட்டு சரக்கு நிர்வாகத்திற்கான தடுப்பு நடவடிக்கைகளைத் தூண்டுகிறது.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🧬",
        title: "மல்டி-ஏஜென்ட் ஏடிகே மெஷ்",
        desc: "நுண்ணறிவுகளைப் பிரித்தெடுக்க ஐந்து நிபுணத்துவ முகவர்கள் (உடல்நலம், மனம், நிதி, தளவாடங்கள், தொழில்) இணையாகச் செயல்படுகின்றன, அவை மைய ஒருங்கிணைப்பாளரால் தொகுக்கப்படுகின்றன.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "🔍",
        title: "தந்திரோபாய GraphRAG",
        desc: "தொடர்புடைய முனையங்களை வினவ pgvector உடன் உள்ளூர் போஸ்ட்கிரெஸ்கியூஎல் தரவுத்தளத்தைப் பயன்படுத்துகிறது, எல்எல்எம் உருவாக்கத்திற்கான சிறந்த உள்ளூர் சூழல் அறிவு வரைபடத்தை உருவாக்குகிறது.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🎙️",
        title: "பன்முக உட்கொள்ளல்",
        desc: "உரை குறிப்புகள், விலைப்பட்டியல்கள், தினசரி சரிபார்ப்புப் பட்டியல்கள் அல்லது குரல் பதிவுகளைப் பதிவேற்றவும். உரை, படம், வீடியோ மற்றும் ஆடியோ சமிக்ஞைகளை கணினி ஒரே மாதிரியாக செயலாக்குகிறது.",
        accent: "var(--accent-rose)",
      }
    ]
  },
  kn: {
    title: "ಸಿಸ್ಟಮ್ ಸಾಮರ್ಥ್ಯಗಳು",
    desc: "ಪ್ರಾಗ್ಮಾಲಾಜಿಕ್ಸ್ ಎಐ ಮಲ್ಟಿ-ಏಜೆಂಟ್ ನಿರ್ಧಾರ ಮೆಶ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ಇದು ಸ್ವಾಯತ್ತ ಅರಿವಿನ ನೆರವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ.",
    poweredBy: "ವರ್ಟೆಕ್ಸ್ ಎಐ · ಜೆಮಿನಿ 2.5 ಪ್ರೊ · ಜೆಮಿನಿ 2.5 ಫ್ಲ್ಯಾಶ್ · ಇಮೇಜನ್ 3 · ಕ್ಲೌಡ್ ರನ್ · ಬಿಗ್‌ಕ್ವೆರಿ ಮೂಲಕ ಚಾಲಿತವಾಗಿದೆ",
    features: [
      {
        icon: "🎯",
        title: "ನಾಳೆಯ ಯೋಜನೆ ಪ್ರಯಾಣ",
        desc: "ನಿದ್ದೆಯ ವೇಳಾಪಟ್ಟಿಗಳು, ಗಮನದ ಸಮಯ, ಕೆಲಸದ ಸಭೆಗಳು ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಅನ್ನು ಒಂದೇ ಸುಸಂಬದ್ಧ ಟೈಮ್‌ಲೈನ್‌ಗೆ ಜೋಡಿಸುವ ಮೂಲಕ ದೈನಂದಿನ ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಉತ್ತಮಗೊಳಿಸುತ್ತದೆ.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "💳",
        title: "ಮಾಸಿಕ ಘರ್ಷಣೆ ಬಜೆಟ್",
        desc: "ಹಣ ಮತ್ತು ಮಾನಸಿಕ ಬ್ಯಾಂಡ್‌ವಿಡ್ತ್ ಉಳಿಸಲು ಚಂದಾದಾರಿಕೆ ಸೋರಿಕೆಗಳು, ಬಳಕೆಯಾಗದ ಡಿಜಿಟಲ್ ಸೇವೆಗಳು ಮತ್ತು ಗಮನದ ಕೊರತೆಗಳನ್ನು ಲೆಕ್ಕಪರಿಶೋಧಿಸುತ್ತದೆ.",
        accent: "var(--accent-amber)",
      },
      {
        icon: "🏠",
        title: "ಮನೆ ಮತ್ತು ಲಾಜಿಸ್ಟಿಕ್ಸ್ ರಾಡಾರ್",
        desc: "ಉಪಕರಣಗಳ ಪರಿಶೀಲನೆ, ದಿನನಿತ್ಯದ ನಿರ್ವಹಣೆ ಲಾಗ್‌ಗಳು, ಮನೆಕೆಲಸದ ರೂಟಿಂಗ್ ಮತ್ತು ಗೃಹೋಪಯೋಗಿ ದಾಸ್ತಾನು ನಿರ್ವಹಣೆಗಾಗಿ ತಡೆಗಟ್ಟುವ ಕ್ರಮಗಳನ್ನು ಪ್ರಚೋದಿಸುತ್ತದೆ.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🧬",
        title: "ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಎಡಿಕೆ ಮೆಶ್",
        desc: "ಒಳನೋಟಗಳನ್ನು ಹೊರತೆಗೆಯಲು ಐದು ವಿಶೇಷ ಏಜೆಂಟರು (ಆರೋಗ್ಯ, ಮನಸ್ಸು, ಹಣಕาสು, ಲಾಜಿಸ್ಟಿಕ್ಸ್, ವೃತ್ತಿ) ಸಮಾನಾಂತರವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಾರೆ, ಇವುಗಳನ್ನು ಕೇಂದ್ರೀಯ ಸಂಯೋಜಕರು ಸಂಶ್ಲೇಷಿಸುತ್ತಾರೆ.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "🔍",
        title: "ಟ್ಯಾಕ್ಟಿಕಲ್ GraphRAG",
        desc: "ಸಂಬಂಧಿತ ನೋಡ್‌ಗಳನ್ನು ಪ್ರಶ್ನಿಸಲು pgvector ನೊಂದಿಗೆ ಸ್ಥಳೀಯ PostgreSQL ಡೇಟಾಬೇಸ್ ಅನ್ನು ಬಳಸುತ್ತದೆ, ಇದು ಎಲ್‌ಎಲ್‌ಎಂ ಉತ್ಪಾದನೆಗಾಗಿ ಶ್ರೀಮಂತ ಸ್ಥಳೀಯ ಜ್ಞಾನ ಗ್ರಾಫ್ ಅನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🎙️",
        title: "ಮಲ್ಟಿಮೋಡಲ್ ಇಂಜೆಷನ್",
        desc: "ಪಠ್ಯ ಟಿಪ್ಪಣಿಗಳು, ಇನ್‌ವಾಯ್ಸ್‌ಗಳು, ದೈನಂದಿನ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಗಳು ಅಥವಾ ಆಡಿಯೊ ಲಾಗ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಸಿಸ್ಟಮ್ ಪಠ್ಯ, ಚಿತ್ರಗಳು, ವೀಡಿಯೊ ಮತ್ತು ಆಡಿಯೊ ಸಿಗ್ನಲ್‌ಗಳನ್ನು ಏಕರೂಪವಾಗಿ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ.",
        accent: "var(--accent-rose)",
      }
    ]
  },
  te: {
    title: "సిస్టమ్ సామర్థ్యాలు",
    desc: "ప్రాగ్మా లాజిక్స్ AI మల్టీ-ఏజెంట్ నిర్ణయాల మెష్ పై పనిచేస్తుంది, ఇది స్వయంప్రతిపత్తి కలిగిన సహాయాన్ని అందిస్తుంది.",
    poweredBy: "వర్టెక్స్ AI · జెమినీ 2.5 ప్రో · జెమినీ 2.5 ఫ్లాష్ · ఇమేజన్ 3 · క్లೌడ్ రన్ · బిగ్ క్వెరీ ఆధారితం",
    features: [
      {
        icon: "🎯",
        title: "రేపటి ప్రణాళిక జర్నీ",
        desc: "నిద్ర వేళలు, ఫోకస్ గంటలు, పని సమావేశాలు మరియు లాజిస్టిక్స్ ఒకే కాలక్రమంలో సమన్వయం చేయడం ద్వారా రోజువారీ షెడ్యూల్‌ను ఆప్టిమైజ్ చేస్తుంది.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "💳",
        title: "నెలవారీ ఘర్షణ బడ్జెట్",
        desc: "సభ్యత్వాల లీక్‌లు, ఉపయోగించని డిజిటల్ సేవలు మరియు శ్రద్ధ లోపాలను ఆడిట్ చేసి డబ్బు మరియు మానసిక బ్యాండ్‌విడ్త్‌ను ఆదా చేసే సూక్ష్మ సర్దుబాట్లను ప్రతిపాదిస్తుంది.",
        accent: "var(--accent-amber)",
      },
      {
        icon: "🏠",
        title: "ఇల్లు & లాజిస్టిక్స్ రాడార్",
        desc: "ఉపకరణాల తనిఖీలు, దినచర్య నిర్వహణ లాగ్‌లు, ఇంటి పనుల కేటాయింపు మరియు గృహ జాబితా నిర్వహణ కోసం నివారణ చర్యలను ప్రేరేపిస్తుంది.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🧬",
        title: "మల్టీ-ఏజెంట్ ADK మెష్",
        desc: "విశ్లేషణల కోసం ఐదు ప్రత్యేక ఏజెంట్లు (ఆరోగ్యం, మనస్సు, ఆర్థికం, లాజిస్టిక్స్, కెరీర్) సమాంతరంగా రన్ అవుతాయి, వీటిని కోఆర్డినేటర్ సంశ్లేషణ చేస్తారు.",
        accent: "var(--accent-primary)",
      },
      {
        icon: "🔍",
        title: "టాక్టికల్ GraphRAG",
        desc: "సంబంధిత నోడ్‌లను కనుగొనడానికి pgvector లోకల్ PostgreSQL డేటాబేస్ ను ఉపయోగిస్తుంది, ఇది LLM సృష్టి కోసం బలమైన సందర్భోచిత జ్ఞాన గ్రాఫ్‌ను నిర్మిస్తుంది.",
        accent: "var(--accent-teal)",
      },
      {
        icon: "🎙️",
        title: "మల్టిమోడల్ ఇంగెషన్",
        desc: "టెక్స్ట్ నోట్స్, రసీదులు, చెక్‌లిస్ట్‌లు లేదా ఆడియోలను అప్‌లోడ్ చేయండి. సిస్టమ్ టెక్స్ట్, ఇమేజ్, వీడియో మరియు ఆడియో సంకేతాలను సమానంగా విశ్లేషిస్తుంది.",
        accent: "var(--accent-rose)",
      }
    ]
  }
};

export default function FeaturesSection({ lang }: FeaturesSectionProps) {
  const activeLang = localT[lang] ? lang : "en";
  const tLocal = localT[activeLang];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", animation: "fadeIn 0.3s ease" }}>
      
      {/* ── Capabilities Header ── */}
      <div>
        <h2 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
          {tLocal.title}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          {tLocal.desc}
        </p>
      </div>

      {/* ── Feature Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {tLocal.features.map((f: any, idx: number) => (
          <div
            key={idx}
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              borderLeft: `3px solid ${f.accent}`,
            }}
          >
            <div style={{ fontSize: "2rem" }}>{f.icon}</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{f.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
        {tLocal.poweredBy}
      </div>

    </div>
  );
}
