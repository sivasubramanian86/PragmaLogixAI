import React, { useState } from "react";

export default function SettingsSection() {
  const [mockMode, setMockMode] = useState(true);
  const [apiLatency, setApiLatency] = useState(300);
  const [theme, setTheme] = useState("dark-glass");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", animation: "fadeIn 0.3s ease" }}>
      <div>
        <h2 style={{ color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
          Settings & Sandbox Controls
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Adjust local configuration parameters, styling variables, and agent latency.
        </p>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>
          Agent Execution Settings
        </h3>

        {/* Mock Mode Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <strong style={{ fontSize: "0.9rem" }}>Graceful Fallback Mode</strong>
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
              Falls back to local plan generation if Vertex AI API is unavailable.
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
            {mockMode ? "ENABLED (Sandbox)" : "DISABLED (Live LLM)"}
          </button>
        </div>

        {/* API Latency Slider */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <strong style={{ fontSize: "0.9rem" }}>Mock Delay</strong>
            <span style={{ fontSize: "0.8rem", color: "var(--accent-primary)", fontWeight: 700 }}>
              {apiLatency}ms
            </span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Simulates network roundtrip times for background agent steps.
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
          UI Theme Settings
        </h3>

        {/* Theme presets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <strong style={{ fontSize: "0.9rem" }}>Glassmorphism Intensity</strong>
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
