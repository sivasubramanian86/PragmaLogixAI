import React from "react";
import type { Language } from "../lib/types";

interface AboutSectionProps {
  lang: Language;
}

const localT: Record<string, any> = {
  en: {
    title: "About PragmaLogixAI",
    desc: "PragmaLogixAI is a graph-based, multi-agent Life Decision OS developed for the Gen AI APAC Hack2Skill Hackathon.",
    archTitle: "The Architecture",
    archDesc: "Our multi-agent system uses Google Vertex AI models directly without raw API keys, relying entirely on GCP Service Accounts and Application Default Credentials.",
    item1: "Gemini 2.5 Flash: Powers signal ingestion, routing, and specialist agent evaluations due to its speed and multimodal capability.",
    item2: "Gemini 2.5 Pro: Synthesizes final decision plans due to its deep planning and complex reasoning capability.",
    item3: "Agent Development Kit (ADK): Orchestrates our agent mesh structure.",
    item4: "GraphRAG (pgvector): Stores and queries tactical connections between nodes to ground agent queries in real user context.",
    flowTitle: "Cognitive Process Flow",
    flow1: "1. Signal Ingestion",
    flow1Desc: "User uploads files (audio note, receipt, checklist) which are stored in GCS and parsed by Flash into the database.",
    flow2: "2. Parallel Specialists",
    flow2Desc: "Health, Mind, Finance, Logistics, and Professional agents run concurrently to assess the signal against active user constraints.",
    flow3: "3. Coordinator Synthesis",
    flow3Desc: "The Coordinator Agent combines all reports, resolves inconsistencies, and writes daily plans and friction updates back to BigQuery.",
  },
  es: {
    title: "Acerca de PragmaLogixAI",
    desc: "PragmaLogixAI es un sistema operativo de decisiones de vida multiagente y basado en grafos desarrollado para el Hackathon Gen AI APAC Hack2Skill.",
    archTitle: "La Arquitectura",
    archDesc: "Nuestro sistema multiagente utiliza modelos de Google Vertex AI directamente sin claves API sin procesar, confiando completamente en cuentas de servicio de GCP y credenciales predeterminadas de la aplicación.",
    item1: "Gemini 2.5 Flash: Potencia la ingesta de señales, el enrutamiento y las evaluaciones de agentes especialistas gracias a su velocidad y capacidad multimodal.",
    item2: "Gemini 2.5 Pro: Sintetiza planes de decisión finales gracias a su profunda planificación y capacidad de razonamiento complejo.",
    item3: "Agent Development Kit (ADK): Orquesta nuestra estructura de red de agentes.",
    item4: "GraphRAG (pgvector): Almacena y consulta conexiones tácticas entre nodos para basar las consultas en el contexto real del usuario.",
    flowTitle: "Flujo de Proceso Cognitivo",
    flow1: "1. Ingesta de Señales",
    flow1Desc: "El usuario sube archivos (nota de audio, recibo, lista de verificación) que se almacenan en GCS y son analizados por Flash en la base de datos.",
    flow2: "2. Especialistas en Paralelo",
    flow2Desc: "Los agentes de Salud, Mente, Finanzas, Logística y Profesional se ejecutan concurrentemente para evaluar la señal según los límites del usuario.",
    flow3: "3. Síntesis del Coordinador",
    flow3Desc: "El agente Coordinador combina todos los informes, resuelve inconsistencias y escribe planes diarios y actualizaciones en BigQuery.",
  },
  hi: {
    title: "प्राग्मालोगिक्स एआई के बारे में",
    desc: "प्राग्मालोगिक्स एआई एक ग्राफ-आधारित, मल्टी-एजेंट लाइफ डिसीजन ओएस है जिसे जेन एआई एपीएसी हैक2स्किल हैकाथॉन के लिए विकसित किया गया है.",
    archTitle: "वास्तुकला",
    archDesc: "हमारा मल्टी-एजेंट सिस्टम बिना किसी कच्चे एपीआई कुंजी के सीधे Google Vertex AI मॉडल का उपयोग करता है, जो पूरी तरह से GCP सर्विस अकाउंट और एप्लिकेशन डिफॉल्ट क्रेडेंशियल्स पर निर्भर करता है.",
    item1: "Gemini 2.5 Flash: अपनी गति और मल्टीमॉडल क्षमता के कारण सिग्नल अंतर्ग्रहण, रूटिंग और विशेषज्ञ एजेंट मूल्यांकन को संचालित करता है.",
    item2: "Gemini 2.5 Pro: अपनी गहन योजना और जटिल तर्क क्षमता के कारण अंतिम निर्णय योजनाओं को संश्लेषित करता है.",
    item3: "एजेंट डेवलपमेंट किट (ADK): हमारी एजेंट मेश संरचना को व्यवस्थित करता है.",
    item4: "GraphRAG (pgvector): वास्तविक उपयोगकर्ता संदर्भ में एजेंट प्रश्नों को प्रमाणित करने के लिए नोड्स के बीच सामरिक कनेक्शनों को संग्रहीत और क्वेरी करता है.",
    flowTitle: "संज्ञानात्मक प्रक्रिया प्रवाह",
    flow1: "1. सिग्नल अंतर्ग्रहण",
    flow1Desc: "उपयोगकर्ता फाइलें (ऑडियो नोट, रसीद, चेकलिस्ट) अपलोड करता है जो GCS में संग्रहीत होती हैं और Flash द्वारा डेटाबेस में पार्स की जाती हैं.",
    flow2: "2. समानांतर विशेषज्ञ",
    flow2Desc: "स्वास्थ्य, मन, वित्त, रसद और व्यावसायिक एजेंट सक्रिय उपयोगकर्ता बाधाओं के विरुद्ध सिग्नल का आकलन करने के लिए समवर्ती रूप से चलते हैं.",
    flow3: "3. समन्वयक संश्लेषण",
    flow3Desc: "समन्वयक एजेंट सभी रिपोर्टों को जोड़ता है, विसंगतियों को हल करता है, और दैनिक योजनाओं और घर्षण अपडेट को BigQuery में लिखता है.",
  },
  ta: {
    title: "பிராக்மாலோஜிக்ஸ் ஏஐ பற்றி",
    desc: "பிராக்மாலோஜிக்ஸ் ஏஐ என்பது ஜென் ஏஐ ஏபிஏசி ஹேக்2ஸ்கில் ஹேக்கத்தானுக்காக உருவாக்கப்பட்ட வரைபடம் சார்ந்த, மல்டி-ஏஜென்ட் வாழ்க்கை முடிவு ஓஎஸ் ஆகும்.",
    archTitle: "கட்டமைப்பு",
    archDesc: "எங்கள் மல்டி-ஏஜென்ட் சிஸ்டம் ஜிசிபி சேவை கணக்குகள் மற்றும் பயன்பாட்டு இயல்ぶநிலை சான்றுகளை முழுமையாக நம்பி, மூல ஏபிஐ விசைகள் இல்லாமல் நேரடியாக கூகிள் வெர்டெக்ஸ் ஏஐ மாடல்களைப் பயன்படுத்துகிறது.",
    item1: "Gemini 2.5 Flash: அதன் வேகம் மற்றும் மல்டிமாடல் திறன் காரணமாக சமிக்ஞை உட்கொள்ளல், ரூட்டிங் மற்றும் நிபுணர் முகவர் மதிப்பீடுகளை இயக்குகிறது.",
    item2: "Gemini 2.5 Pro: அதன் ஆழமான திட்டமிடல் மற்றும் சிக்கலான பகுத்தறிவு திறன் காரணமாக இறுதி முடிவு திட்டங்களை ஒருங்கிணைக்கிறது.",
    item3: "ஏஜென்ட் டெவலப்மெண்ட் கிட் (ADK): எங்கள் ஏஜென்ட் மெஷ் கட்டமைப்பை ஒழுங்கமைக்கிறது.",
    item4: "GraphRAG (pgvector): பயனர் சூழலில் ஏஜென்ட் கேள்விகளை அடிப்படையாகக் கொள்ள நோட்களுக்கு இடையிலான தந்திரோபாய இணைப்புகளைச் சேமித்து வினவுகிறது.",
    flowTitle: "அறிவாற்றல் செயல்முறை ஓட்டம்",
    flow1: "1. சமிக்ஞை உட்கொள்ளல்",
    flow1Desc: "பயனர் கோப்புகளைப் பதிவேற்றுகிறார் (குரல் குறிப்பு, ரசீது, சரிபார்ப்புப் பட்டியல்) அவை GCS இல் சேமிக்கப்பட்டு Flash மூலம் தரவுத்தளத்தில் பகுப்பாய்வு செய்யப்படுகின்றன.",
    flow2: "2. இணையான நிபுணர்கள்",
    flow2Desc: "சமிக்ஞையை மதிப்பிட உடல்நலம், மனம், நிதி, தளவாடங்கள் மற்றும் தொழில்முறை முகவர்கள் ஒரே நேரத்தில் இயங்குகின்றன.",
    flow3: "3. ஒருங்கிணைப்பாளர் தொகுப்பு",
    flow3Desc: "ஒருங்கிணைப்பாளர் முகவர் அனைத்து அறிக்கைகளையும் இணைத்து, முரண்பாடுகளைத் தீர்த்து, தினசரி திட்டங்கள் மற்றும் தடைகளை பிக்வெரியில் எழுதுகிறார்.",
  },
  kn: {
    title: "ಪ್ರಾಗ್ಮಾಲಾಜಿಕ್ಸ್ ಎಐ ಬಗ್ಗೆ",
    desc: "ಪ್ರಾಗ್ಮಾಲಾಜಿಕ್ಸ್ ಎಐ ಎನ್ನುವುದು ಜೆನ್ ಎಐ ಎಪಿಎಸಿ ಹ್ಯಾಕ್2ಸ್ಕಿಲ್ ಹ್ಯಾಕಥಾನ್‌ಗಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾದ ಗ್ರಾಫ್-ಆಧಾರಿತ, ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಲೈಫ್ ಡಿಸಿಷನ್ ಓಎಸ್ ಆಗಿದೆ.",
    archTitle: "ವಾಸ್ತುಶಿಲ್ಪ",
    archDesc: "ನಮ್ಮ ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಸಿಸ್ಟಮ್ ಯಾವುದೇ ಕಚ್ಚಾ ಎಪಿಐ ಕೀಗಳಿಲ್ಲದೆ ನೇರವಾಗಿ ಗೂಗಲ್ ವರ್ಟೆಕ್ಸ್ ಎಐ ಮಾದರಿಗಳನ್ನು ಬಳಸುತ್ತದೆ, ಸಂಪೂರ್ಣವಾಗಿ ಜಿಸಿಪಿ ಸೇವಾ ಖಾತೆಗಳು ಮತ್ತು ಅಪ್ಲಿಕೇಶನ್ ಡೀಫಾಲ್ಟ್ ರುಜುವಾತುಗಳನ್ನು ಅವಲಂಬಿಸಿದೆ.",
    item1: "Gemini 2.5 Flash: ತನ್ನ ವೇಗ ಮತ್ತು ಮಲ್ಟಿಮೋಡಲ್ ಸಾಮರ್ಥ್ಯದಿಂದಾಗಿ ಸಿಗ್ನಲ್ ಇಂಜೆಷನ್, ರೂಟಿಂಗ್ ಮತ್ತು ತಜ್ಞ ಏಜೆಂಟ್ ಮೌಲ್ಯಮಾಪನಗಳನ್ನು ಶಕ್ತಿಯುತಗೊಳಿಸುತ್ತದೆ.",
    item2: "Gemini 2.5 Pro: ತನ್ನ ಆಳವಾದ ಯೋಜನೆ ಮತ್ತು ಸಂಕೀರ್ಣ ತಾರ್ಕಿಕ ಸಾಮರ್ಥ್ಯದಿಂದಾಗಿ ಅಂತಿಮ ನಿರ್ಧಾರ ಯೋಜನೆಗಳನ್ನು ಸಂಶ್ಲೇಷಿಸುತ್ತದೆ.",
    item3: "ಏಜೆಂಟ್ ಡೆವಲಪ್ಮೆಂಟ್ ಕಿಟ್ (ADK): ನಮ್ಮ ಏಜೆಂಟ್ ಮೆಶ್ ರಚನೆಯನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ.",
    item4: "GraphRAG (pgvector): ಬಳಕೆದಾರರ ಸಂದರ್ಭದಲ್ಲಿ ಏಜೆಂಟ್ ಪ್ರಶ್ನೆಗಳನ್ನು ಆಧಾರವಾಗಿರಿಸಲು ನೋಡ್‌ಗಳ ನಡುವಿನ ಸಂಪರ್ಕಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ ಮತ್ತು ಪ್ರಶ್ನಿಸುತ್ತದೆ.",
    flowTitle: "ಅರಿವಿನ ಪ್ರಕ್ರಿಯೆಯ ಹರಿವು",
    flow1: "1. ಸಿಗ್ನಲ್ ಇಂಜೆಷನ್",
    flow1Desc: "ಬಳಕೆದಾರರು ಫೈಲ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುತ್ತಾರೆ (ಆಡಿಯೊ ಟಿಪ್ಪಣಿ, ರಸೀದಿ, ಪರಿಶೀಲನಾ ಪಟ್ಟಿ) ಇವುಗಳನ್ನು GCS ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು Flash ಮೂಲಕ ಡೇಟಾಬೇಸ್‌ಗೆ ಪಾರ್ಸ್ ಮಾಡಲಾಗುತ್ತದೆ.",
    flow2: "2. ಸಮಾನಾಂತರ ತಜ್ಞರು",
    flow2Desc: "ಆರೋಗ್ಯ, ಮನಸ್ಸು, ಹಣಕาสು, ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಮತ್ತು ವೃತ್ತಿಪರ ಏಜೆಂಟ್‌ಗಳು ಸಕ್ರಿಯ ಬಳಕೆದಾರರ ನಿರ್ಬಂಧಗಳ ವಿರುದ್ಧ ಸಿಗ್ನಲ್ ಅನ್ನು ನಿರ್ಣยಿಸಲು ಏಕಕಾಲದಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಾರೆ.",
    flow3: "3. ಸಂಯೋಜಕರ ಸಂಶ್ಲೇಷಣೆ",
    flow3Desc: "ಸಂಯೋಜಕ ಏಜೆಂಟ್ ಎಲ್ಲಾ ವರದಿಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸುತ್ತಾರೆ, ಅಸಂಗತತೆಗಳನ್ನು ಪರಿಹರಿಸುತ್ತಾರೆ ಮತ್ತು ದೈನಂದิน ಯೋಜನೆಗಳನ್ನು BigQuery ಗೆ ಬರೆಯುತ್ತಾರೆ.",
  },
  te: {
    title: "ప్రాగ్మా లాజిక్స్ AI గురించి",
    desc: "ప్రాగ్మా లాజిక్స్ AI అనేది జెన్ AI APAC హ్యాక్2స్కిల్ హ్యాకథాన్ కోసం అభివృద్ధి చేయబడిన గ్రాఫ్-ఆధారిత, మల్టీ-ఏజెంట్ లైఫ్ డెసిషన్ OS.",
    archTitle: "నిర్మాణం",
    archDesc: "మా మల్టీ-ఏజెంట్ సిస్టమ్ ఎటువంటి రా API కీలు లేకుండా నేరుగా గూగుల్ వర్టెక్స్ AI మోడళ్లను ఉపయోగిస్తుంది, పూర్తిగా GCP సేవా ఖాతాలు మరియు అప్లికేషన్ డిఫాల్ట్ ఆధారాలపై ఆధారపడుతుంది.",
    item1: "Gemini 2.5 Flash: తన వేగం మరియు మల్టిమోడల్ సామర్థ్యం కారణంగా సిగ్నల్ సేకరణ, రూటింగ్ మరియు నిపుణుల ఏజెంట్ మూల్యాంకనాలను నిర్వహిస్తుంది.",
    item2: "Gemini 2.5 Pro: తన లోతైన ప్రణాళిక మరియు సంక్లిenc నిర్ణయాల విశ్లేషణ సామర్థ్యంతో తుది నిర్ణయ ప్రణాళికలను సంశ్లేషణ చేస్తుంది.",
    item3: "ఏజెంట్ డెవలప్‌మెంట్ కిట్ (ADK): మా ఏజెంట్ మెష్ నిర్మాణాన్ని సమన్వయం చేస్తుంది.",
    item4: "GraphRAG (pgvector): నోడ్ల మధ్య వ్యూహాత్మక కనెక్షన్లను నిల్వ చేస్తుంది మరియు క్వెరీ చేస్తుంది.",
    flowTitle: "నిర్ణయ ప్రక్రియ ప్రవాహం",
    flow1: "1. సిగ్నల్ సేకరణ",
    flow1Desc: "వినియోగదారు ఫైల్‌లను (వాయిస్ నోట్, రసీదు, చెక్‌లిస్ట్) అప్‌లోడ్ చేస్తారు, ఇవి GCS లో నిల్వ చేయబడి Flash ద్వారా డేటాబేస్‌లోకి పార్స్ చేయబడతాయి.",
    flow2: "2. సమాంతర నిపుణులు",
    flow2Desc: "ఆరోగ్యం, మనస్సు, ఆర్థికం, లాజిస్టిక్స్ మరియు వృత్తిపరమైన ఏజెంట్లు ఒకేసారి రన్ అవుతూ సిగ్నల్‌ను విశ్లేషిస్తాయి.",
    flow3: "3. కోఆర్డినేటర్ సంశ్లేషణ",
    flow3Desc: "కోఆర్డినేటర్ ఏజెంట్ అన్ని నివేదికలను కలిపి, అస్థిరతలను పరిష్కరించి, రోజువారీ ప్రణాళికలను బిగ్‌క్వెరీలోకి వ్రాస్తారు.",
  }
};

