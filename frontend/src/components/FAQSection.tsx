import React, { useState } from "react";

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

export default function FAQSection() {
  const faqs = [
    {
      question: "How does the system ensure data security and compliance?",
      answer: "PragmaLogixAI does not accept or require raw API keys. It runs inside Google Cloud Run and accesses Vertex AI and Google Cloud Storage via identity-based Application Default Credentials (ADC) and IAM policies. This completely eliminates credential leakage vectors.",
    },
    {
      question: "What is the Plan Consistency Linter?",
      answer: "The Coordinator agent has a deterministic linter that validates the synthesized plans. For example, it sums up the total energy cost of tasks planned for students/retirees. If the sum exceeds a preset threshold (e.g. 9), it triggers warnings indicating the plan violates user limits.",
    },
    {
      question: "How does GraphRAG enrich decision making?",
      answer: "When a user uploads a new life signal, the system queries a local PostgreSQL/pgvector database using embeddings (via text-embedding-004) to find related nodes. This context is injected directly into the LLM prompt, ensuring recommendations are grounded in user-specific constraints.",
    },
    {
      question: "Is there a fallback plan if Vertex AI becomes unavailable?",
      answer: "Yes. PragmaLogixAI implements a multi-tier fallback architecture. If the LLM call fails, the coordinator uses a deterministic 3×3 matrix mapping the requested Decision Journey (Tomorrow, Month, Home) against the user's Age Group (Student, Adult, Senior) to return valid default suggestions.",
    },
    {
      question: "What file types can I upload?",
      answer: "We support multimodal ingestion. You can upload text logs, image receipts, audio clips (like voice memos), or video clips. The system automatically categorizes files and stages them using Cloud Storage before evaluation.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", animation: "fadeIn 0.3s ease" }}>
      <div>
        <h2 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Everything you need to know about PragmaLogixAI's features and architecture.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {faqs.map((faq, idx) => (
          <FAQAccordionItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
