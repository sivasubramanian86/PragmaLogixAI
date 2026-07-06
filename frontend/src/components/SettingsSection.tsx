import React, { useState } from "react";
import type { Language } from "../lib/types";

interface SettingsSectionProps {
  lang: Language;
}

const localT: Record<string, any> = {
  en: {
    title: "Settings & Sandbox Controls",
    desc: "Adjust local configuration parameters, styling variables, and agent latency.",
    execTitle: "Agent Execution Settings",
    fallbackMode: "Graceful Fallback Mode",
    fallbackDesc: "Falls back to local plan generation if Vertex AI API is unavailable.",
    mockDelay: "Mock Delay",
    mockDelayDesc: "Simulates network roundtrip times for background agent steps.",
    themeTitle: "UI Theme Settings",
    glassmorphism: "Glassmorphism Intensity",
    enabled: "ENABLED (Sandbox)",
    disabled: "DISABLED (Live LLM)"
  },
  es: {
    title: "Ajustes y Controles de Sandbox",
    desc: "Ajuste los parámetros de configuración local, variables de estilo y latencia del agente.",
    execTitle: "Configuración de Ejecución del Agente",
    fallbackMode: "Modo de Respaldo Gradual",
    fallbackDesc: "Recurre a la generación de planes locales si la API de Vertex AI no está disponible.",
    mockDelay: "Retraso de Simulación",
    mockDelayDesc: "Simula tiempos de ida y vuelta de red para los pasos del agente en segundo plano.",
    themeTitle: "Configuración del Tema de la Interfaz",
    glassmorphism: "Intensidad del Vidrio Esmerilado",
    enabled: "HABILITADO (Sandbox)",
    disabled: "DESHABILITADO (LLM en Vivo)"
  },
  hi: {
    title: "सेटिंग्स और सैंडबॉक्स नियंत्रण",
    desc: "स्थानीय कॉन्फ़िगरेशन पैरामीटर, स्टाइलिंग चर और एजेंट विलंबता को समायोजित करें.",
    execTitle: "एजेंट निष्पादन सेटिंग्स",
    fallbackMode: "सद्भावना फॉलबैक मोड",
    fallbackDesc: "यदि Vertex AI API अनुपलब्ध है तो स्थानीय योजना निर्माण पर वापस जाता है.",
    mockDelay: "मॉक देरी",
    mockDelayDesc: "पृष्ठभूमि एजेंट चरणों के लिए नेटवर्क राउंडट्रिप समय का अनुकरण करता है.",
    themeTitle: "यूआई थीम सेटिंग्स",
    glassmorphism: "ग्लासमॉर्फिज्म तीव्रता",
    enabled: "सक्षम (सैंडबॉक्स)",
    disabled: "अक्षम (लाइव एलएलएम)"
  },
  ta: {
    title: "அமைப்புகள் & சாண்ட்பாக்ஸ் கட்டுப்பாடுகள்",
    desc: "உள்ளூர் உள்ளமைப்பு அளவுருக்கள், பாணி மாறிகள் மற்றும் முகவர் தாமதத்தை சரிசெய்யவும்.",
    execTitle: "முகவர் செயலாக்க அமைப்புகள்",
    fallbackMode: "மாற்று பயன்முறை",
    fallbackDesc: "வெர்டெக்ஸ் ஏஐ ஏபிஐ கிடைக்கவில்லை என்றால் உள்ளூர் திட்ட உருவாக்கத்திற்குத் திரும்பும்.",
    mockDelay: "போலி தாமதம்",
    mockDelayDesc: "முகவர் படிகளுக்கான பிணைய தாமதத்தை உருவகப்படுத்துகிறது.",
    themeTitle: "தீம் அமைப்புகள்",
    glassmorphism: "கண்ணாடி விளைவு தீவிரம்",
    enabled: "இயக்கப்பட்டது (சாண்ட்பாக்ஸ்)",
    disabled: "முடக்கப்பட்டது (நேரடி எல்எல்எம்)"
  },
  kn: {
    title: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್ ನಿಯಂತ್ರಣಗಳು",
    desc: "ಸ್ಥಳೀಯ ಸಂರಚನಾ ನಿಯತಾಂಕಗಳನ್ನು, ಶೈಲಿ ವೇರಿಯೇಬಲ್‌ಗಳನ್ನು ಮತ್ತು ಏಜೆಂಟ್ ವಿಳಂಬವನ್ನು ಹೊಂದಿಸಿ.",
    execTitle: "ಏಜೆಂಟ್ ಮರಣದಂಡನೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    fallbackMode: "ಫಾಲ್‌ಬ್ಯಾಕ್ ಮೋಡ್",
    fallbackDesc: "ವರ್ಟೆಕ್ಸ್ ಎಐ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ ಸ್ಥಳೀಯ ಯೋಜನಾ ಉತ್ಪಾದನೆಗೆ ಮರಳುತ್ತದೆ.",
    mockDelay: "ವಿಳಂಬ ಸಮಯ",
    mockDelayDesc: "ಏಜೆಂಟ್ ಹಂತಗಳಿಗಾಗಿ ನೆಟ್‌ವರ್ಕ್ ಸಮಯವನ್ನು ಅನುಕರಿಸುತ್ತದೆ.",
    themeTitle: "ಯುಐ ಥೀಮ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    glassmorphism: "ಗ್ಲಾಸ್ಮಾರ್ಫಿಸಮ್ ತೀವ್ರತೆ",
    enabled: "ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ (ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್)",
    disabled: "ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ (ಲೈವ್ ಎಲ್‌ಎಲ್‌ಎಂ)"
  },
  te: {
    title: "సెట్టింగులు & శాండ్‌బాక్స్ నియంత్రణలు",
    desc: "స్థానిక కాన్ఫిగరేషన్ పారామితులు, స్టైలింగ్ వేరియబుల్స్ మరియు ఏజెంట్ ఆలస్యాన్ని సర్దుబాటు చేయండి.",
    execTitle: "ఏజెంట్ రన్ సెట్టింగులు",
    fallbackMode: "ఫాల్‌బ్యాక్ మోడ్",
    fallbackDesc: "వర్టెక్స్ AI అందుబాటులో లేకపోతే లోకల్ ప్లాన్ సృష్టికి మళ్లుతుంది.",
    mockDelay: "మాక్ ఆలస్యం",
    mockDelayDesc: "నెట్‌వర్క్ ఆలస్యాన్ని అనుకరిస్తుంది.",
    themeTitle: "థీమ్ సెట్టింగులు",
    glassmorphism: "గ్లాస్మార్ఫిజం తీవ్రత",
    enabled: "ప్రారంభించబడింది (శాండ్‌బాక్స్)",
    disabled: "నిలిపివేయబడింది (లైవ్ LLM)"
  }
};

