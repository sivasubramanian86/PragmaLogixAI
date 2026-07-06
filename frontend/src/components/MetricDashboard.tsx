import React from "react";
import type { Strings } from "../lib/translations";

interface MetricDashboardProps {
  onSelectSuggestion: (query: string) => void;
  isSimpleMode: boolean;
  t: Strings;
}

// Static values that are always numeric/English (agent names, benchmark values)
const STATIC_KPI_VALUES   = ["86%", "4.2 / 5", "$14.99 / mo", "0 Backlogs"];
const STATIC_KPI_CHANGES  = ["+4% this week", "Optimal levels", "1 duplicate SaaS", "All chores routed"];
const STATIC_KPI_ICONS    = ["🧠", "⚡", "💸", "🏠"];
const STATIC_KPI_COLORS   = [
  "var(--accent-teal)",
  "var(--accent-primary)",
  "var(--accent-rose)",
  "var(--accent-amber)",
];
const GRAPH_STATIC = { nodesVal: "42 Ingested", edgesVal: "89 Mapped", latencyVal: "14ms" };
const LOG_STATIC = {
  times:    ["2 hrs ago", "4 hrs ago", "Yesterday"],
  agents:   ["MindFocusAgent", "FinanceAgent", "LogisticsAgent"],
  messages: [
    "Delayed Deep Work block to 9:30 AM based on reported sleep fatigue",
    "Flagged recurring duplicate trial charge for SaaS membership",
    "Scheduled filter maintenance check-in due to AC usage spike",
  ],
};

export default function MetricDashboard({ onSelectSuggestion, isSimpleMode, t }: MetricDashboardProps) {
  const kpiTitles = [t.cognitiveClarity, t.dailyEnergy, t.financialLeaks, t.routineFriction];
  const kpis = kpiTitles.map((title, i) => ({
    title,
    value:  STATIC_KPI_VALUES[i],
    change: STATIC_KPI_CHANGES[i],
    color:  STATIC_KPI_COLORS[i],
    icon:   STATIC_KPI_ICONS[i],
  }));

  const recentDecisions = LOG_STATIC.agents.map((agent, i) => ({
    time:   LOG_STATIC.times[i],
    agent,
    action: LOG_STATIC.messages[i],
  }));

  const templates = [t.tpl1, t.tpl2, t.tpl3];

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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

        {/* Left: Knowledge Graph */}
        <div className="card">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-teal)", marginBottom: "1rem", textTransform: "uppercase" }}>
            {t.activeKnowledgeGraph}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{t.tacticalNodes}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{GRAPH_STATIC.nodesVal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{t.monitoredEdges}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{GRAPH_STATIC.edgesVal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{t.graphRAGLatency}</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-teal)" }}>{GRAPH_STATIC.latencyVal}</span>
            </div>
          </div>
        </div>

        {/* Right: Recent Decision Log */}
        <div className="card">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "1rem", textTransform: "uppercase" }}>
            {t.recentDecisionLog}
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

      {/* ── Decision Templates ── */}
      <div className="card" style={{ border: "1px dashed oklch(62% 0.22 240 / 0.4)" }}>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          {t.confusingYou}
        </h3>
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
          {t.selectTemplate}
        </p>
        {!isSimpleMode && (
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
        )}
        {isSimpleMode && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {templates.map((tpl, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSuggestion(tpl)}
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  borderRadius: "var(--radius-sm)",
                  border: "2px solid var(--border-subtle)",
                  backgroundColor: "var(--bg-canvas)",
                  color: "var(--text-primary)",
                  fontSize: "1rem",
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
        )}
      </div>
    </div>
  );
}
