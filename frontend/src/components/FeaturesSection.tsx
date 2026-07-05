import React from "react";

export default function FeaturesSection() {
  const features = [
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
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", animation: "fadeIn 0.3s ease" }}>
      
      {/* ── Capabilities Header ── */}
      <div>
        <h2 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
          System Capabilities
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          PragmaLogixAI operates on a multi-agent decision mesh, enabling autonomous cognitive assistance.
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
        {features.map((f, idx) => (
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
        Powered by Vertex AI · Gemini 2.5 Pro · Gemini 2.5 Flash-Lite · Imagen 3 · Cloud Run · BigQuery
      </div>

    </div>
  );
}