export default function SettingsSection({ lang }: SettingsSectionProps) {
  const [mockMode, setMockMode] = useState(true);
  const [apiLatency, setApiLatency] = useState(300);
  const [theme, setTheme] = useState("dark-glass");

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

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>
          {tLocal.execTitle}
        </h3>

        {/* Mock Mode Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong style={{ fontSize: "0.9rem" }}>{tLocal.fallbackMode}</strong>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
              {tLocal.fallbackDesc}
            </p>
          </div>
          <button
            onClick={() => setMockMode(!mockMode)}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "20px",
              border: "1px solid var(--border-subtle)",
              backgroundColor: mockMode ? "oklch(68% 0.18 185 / 0.15)" : "transparent",
              color: mockMode ? "var(--accent-teal)" : "var(--text-secondary)",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {mockMode ? tLocal.enabled : tLocal.disabled}
          </button>
        </div>

        {/* API Latency Slider */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <strong style={{ fontSize: "0.9rem" }}>{tLocal.mockDelay}</strong>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 700 }}>
              {apiLatency}ms
            </span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            {tLocal.mockDelayDesc}
          </p>
          <input
            type="range"
            min="50"
            max="1500"
            step="50"
            value={apiLatency}
            onChange={(e) => setApiLatency(Number(e.target.value))}
            style={{ width: "100%", cursor: "pointer", accentColor: "var(--accent-primary)" }}
          />
        </div>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>
          {tLocal.themeTitle}
        </h3>

        {/* Theme presets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <strong style={{ fontSize: "0.9rem" }}>{tLocal.glassmorphism}</strong>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["none", "light-glass", "dark-glass"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "var(--radius-sm)",
                  border: theme === t ? "1px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                  backgroundColor: theme === t ? "oklch(62% 0.22 240 / 0.15)" : "transparent",
                  color: theme === t ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
