import React from "react";

export default function HelpSection() {
  const steps = [
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
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", animation: "fadeIn 0.3s ease" }}>
      <div>
        <h2 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
          User Guide & Documentation
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Get started with PragmaLogixAI using our step-by-step pipeline onboarding guide.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        {steps.map((s, idx) => (
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
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Useful Commands</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          To verify or execute the test suite, you can run the following commands from your workspace terminal:
        </p>
        <pre style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>
          python -m pytest tests/ -v
        </pre>
      </div>
    </div>
  );
}
