import React from "react";

interface MetricDashboardProps {
  onSelectSuggestion: (query: string) => void;
  isSimpleMode: boolean;
}

export default function MetricDashboard({ onSelectSuggestion, isSimpleMode }: MetricDashboardProps) {
  const kpis = [
    {
      title: "Cognitive Clarity Index",
      value: "86%",
      change: "+4% this week",
      color: "var(--accent-teal)",
      icon: "🧠",
    },
    {
      title: "Daily Energy Score",
      value: "4.2 / 5",
      change: "Optimal levels",
      color: "var(--accent-primary)",
      icon: "⚡",
    },
    {
      title: "Audited Financial Leaks",
      value: "$14.99 / mo",
      change: "1 duplicate SaaS",
      color: "var(--accent-rose)",
      icon: "💸",
    },
    {
      title: "Routine Logistics Friction",
      value: "0 Backlogs",
      change: "All chores routed",
      color: "var(--accent-amber)",
      icon: "🏠",
    },
  ];

  const recentDecisions = [
    {
      time: "2 hrs ago",
      agent: "MindFocusAgent",
      action: "Delayed Deep Work block to 9:30 AM based on reported sleep fatigue",
      type: "focus",
    },
    {
      time: "4 hrs ago",
      agent: "FinanceAgent",
      action: "Flagged recurring duplicate trial charge for SaaS membership",
      type: "leak",
    },
    {
      time: "Yesterday",
      agent: "LogisticsAgent",
      action: "Scheduled filter maintenance check-in due to AC usage spike",
      type: "chores",
    },
  ];

  const templates = [
    "I have afternoon work fatigue. Optimise my deep work.",
    "Audited monthly subscription friction and check screen time leaks.",
    "Check home logistics and schedule routine household filter repairs.",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", animation: "fadeIn 0.3s ease" }}>
      
      {/* ── KPI Row ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.25rem"
      }}>
        {kpis.map((kpi, idx) => (
          <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {kpi.title}
              </span>
              <span style={{ fontSize: "1.2rem" }}>{kpi.icon}</span>
            </div>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: kpi.color, margin: "0.25rem 0" }}>
              {kpi.value}
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              {kpi.change}
            </span>
          </div>
        ))}
      </div>

      {/* ── Two Column Details ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", flexWrap: "wrap" }}>
        
        {/* Left Col: Knowledge Graph Status */}
        <div className="card">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-teal)", marginBottom: "1rem", textTransform: "uppercase" }}>
            Active Knowledge Graph
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifySelf: "stretch", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Tactical Entities (Nodes)</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>42 Ingested</span>
            </div>
            <div style={{ display: "flex", justifySelf: "stretch", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Monitored Relations (Edges)</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>89 Mapped</span>
            </div>
            <div style={{ display: "flex", justifySelf: "stretch", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>GraphRAG Grounding Latency</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-teal)" }}>14ms</span>
            </div>
          </div>
        </div>

        {/* Right Col: Recent Decisions Log */}
        <div className="card">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "1rem", textTransform: "uppercase" }}>
            Recent Decision Log
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {recentDecisions.map((log, idx) => (
              <div key={idx} style={{ padding: "0.6rem 0.8rem", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-canvas)", border: "1px solid var(--border-subtle)", fontSize: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                  <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{log.agent}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{log.time}</span>
                </div>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.3 }}>{log.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Decision Templates / Steppers ── */}
      <div className="card" style={{ border: "1px dashed oklch(62% 0.22 240 / 0.4)" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          What is confusing you right now?
        </h3>
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          Select a life decision template below to run a planning simulation immediately:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {templates.map((tpl, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSuggestion(tpl)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)",
                backgroundColor: "var(--bg-canvas)",
                color: "var(--text-primary)",
                fontSize: "0.8rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
            >
              💡 {tpl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
