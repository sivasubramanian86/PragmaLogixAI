import React, { useState } from "react";
import type { Language } from "../lib/types";

interface FAQSectionProps {
  lang: Language;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQAccordionItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="card"
      style={{
        cursor: "pointer",
        padding: "1rem 1.25rem",
        border: "1px solid var(--border-subtle)",
        transition: "all 0.15s ease",
        transform: "none",
        backgroundColor: isOpen ? "oklch(14% 0.025 260 / 0.95)" : "oklch(14% 0.025 260 / 0.5)",
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: isOpen ? "var(--accent-primary)" : "var(--text-primary)" }}>
          {question}
        </h3>
        <span style={{ fontSize: "1.2rem", color: "var(--text-muted)", transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "none" }}>
          ＋
        </span>
      </div>
      {isOpen && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem", animation: "slideDown 0.2s ease" }}>
          {answer}
        </p>
      )}
    </div>
  );
}

const localT: Record<string, any> = {
  en: {
    title: "Frequently Asked Questions",
    desc: "Everything you need to know about PragmaLogixAI's features and architecture.",
    faqs: [
      {
        question: "How does the system ensure data security and compliance?",
        answer: "PragmaLogixAI does not accept or require raw API keys. It runs inside Google Cloud Run and accesses Vertex AI and Google Cloud Storage via identity-based Application Default Credentials (ADC) and IAM policies. This completely eliminates credential leakage vectors."
      },
      {
        question: "What is the Plan Consistency Linter?",
        answer: "The Coordinator agent has a deterministic linter that validates the synthesized plans. For example, it sums up the total energy cost of tasks planned for students/retirees. If the sum exceeds a preset threshold (e.g. 9), it triggers warnings indicating the plan violates user limits."
      },
      {
        question: "How does GraphRAG enrich decision making?",
        answer: "When a user uploads a new life signal, the system queries a local PostgreSQL/pgvector database using embeddings (via text-embedding-004) to find related nodes. This context is injected directly into the LLM prompt, ensuring recommendations are grounded in user-specific constraints."
      },
      {
        question: "Is there a fallback plan if Vertex AI becomes unavailable?",
        answer: "Yes. PragmaLogixAI implements a multi-tier fallback architecture. If the LLM call fails, the coordinator uses a deterministic 3×3 matrix mapping the requested Decision Journey (Tomorrow, Month, Home) against the user's Age Group (Student, Adult, Senior) to return valid default suggestions."
      },
      {
        question: "What file types can I upload?",
        answer: "We support multimodal ingestion. You can upload text logs, image receipts, audio clips (like voice memos), or video clips. The system automatically categorizes files and stages them using Cloud Storage before evaluation."
      }
    ]
  },
  es: {
    title: "Preguntas Frecuentes",
    desc: "Todo lo que necesitas saber sobre las características y la arquitectura de PragmaLogixAI.",
    faqs: [
      {
        question: "¿Cómo garantiza el sistema la seguridad y el cumplimiento de los datos?",
        answer: "PragmaLogixAI no acepta ni requiere claves API sin procesar. Se ejecuta dentro de Google Cloud Run y accede a Vertex AI y Google Cloud Storage a través de credenciales predeterminadas de aplicación (ADC) basadas en identidad y políticas de IAM. Esto elimina por completo los vectores de fuga de credenciales."
      },
      {
        question: "¿Qué es el Linter de Consistencia del Plan?",
        answer: "El agente Coordinador tiene un linter determinista que valida los planes sintetizados. Por ejemplo, suma el costo total de energía de las tareas planificadas para estudiantes/jubilados. Si la suma supera un umbral preestablecido (ej. 9), activa advertencias que indican que el plan viola los límites del usuario."
      },
      {
        question: "¿Cómo enriquece GraphRAG la toma de decisiones?",
        answer: "Cuando un usuario sube una nueva señal de vida, el sistema consulta una base de datos local PostgreSQL/pgvector utilizando incrustaciones (a través de text-embedding-004) para encontrar nodos relacionados. Este contexto se inyecta directamente en la consulta del LLM, asegurando que las recomendaciones estén basadas en las limitaciones del usuario."
      },
      {
        question: "¿Existe un plan de respaldo si Vertex AI no está disponible?",
        answer: "Sí. PragmaLogixAI implementa una arquitectura de respaldo de múltiples niveles. Si la llamada al LLM falla, el coordinador utiliza una matriz determinista de 3×3 que mapea la Jornada de Decisión solicitada contra el grupo de edad del usuario para devolver sugerencias válidas por defecto."
      },
      {
        question: "¿Qué tipos de archivos puedo subir?",
        answer: "Soportamos ingesta multimodal. Puedes subir notas de texto, recibos de imágenes, clips de audio (como notas de voz) o clips de video. El sistema categoriza automáticamente los archivos y los almacena en Cloud Storage antes de la evaluación."
      }
    ]
  },
  hi: {
    title: "अक्सर पूछे जाने वाले प्रश्न",
    desc: "प्राग्मालोगिक्स एआई की विशेषताओं और वास्तुकला के बारे में सब कुछ जो आपको जानना आवश्यक है.",
    faqs: [
      {
        question: "सिस्टम डेटा सुरक्षा और अनुपालन कैसे सुनिश्चित करता है?",
        answer: "प्राग्मालोगिक्स एआई कच्चे एपीआई कुंजी को स्वीकार या आवश्यकता नहीं करता है. यह Google Cloud Run के अंदर चलता है और पहचान-आधारित एप्लिकेशन डिफॉल्ट क्रेडेंशियल्स (ADC) और IAM नीतियों के माध्यम से Vertex AI और Google Cloud Storage तक पहुँचता है. यह क्रेडेंशियल रिसाव वैक्टर को पूरी तरह से समाप्त करता है."
      },
      {
        question: "योजना संगति लिंटर क्या है?",
        answer: "समन्वयक एजेंट के पास एक नियतात्मक लिंटर होता है जो संश्लेषित योजनाओं को मान्य करता है. उदाहरण के लिए, यह छात्रों/सेवानिवृत्त लोगों के लिए नियोजित कार्यों की कुल ऊर्जा लागत का योग करता है. यदि योग पूर्व-निर्धारित सीमा (जैसे 9) से अधिक हो जाता है, तो यह चेतावनी देता है कि योजना उपयोगकर्ता सीमाओं का उल्लंघन करती है."
      },
      {
        question: "GraphRAG निर्णय लेने को कैसे समृद्ध करता है?",
        answer: "जब कोई उपयोगकर्ता एक नया जीवन संकेत अपलोड करता है, तो सिस्टम संबंधित नोड्स को खोजने के लिए एम्बेडिंग (text-embedding-004 के माध्यम से) का उपयोग करके एक स्थानीय PostgreSQL/pgvector डेटाबेस से क्वेरी करता है. यह संदर्भ सीधे एलएलएम प्रॉम्प्ट में इंजेक्ट किया जाता है, यह सुनिश्चित करते हुए कि सिफारिशें उपयोगकर्ता की विशिष्ट बाधाओं पर आधारित हैं."
      },
      {
        question: "यदि Vertex AI अनुपलब्ध हो जाता है तो क्या कोई वैकल्पिक योजना है?",
        answer: "हाँ. प्राग्मालोगिक्स एआई एक बहु-स्तरीय फॉलबैक आर्किटेक्चर लागू करता है. यदि एलएलएम कॉल विफल हो जाती है, तो समन्वयक उपयोगकर्ता के आयु समूह के विरुद्ध अनुरोधित निर्णय यात्रा को मैप करने के लिए एक नियतात्मक 3×3 मैट्रिक्स का उपयोग करता है ताकि मान्य डिफ़ॉल्ट सुझाव लौटाए जा सकें."
      },
      {
        question: "मैं किस प्रकार की फाइलें अपलोड कर सकता हूँ?",
        answer: "हम मल्टीमॉडल अंतर्ग्रहण का समर्थन करते हैं. आप पाठ नोट्स, छवि रसीदें, ऑडियो क्लिप (जैसे वॉयस मेमो), या वीडियो क्लिप अपलोड कर सकते हैं. सिस्टम मूल्यांकन से पहले फाइलों को स्वचालित रूप से वर्गीकृत करता है और क्लाउड स्टोरेज का उपयोग करके उन्हें चरणबद्ध करता है."
      }
    ]
  },
  ta: {
    title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    desc: "பிராக்மாலோஜிக்ஸ் ஏஐ அம்சங்கள் மற்றும் கட்டமைப்பு பற்றி நீங்கள் தெரிந்து கொள்ள வேண்டிய அனைத்தும்.",
    faqs: [
      {
        question: "கணினி தரவு பாதுகாப்பு மற்றும் இணக்கத்தை எவ்வாறு உறுதி செய்கிறது?",
        answer: "பிராக்மாலோஜிக்ஸ் ஏஐ மூல ஏபிஐ விசைகளை ஏற்காது அல்லது தேவைப்படாது. இது கூகிள் கிளவுட் ரன்னிற்குள் இயங்குகிறது மற்றும் அடையாள அடிப்படையிலான பயன்பாட்டு இயல்புநிலை சான்றுகள் (ADC) மற்றும் IAM கொள்கைகள் மூலம் வெர்டெக்ஸ் ஏஐ மற்றும் கூகிள் கிளவுட் ஸ்டோரேஜை அணுகுகிறது. இது சான்றுகள் கசிவு திசையன்களை முற்றிலுமாக நீக்குகிறது."
      },
      {
        question: "திட்ட நிலைத்தன்மை லிண்டர் என்றால் என்ன?",
        answer: "ஒருங்கிணைப்பாளர் முகவர் ஒரு திட்டவட்டமான லிண்டரைக் கொண்டுள்ளார், அது ஒருங்கிணைக்கப்பட்ட திட்டங்களை சரிபார்க்கிறது. உதாரணமாக, இது மாணவர்கள்/ஓய்வு பெற்றவர்களுக்கு திட்டமிடப்பட்ட பணிகளின் மொத்த ஆற்றல் செலவை கூட்டுகிறது. கூட்டு முன்னமைக்கப்பட்ட வரம்பை (எ.கா. 9) தாண்டினால், திட்டம் பயனர் வரம்புகளை மீறுகிறது என்பதைக் குறிக்கும் எச்சரிக்கைகளைத் தூண்டுகிறது."
      },
      {
        question: "GraphRAG எவ்வாறு முடிவெடுப்பதை மேம்படுத்துகிறது?",
        answer: "ஒரு பயனர் புதிய வாழ்க்கை சமிக்ஞையைப் பதிவேற்றும்போது, தொடர்புடைய முனையங்களைக் கண்டறிய உட்பொதிவுகளைப் பயன்படுத்தி உள்ளூர் போஸ்ட்கிரெஸ்கியூஎல்/பிஜிவெக்டர் தரவுத்தளத்தை வினவுகிறது. இந்த சூழல் நேரடியாக எல்எல்எம் வரியில் செலுத்தப்படுகிறது, இது பரிந்துரைகள் பயனர் குறிப்பிட்ட வரம்புகளில் அமைந்திருப்பதை உறுதி செய்கிறது."
      },
      {
        question: "வெர்டெக்ஸ் ஏஐ கிடைக்கவில்லை என்றால் ஏதேனும் மாற்று திட்டம் உள்ளதா?",
        answer: "ஆம். பிராக்மாலோஜிக்ஸ் ஏஐ பல அடுக்கு மாற்று கட்டமைப்பை செயல்படுத்துகிறது. எல்எல்எம் அழைப்பு தோல்வியுற்றால், செல்லுபடியாகும் இயல்புநிலை பரிந்துரைகளை வழங்க, பயனரின் வயதுக் குழுவிற்கு எதிரான முடிவெடுக்கும் பயணத்தை வரைபடமாக்கும் ஒரு திட்டவட்டமான 3×3 மேட்ரிக்ஸை ஒருங்கிணைப்பாளர் பயன்படுத்துகிறார்."
      },
      {
        question: "நான் என்ன கோப்பு வகைகளைப் பதிவேற்றலாம்?",
        answer: "நாங்கள் பன்முக உட்கொள்ளலை ஆதரிக்கிறோம். நீங்கள் உரை குறிப்புகள், பட ரசீதுகள், ஆடியோ கிளிப்புகள் அல்லது வீடியோ கிளிப்புகளைப் பதிவேற்றலாம். மதிப்பீட்டிற்கு முன் கிளவுட் ஸ்டோரேஜைப் பயன்படுத்தி கணினி தானாகவே கோப்புகளை வகைப்படுத்தி நிலைநிறுத்துகிறது."
      }
    ]
  },
  kn: {
    title: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    desc: "ಪ್ರಾಗ್ಮಾಲಾಜಿಕ್ಸ್ ಎಐ ವೈಶಿಷ್ಟ್ಯಗಳು ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪದ ಬಗ್ಗೆ ನೀವು ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ ಎಲ್ಲವೂ.",
    faqs: [
      {
        question: "ಸಿಸ್ಟಮ್ ಡೇಟಾ ಸುರಕ್ಷತೆ ಮತ್ತು ಅನುಸರಣೆಯನ್ನು ಹೇಗೆ ಖಚಿತಪಡಿಸುತ್ತದೆ?",
        answer: "ಪ್ರಾಗ್ಮಾಲಾಜಿಕ್ಸ್ ಎಐ ಕಚ್ಚಾ ಎಪಿಐ ಕೀಗಳನ್ನು ಸ್ವೀಕರಿಸುವುದಿಲ್ಲ ಅಥವಾ ಅಗತ್ಯವಿರುವುದಿಲ್ಲ. ಇದು ಗೂಗಲ್ ಕ್ಲೌಡ್ ರನ್ ಒಳಗಡೆ ರನ್ ಆಗುತ್ತದೆ ಮತ್ತು ಗುರುತು-ಆಧಾರಿತ ಅಪ್ಲಿಕೇಶನ್ ಡೀಫಾಲ್ಟ್ ರುಜುವಾತುಗಳು (ADC) ಮತ್ತು IAM ನೀತಿಗಳ ಮೂಲಕ ವರ್ಟೆಕ್ಸ್ ಎಐ ಮತ್ತು ಗೂಗಲ್ ಕ್ಲೌಡ್ ಸ್ಟೋರೇಜ್ ಅನ್ನು ಪ್ರವೇಶಿಸುತ್ತದೆ."
      },
      {
        question: "ಯೋಜನಾ ಸ್ಥಿರತೆ ಲಿಂಟರ್ ಎಂದರೇನು?",
        answer: "ಸಂಯೋಜಕ ಏಜೆಂಟ್ ಸಂಶ್ಲೇಷಿತ ಯೋಜನೆಗಳನ್ನು ಮೌಲ್ಯೀಕರಿಸುವ ಲಿಂಟರ್ ಅನ್ನು ಹೊಂದಿರುತ್ತಾರೆ. ಉದಾಹರಣೆಗೆ, ವಿದ್ಯಾರ್ಥಿಗಳು/ನಿವೃತ್ತರಿಗಾಗಿ ಯೋಜಿಸಲಾದ ಕಾರ್ಯಗಳ ಒಟ್ಟು ಶಕ್ತಿಯ ವೆಚ್ಚವನ್ನು ಇದು ಒಟ್ಟುಗೂಡಿಸುತ್ತದೆ. ಒಟ್ಟು ಮೊತ್ತವು ಮೊದಲೇ ಹೊಂದಿಸಲಾದ ಮಿತಿಯನ್ನು (ಉದಾ. 9) ಮೀರಿದರೆ, ಯೋಜನೆ ಬಳಕೆದಾರರ ಮಿತಿಗಳನ್ನು ಉಲ್ಲಂಘಿಸುತ್ತದೆ ಎಂದು ಎಚ್ಚರಿಸುತ್ತದೆ."
      },
      {
        question: "GraphRAG ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವಿಕೆಯನ್ನು ಹೇಗೆ ಸಮೃದ್ಧಗೊಳಿಸುತ್ತದೆ?",
        answer: "ಬಳಕೆದಾರರು ಹೊಸ ಜೀವನ ಸಂಕೇತವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದಾಗ, ಸಂಬಂಧಿತ ನೋಡ್‌ಗಳನ್ನು ಹುಡುಕಲು ಎಂಬೆಡಿಂಗ್‌ಗಳನ್ನು ಬಳಸಿಕೊಂಡು ಸ್ಥಳೀಯ PostgreSQL/pgvector ಡೇಟಾಬೇಸ್ ಅನ್ನು ಸಿಸ್ಟಮ್ ಪ್ರಶ್ನಿಸುತ್ತದೆ. ಈ ಸಂದರ್ಭವನ್ನು ನೇರವಾಗಿ ಎಲ್‌ಎಲ್‌ಎಂ ಪ್ರಾಂಪ್ಟ್‌ಗೆ ಸೇರಿಸಲಾಗುತ್ತದೆ, ಶಿಫಾರಸುಗಳು ಬಳಕೆದಾರರ ನಿರ್ಬಂಧಗಳನ್ನು ಆಧರಿಸಿವೆ ಎಂದು ಖಚಿತಪಡಿಸುತ್ತದೆ."
      },
      {
        question: "ವರ್ಟೆಕ್ಸ್ ಎಐ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ ಪರ್ಯಾಯ ಯೋಜನೆ ಇದೆಯೇ?",
        answer: "ಹೌದು. ಪ್ರಾಗ್ಮಾಲಾಜಿಕ್ಸ್ ಎಐ ಬಹು-ಹಂತದ ಫಾಲ್‌ಬ್ಯಾಕ್ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ಜಾರಿಗೆ ತರುತ್ತದೆ. ಎಲ್‌ಎಲ್‌ಎಂ ಕರೆ ವಿಫಲವಾದರೆ, ಮಾನ್ಯವಾದ ಡೀಫಾಲ್ಟ್ ಸಲಹೆಗಳನ್ನು ನೀಡಲು ಬಳಕೆದಾರರ ವಯಸ್ಸಿನ ಗುಂಪಿನ ವಿರುದ್ಧ ವಿನಂತಿಸಿದ ನಿರ್ಧಾರದ ಪ್ರಯಾಣವನ್ನು ಮ್ಯಾಪ್ ಮಾಡಲು ಸಂಯೋಜಕರು 3×3 ಮ್ಯಾಟ್ರಿಕ್ಸ್ ಬಳಸುತ್ತಾರೆ."
      },
      {
        question: "ನಾನು ಯಾವ ಫೈಲ್ ಪ್ರಕಾರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬಹುದು?",
        answer: "ನಾವು ಮಲ್ಟಿಮೋಡಲ್ ಇಂಜೆಷನ್ ಅನ್ನು ಬೆಂಬಲಿಸುತ್ತೇವೆ. ನೀವು ಪಠ್ಯ ಟಿಪ್ಪಣಿಗಳು, ಚಿತ್ರ ರಸೀದಿಗಳು, ಆಡಿಯೊ ಕ್ಲಿಪ್‌ಗಳು ಅಥವಾ ವೀಡಿಯೊ ಕ್ಲಿಪ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಬಹುದು. ಮೌಲ್ಯಮಾಪನಕ್ಕೆ ಮೊದಲು ಕ್ಲೌಡ್ ಸ್ಟೋರೇಜ್ ಬಳಸಿ ಸಿಸ್ಟಮ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಫೈಲ್‌ಗಳನ್ನು ವರ್ಗೀಕರಿಸುತ್ತದೆ."
      }
    ]
  },
  te: {
    title: "తరచుగా అడిగే ప్రశ్నలు",
    desc: "ప్రాగ్మా లాజిక్స్ AI యొక్క లక్షణాలు మరియు నిర్మాణం గురించి మీరు తెలుసుకోవలసిన ప్రతిదీ.",
    faqs: [
      {
        question: "సిస్టమ్ డేటా భద్రత మరియు సమ్మతిని ఎలా నిర్ధారిస్తుంది?",
        answer: "ప్రాగ్మా లాజిక్స్ AI రా API కీలను అంగీకరించదు. ఇది గూగుల్ క్లౌడ్ రన్ లోపల రన్ అవుతుంది మరియు ఐడెంటిటీ-ఆధారిత అప్లికేషన్ డిఫాల్ట్ ఆధారాలు (ADC) మరియు IAM విధానాల ద్వారా వర్టెక్స్ AI మరియు గూగుల్ క్లೌడ్ స్టోరేజ్ ను యాక్సెస్ చేస్తుంది."
      },
      {
        question: "ప్లాన్ కన్సిస్టెన్సీ లింటర్ అంటే ఏమిటి?",
        answer: "కోఆర్డినేటర్ ఏజెంట్ ప్లాన్‌లను ధృవీకరించే లింటర్ కలిగి ఉంటారు. ఉదాహరణకు, విద్యార్థులు/రిటైర్డ్ వ్యక్తుల కోసం ప్రణాళిక చేసిన పనుల యొక్క మొత్తం శక్తి వ్యయాన్ని ఇది కూడుతుంది. మొత్తం పరిమితి (ఉదా. 9) మించితే, అది హెచ్చరికలను జారీ చేస్తుంది."
      },
      {
        question: "GraphRAG నిర్ణయాధికారాన్ని ఎలా మెరుగుపరుస్తుంది?",
        answer: "వినియోగదారు కొత్త జీవిత సంకేతాన్ని అప్‌లోడ్ చేసినప్పుడు, సంబంధిత నోడ్‌లను కనుగొనడానికి ఎంబెడ్డింగ్‌లను ఉపయోగించి లోకల్ PostgreSQL/pgvector డేటాబేస్‌ను సిస్టమ్ క్వెరీ చేస్తుంది. ఈ సందర్భం నేరుగా LLM ప్రాంప్ట్ లోకి చేర్చబడుతుంది."
      },
      {
        question: "వర్టెక్స్ AI అందుబాటులో లేకపోతే ప్రత్యామ్నాయ ప్రణాళిక ఉందా?",
        answer: "అవును. ప్రాగ్మా లాజిక్స్ AI బహుళ-స్థాయి ఫాల్‌బ్యాక్ నిర్మాణాన్ని అమలు చేస్తుంది. ఒకవేళ LLM కాల్ విఫలమైతే, కోఆర్డినేటర్ చెల్లుబాటు అయ్యే డిఫాల్ట్ సూచనలను అందించడానికి 3×3 మ్యాట్రిక్స్ ను ఉపయోగిస్తారు."
      },
      {
        question: "నేను ఏ రకమైన ఫైల్‌లను అప్‌లోడ్ చేయవచ్చు?",
        answer: "మేము మల్టిమోడల్ ఇంగెషన్ ను సపోర్ట్ చేస్తాము. మీరు టెక్స్ట్ నోట్స్, ఇమేజ్ రసీదులు, ఆడియో క్లిప్‌లు లేదా వీడియో క్లిప్‌లను అప్‌లోడ్ చేయవచ్చు. సిస్టమ్ స్వయంచాలకంగా ఫైల్‌లను క్లೌడ్ స్టోరేజ్ ఉపయోగించి వర్గీకరిస్తుంది."
      }
    ]
  }
};

export default function FAQSection({ lang }: FAQSectionProps) {
  const activeLang = localT[lang] ? lang : "en";
  const tLocal = localT[activeLang];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", animation: "fadeIn 0.3s ease" }}>
      <div>
        <h2 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
          {tLocal.title}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          {tLocal.desc}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {tLocal.faqs.map((faq: any, idx: number) => (
          <FAQAccordionItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
