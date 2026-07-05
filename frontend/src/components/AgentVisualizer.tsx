import React, { useState, useEffect } from "react";

interface AgentVisualizerProps {
  state: "idle" | "ingesting" | "running" | "done";
}

interface AgentNode {
  id: string;
  name: string;
  role: string;
  icon: string;
}

export default function AgentVisualizer({ state }: AgentVisualizerProps) {
  const [logs, setLogs] = useState<string[]>([]);

  const agents: AgentNode[] = [
    { id: "health", name: "Health & Energy", role: "Wellness Monitor", icon: "🩺" },
    { id: "mind", name: "Mind & Focus", role: "Attention Audit", icon: "🧠" },
    { id: "finance", name: "Finance & Work", role: "Leak Inspector", icon: "💸" },
    { id: "logistics", name: "Logistics & Home", role: "Routine Check", icon: "🏠" },
    { id: "career", name: "Professional & Career", role: "Path Alignment", icon: "💼" },
  ];

  // Simulated ADK Agent Mesh communication log
  useEffect(() => {
    if (state === "idle") {
      setLogs(["[Mesh] Status: IDLE. Waiting for Life Signal..."]);
    } else if (state === "ingesting") {
      setLogs([
        "[Ingestion] Parsing unstructured multimodal data...",
        "[GCS] Staging input assets to secure cloud store...",
        "[GraphRAG] Extracting semantic entities (Nodes & Edges)...",
      ]);
    } else if (state === "running") {
      const messages = [
        "[ADK] Spawning Specialist Agent Mesh...",
        "[HealthAgent] Analyzing sleep cycles & circadian wellness...",
        "[MindAgent] Auditing cognitive fatigue thresholds...",
        "[FinanceAgent] Scanning database for duplicate sub leaks...",
        "[LogisticsAgent] Checking domestic repair schedules...",
        "[CareerAgent] Checking professional focus slots...",
        "[ADK] Dispatching findings to Central Coordinator...",
      ];
      setLogs(messages);
    } else if (state === "done") {
      setLogs([
        "[Coordinator] Compiling reports...",
        "[Linter] Validating energy budgets (Total cost: 7/9)...",
        "[Conflict Resolution] Resolved Fatigue vs. Meeting timing conflict.",
        "[BigQuery] Appended structured telemetry event log.",
        "[Mesh] Pipeline execution successful. 200 OK.",
      ]);
    }
  }, [state]);

  const getAgentStatusColor = (agentId: string) => {
    if (state === "idle") return "var(--text-muted)";
    if (state === "ingesting") return "var(--text-muted)";
    if (state === "running") {
      // Rotate active highlights
      return "var(--accent-primary)";
    }
    if (state === "done") return "var(--accent-teal)";
    return "var(--text-muted)";
  };

  const getAgentPulseClass = () => {
    return state === "running" ? "pulse-ring" : "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", height: "100%", justifyContent: "space-between" }}>
      
      {/* ── Visual Mesh Node Graph ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        
        {/* Central Coordinator Node */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <div className="card" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${state === "done" ? "var(--accent-teal)" : state === "running" ? "var(--accent-primary)" : "var(--border-subtle)"}`,
            backgroundColor: "oklch(14% 0.025 260 / 0.9)",
            boxShadow: state === "running" ? "0 0 15px oklch(62% 0.22 240 / 0.25)" : "none",
            width: "180px",
            zIndex: 2,
          }}>
            <span style={{ fontSize: "1.5rem", marginBottom: "0.25rem", animation: state === "running" ? "pulse 1.5s infinite" : "none" }}>👑</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>Coordinator Agent</span>
            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>ADK Synthesis Core</span>
          </div>
        </div>

        {/* Outer Specialist Nodes Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.6rem" }}>
          {agents.map((agent) => (
            <div
              key={agent.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "oklch(14% 0.025 260 / 0.5)",
                border: `1px solid ${getAgentStatusColor(agent.id) === "var(--text-muted)" ? "var(--border-subtle)" : getAgentStatusColor(agent.id)}`,
                transition: "all 0.25s ease",
              }}
            >
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-canvas)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                position: "relative"
              }}>
                {agent.icon}
                {state === "running" && (
                  <span className="pulse-ring-element" />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700 }}>{agent.name}</p>
                <p style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{agent.role}</p>
              </div>
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: getAgentStatusColor(agent.id),
                boxShadow: getAgentStatusColor(agent.id) !== "var(--text-muted)" ? `0 0 8px ${getAgentStatusColor(agent.id)}` : "none"
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Active ADK Console Log ── */}
      <div className="card" style={{
        backgroundColor: "var(--bg-canvas)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "0.75rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        color: "oklch(75% 0.08 185)",
        height: "140px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
      }}>
        {logs.map((log, idx) => (
          <div key={idx} style={{
            lineHeight: 1.3,
            color: log.startsWith("[Mesh]") ? "var(--accent-teal)" : log.startsWith("[Coordinator]") ? "var(--accent-primary)" : log.startsWith("[Linter]") ? "var(--accent-rose)" : "oklch(75% 0.08 185)"
          }}>
            {log}
          </div>
        ))}
      </div>

      {/* Inline styles for pulse animations */}
      <style jsx>{`
        .pulse-ring-element {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px solid var(--accent-primary);
          animation: pulse 1.5s infinite;
          pointer-events: none;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

    </div>
  );
}
