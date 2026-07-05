import React from "react";

export default function AboutSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", animation: "fadeIn 0.3s ease" }}>
      <div>
        <h2 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
          About PragmaLogixAI
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          PragmaLogixAI is a graph-based, multi-agent Life Decision OS developed for the Gen AI APAC Hack2Skill Hackathon.
        </p>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--accent-teal)" }}>
          The Architecture
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          Our multi-agent system uses Google Vertex AI models directly without raw API keys, relying entirely on GCP Service Accounts and Application Default Credentials.
        </p>
        <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li>
            <strong>Gemini 2.5 Flash-Lite</strong>: Powers signal ingestion, routing, and specialist agent evaluations due to its speed and multimodal capability.
          </li>
          <li>
            <strong>Gemini 2.5 Pro</strong>: Synthesizes final decision plans due to its deep planning and complex reasoning capability.
          </li>
          <li>
            <strong>Agent Development Kit (ADK)</strong>: Orchestrates our agent mesh mesh structure.
          </li>
          <li>
            <strong>GraphRAG (pgvector)</strong>: Stores and queries tactical connections between nodes to ground agent queries in real user context.
          </li>
        </ul>
      </div>

      <div className="card">
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>
          Cognitive Process Flow
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.85rem" }}>
          <div style={{ padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)" }}>
            <strong style={{ color: "var(--accent-rose)" }}>1. Signal Ingestion</strong>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>User uploads files (audio note, receipt, checklist) which are stored in GCS and parsed by Flash-Lite into the database.</p>
          </div>
          <div style={{ padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)" }}>
            <strong style={{ color: "var(--accent-amber)" }}>2. Parallel Specialists</strong>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>Health, Mind, Finance, Logistics, and Professional agents run concurrently to assess the signal against active user constraints.</p>
          </div>
          <div style={{ padding: "0.75rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)" }}>
            <strong style={{ color: "var(--accent-teal)" }}>3. Coordinator Synthesis</strong>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>The Coordinator Agent combines all reports, resolves inconsistencies, and writes daily plans and friction updates back to BigQuery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
