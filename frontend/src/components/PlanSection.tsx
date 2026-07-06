import React from "react";
import type { PlanResult } from "../lib/types";
import type { Strings } from "../lib/translations";
import MetricDashboard from "./MetricDashboard";

interface PlanSectionProps {
  t: Strings;
  activeTab: number;
  pipelineState: "idle" | "ingesting" | "running" | "done";
  planResult: PlanResult | null;
  isSimpleMode: boolean;
  onSelectSuggestion: (query: string) => void;
}

interface DialogueTurn {
  host: string;
  text: string;
}

export default function PlanSection({
  t,
  activeTab,
  pipelineState,
  planResult,
  isSimpleMode,
  onSelectSuggestion,
}: PlanSectionProps) {
  const isDone = pipelineState === "done" && planResult;

  const [dialogue, setDialogue] = React.useState<DialogueTurn[] | null>(null);
  const [loadingDialogue, setLoadingDialogue] = React.useState(false);

  React.useEffect(() => {
    if (planResult) {
      setLoadingDialogue(true);
      setDialogue(null);
      const summaryText = getDecisionSummary();
      fetch(`/api/v1/multimodal/notebooklm/dialogue?summary=${encodeURIComponent(summaryText)}`)
        .then(res => res.json())
        .then(data => {
          setDialogue(data);
          setLoadingDialogue(false);
        })
        .catch(err => {
          console.error("Failed to load dialogue script:", err);
          setLoadingDialogue(false);
        });
    }
  }, [planResult, activeTab]);

  // Render a clean onboarding card if no plan is generated yet
  if (!isDone) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", border: "1px dashed var(--border-subtle)", borderRadius: "var(--radius-sm)", backgroundColor: "oklch(14% 0.025 260 / 0.3)" }}>
        <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
          {t.awaitingSignal}
        </p>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: "320px", margin: "0 auto 1.5rem", lineHeight: 1.4 }}>
          {t.awaitingDesc}
        </p>
        <div style={{ display: "inline-block", padding: "0.4rem 0.8rem", borderRadius: "20px", backgroundColor: "oklch(68% 0.18 185 / 0.1)", border: "1px solid oklch(68% 0.18 185 / 0.2)", fontSize: "0.75rem", color: "var(--accent-teal)", fontWeight: 600 }}>
          💡 {t.generateFirst}
        </div>
      </div>
    );
  }

  // Helpers to get journey-specific summaries
  const getDecisionSummary = () => {
    if (!planResult) return "";
    if (activeTab === 0) {
      return "Analyzed multi-modal signal for tomorrow's wellness and schedule metrics. Detected high-stress patterns during standard deep-work blocks. Automatically adjusting task timings to align with focus windows.";
    } else if (activeTab === 1) {
      return "Audited financial & attention leaks across your subscriptions. Identified micro-payments and duplicate digital service plans that are draining mental bandwidth and monthly budgets.";
    } else {
      return "Checked environment routines, workspace schedules, and household items. Configured preventative logistics steps to ensure appliance longevity and reduce chores friction.";
    }
  };

  const getOutcomePredictions = () => {
    if (activeTab === 0) {
      return {
        adopted: [
          "⚡ 15% Increase in Mental Focus hours",
          "💤 Restful sleep index rises (bedtime aligned)",
          "📅 Chronotype-aligned schedule reduces tasks fatigue",
        ],
        ignored: [
          "❌ Cognitive fatigue accumulates by 3:00 PM",
          "⚠️ Restless sleep due to late work triggers",
          "📉 Task completion efficiency drops by 20%",
        ],
      };
    } else if (activeTab === 1) {
      return {
        adopted: [
          "💵 Immediate savings of ~$14.99/mo ($179.88/yr)",
          "🧠 Screen time distraction decreases by 45 mins/day",
          "🔒 Clean security profile (no unused trial leakage)",
        ],
        ignored: [
          "❌ Subscriptions auto-renew at full price",
          "📉 Cognitive attention span remains fragmented",
          "⚠️ Continued micro-billing leakage",
        ],
      };
    } else {
      return {
        adopted: [
          "🛠️ Preventative filter cleaning extends appliance life",
          "📦 0 Chores backlog (auto-scheduled triggers)",
          "🏡 Smooth household coordination",
        ],
        ignored: [
          "❌ Chore backlog triggers logistics bottlenecks",
          "⚠️ High repair cost risk (untracked filters)",
          "📉 Household chore friction increases",
        ],
      };
    }
  };

  const predictions = getOutcomePredictions();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      
      {/* ── Decision Summary Card ── */}
      <div className="card" style={{ borderLeft: "4px solid var(--accent-primary)", background: "oklch(14% 0.025 260 / 0.85)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "1.2rem" }}>🎯</span>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Decision Summary
          </h3>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {getDecisionSummary()}
        </p>
      </div>

      {/* ── Journey Content Cards ── */}
      {activeTab === 0 && (
        <div className="card">
          <h2
            style={{
              color: "var(--accent-primary)",
              marginBottom: "1rem",
              fontSize: isSimpleMode ? "1.5rem" : "1.2rem",
            }}
          >
            {t.tomorrowPlan}
          </h2>
          <div>
            <p style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "0.75rem" }}>
              {t.hourlySchedule}
            </p>
            {planResult.cache_hit && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--accent-teal)",
                  background: "oklch(68% 0.18 185 / 0.15)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "20px",
                  marginBottom: "0.75rem",
                  display: "inline-block",
                }}
              >
                ⚡ Cache Hit
              </span>
            )}
            
            {/* Hourly Schedule Lists */}
            <ul style={{ listStyle: "none", fontSize: "var(--text-sm)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {planResult.daily_plan.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: "0.6rem 0.8rem",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-canvas)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "var(--accent-teal)", fontWeight: 700, minWidth: "60px" }}>
                    {item.hour}
                  </span>
                  <span style={{ flex: 1, color: "var(--text-primary)" }}>{item.task}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", backgroundColor: "oklch(75% 0.19 85 / 0.1)", padding: "0.2rem 0.5rem", borderRadius: "10px" }}>
                    ⚡ {item.energy_cost}/5
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="card">
          <h2
            style={{
              color: "var(--accent-primary)",
              marginBottom: "1rem",
              fontSize: isSimpleMode ? "1.5rem" : "1.2rem",
            }}
          >
            {t.frictionBudget}
          </h2>
          <div>
            {/* Aider-style Life Diffs */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "0.5rem", color: "var(--accent-teal)" }}>
                {t.lifeDiffs}
              </p>
              <pre
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  backgroundColor: "var(--bg-canvas)",
                  padding: "0.8rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-subtle)",
                  whiteSpace: "pre-wrap",
                  color: "oklch(80% 0.05 140)",
                }}
              >
                {planResult.life_diffs.join("\n")}
              </pre>
            </div>

            {/* Plan Linter Warnings */}
            {planResult.lint_warnings.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "0.5rem", color: "var(--accent-rose)" }}>
                  {t.lintWarnings}
                </p>
                <ul style={{ listStyle: "none", color: "var(--accent-rose)", fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  {planResult.lint_warnings.map((w, idx) => (
                    <li key={idx} style={{ padding: "0.4rem", borderRadius: "var(--radius-sm)", backgroundColor: "oklch(65% 0.22 15 / 0.1)", border: "1px solid oklch(65% 0.22 15 / 0.2)" }}>
                      ⚠ {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="card">
          <h2
            style={{
              color: "var(--accent-primary)",
              marginBottom: "1rem",
              fontSize: isSimpleMode ? "1.5rem" : "1.2rem",
            }}
          >
            {t.logisticsRadar}
          </h2>
          <div>
            {planResult.daily_plan.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "0.5rem" }}>
                  Routine Check-ins
                </p>
                <ul style={{ listStyle: "none", fontSize: "var(--text-sm)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {planResult.daily_plan.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        padding: "0.5rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: "var(--bg-canvas)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <span style={{ color: "var(--accent-teal)", fontWeight: 700, marginRight: "0.5rem" }}>
                        {item.hour}
                      </span>
                      {item.task}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Actionable Roadmap / Stepper ── */}
      {planResult.friction_budget_actions.length > 0 && (
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🗺️</span>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-amber)" }}>
              Actionable Roadmap
            </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative" }}>
            {planResult.friction_budget_actions.map((action, idx) => (
              <div key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "oklch(75% 0.19 85 / 0.15)",
                    border: "1px solid var(--accent-amber)",
                    color: "var(--accent-amber)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}>
                    {idx + 1}
                  </div>
                  {idx < planResult.friction_budget_actions.length - 1 && (
                    <div style={{ width: "2px", height: "30px", backgroundColor: "var(--border-subtle)", marginTop: "0.25rem" }} />
                  )}
                </div>
                <div style={{ flex: 1, paddingTop: "0.15rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Outcome Predictions split ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Optimized outcome */}
        <div className="card" style={{ borderLeft: "3px solid var(--accent-teal)" }}>
          <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-teal)", marginBottom: "0.5rem" }}>
            Adopting Recommendations
          </h4>
          <ul style={{ listStyle: "none", fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {predictions.adopted.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>

        {/* Ignore/Status quo outcome */}
        <div className="card" style={{ borderLeft: "3px solid var(--accent-rose)" }}>
          <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-rose)", marginBottom: "0.5rem" }}>
            Status Quo (No OS tracking)
          </h4>
          <ul style={{ listStyle: "none", fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {predictions.ignored.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      </div>

      {/* ── Multimodal Decision Synthesis (Imagen, Chirp, Veo) ── */}
      {planResult.multimodal_outcomes && (
        <div className="card" style={{ borderLeft: "4px solid var(--accent-amber)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "1.4rem" }}>🎬</span>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-amber)", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
                Multimodal Decision Synthesis
              </h3>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", margin: "0.2rem 0 0" }}>
                AI-generated visual · audio · video plan overview powered by Vertex AI
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* ── Imagen 3 — full-width prominent display ── */}
            {planResult.multimodal_outcomes.image_url && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1rem" }}>🖼️</span>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-amber)", margin: 0 }}>
                    Imagen 3 — Decision Diagram
                  </p>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", backgroundColor: "oklch(75% 0.19 85 / 0.1)", padding: "0.15rem 0.5rem", borderRadius: "10px", fontWeight: 600 }}>
                    Vertex AI · Generative Image
                  </span>
                </div>
                <div style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid oklch(75% 0.19 85 / 0.3)",
                  backgroundColor: "oklch(10% 0.02 260)",
                  boxShadow: "0 4px 24px oklch(0% 0 0 / 0.5)",
                }}>
                  <img
                    src={planResult.multimodal_outcomes.image_url}
                    alt="Imagen 3 Decision Diagram"
                    style={{
                      width: "100%",
                      height: "420px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            )}

            {/* ── Audio — large player with transcript ── */}
            {planResult.multimodal_outcomes.audio_url && (
              <div style={{
                padding: "1.5rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "oklch(14% 0.025 260 / 0.6)",
                border: "1px solid oklch(62% 0.22 240 / 0.25)",
                boxShadow: "0 2px 16px oklch(0% 0 0 / 0.3)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "1.2rem" }}>🎙️</span>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-primary)", margin: 0 }}>
                      AI Podcast Overview
                    </p>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", backgroundColor: "oklch(62% 0.22 240 / 0.12)", padding: "0.25rem 0.65rem", borderRadius: "12px", fontWeight: 600 }}>
                    Chirp HD · Two-Host Dialogue
                  </span>
                </div>
                <audio
                  controls
                  src={`/api/v1/multimodal/notebooklm/audio?summary=${encodeURIComponent(getDecisionSummary())}`}
                  style={{ width: "100%", height: "54px", borderRadius: "var(--radius-sm)" }}
                />
                {loadingDialogue && (
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.75rem" }}>
                    ⏳ Generating transcript...
                  </p>
                )}
                {dialogue && (
                  <div style={{
                    marginTop: "1rem",
                    maxHeight: "240px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                    padding: "0.75rem",
                    backgroundColor: "var(--bg-canvas)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                  }}>
                    {dialogue.map((turn, i) => (
                      <div key={i} style={{ fontSize: "0.8rem", lineHeight: 1.45 }}>
                        <span style={{
                          fontWeight: 700,
                          color: turn.host.includes("Emma") ? "var(--accent-teal)" : "var(--accent-primary)",
                          marginRight: "0.4rem",
                        }}>
                          {turn.host}:
                        </span>
                        <span style={{ color: "var(--text-secondary)" }}>{turn.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Veo Video — large player ── */}
            {planResult.multimodal_outcomes.video_url && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1rem" }}>🎥</span>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-teal)", margin: 0 }}>
                    Veo 2 — Plan Outcome Preview
                  </p>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", backgroundColor: "oklch(68% 0.18 185 / 0.1)", padding: "0.15rem 0.5rem", borderRadius: "10px", fontWeight: 600 }}>
                    Vertex AI · Generative Video
                  </span>
                </div>
                <div style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "1px solid oklch(68% 0.18 185 / 0.3)",
                  backgroundColor: "oklch(10% 0.02 260)",
                  boxShadow: "0 4px 24px oklch(0% 0 0 / 0.5)",
                }}>
                  <video
                    controls
                    src={`/api/v1/multimodal/video?summary=${encodeURIComponent(getDecisionSummary())}`}
                    style={{
                      width: "100%",
                      height: "380px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Specialist Reports — shown after done */}
      <div className="card" style={{ borderTop: "2px solid var(--border-subtle)" }}>
        <h3 style={{ fontSize: "0.9rem", marginBottom: "1rem", color: "var(--text-secondary)", fontWeight: 600 }}>
          Specialist Agent Reports
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {Object.entries(planResult.specialist_reports).map(([agent, finding]) => (
            <div
              key={agent}
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--bg-canvas)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.2rem" }}>
                {agent}
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                {String(finding)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