export default function AboutSection({ lang }: AboutSectionProps) {
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

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-teal)" }}>
          {tLocal.archTitle}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {tLocal.archDesc}
        </p>
        <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li>
            <strong>Gemini 2.5 Flash</strong>: {tLocal.item1.split(": ")[1]}
          </li>
          <li>
            <strong>Gemini 2.5 Pro</strong>: {tLocal.item2.split(": ")[1]}
          </li>
          <li>
            <strong>Agent Development Kit (ADK)</strong>: {tLocal.item3.split(": ")[1]}
          </li>
          <li>
            <strong>GraphRAG (pgvector)</strong>: {tLocal.item4.split(": ")[1]}
          </li>
        </ul>
      </div>

      <div className="card">
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
          {tLocal.flowTitle}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.85rem" }}>
          <div style={{ padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)" }}>
            <strong style={{ color: "var(--accent-rose)" }}>{tLocal.flow1}</strong>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>{tLocal.flow1Desc}</p>
          </div>
          <div style={{ padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)" }}>
            <strong style={{ color: "var(--accent-amber)" }}>{tLocal.flow2}</strong>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>{tLocal.flow2Desc}</p>
          </div>
          <div style={{ padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)" }}>
            <strong style={{ color: "var(--accent-teal)" }}>{tLocal.flow3}</strong>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>{tLocal.flow3Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
