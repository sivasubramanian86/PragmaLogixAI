/**
 * OutcomesView — decision template selector + journey plan results panel.
 * Extracted from page.tsx to reduce monolith size.
 */
"use client";

import React from "react";
import PlanSection from "../PlanSection";
import { JOURNEY_MAP, type Template } from "../../lib/templates";
import type { AgeGroup, Journey, PlanResult } from "../../lib/types";
import type { Strings } from "../../lib/translations";

interface OutcomesViewProps {
  t: Strings;
  lang: string;
  profile: AgeGroup;
  activeTab: number;
  setActiveTab: (i: number) => void;
  planResult: PlanResult | null;
  pipelineState: "idle" | "ingesting" | "running" | "done";
  isSimpleMode: boolean;
  isProcessing: boolean;
  templates: Template[];
  onSelectTemplate: (temp: Template) => void;
  onRefreshPlan: (journeyIdx: number) => void;
  errorMsg: string | null;
}

export default function OutcomesView({
  t,
  lang,
  profile,
  activeTab,
  setActiveTab,
  planResult,
  pipelineState,
  isSimpleMode,
  isProcessing,
  templates,
  onSelectTemplate,
  onRefreshPlan,
  errorMsg,
}: OutcomesViewProps) {
  const journeyTabs = [t.tomorrowPlan, t.frictionBudget, t.logisticsRadar];
  const profileLabel = t.profiles[profile];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "2rem", alignItems: "start" }}>
      {/* Left: Template Selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="card" style={{ borderLeft: "4px solid var(--accent-primary)" }}>
          <h2 style={{
            fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem",
            color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            💡 {t.decisionTemplates}
          </h2>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
            {t.templatesDesc}
          </p>

          {isProcessing && (
            <div style={{
              marginBottom: "1rem", padding: "0.6rem 0.9rem",
              borderRadius: "var(--radius-sm)", backgroundColor: "oklch(62% 0.22 240 / 0.1)",
              border: "1px solid var(--accent-primary)", fontSize: "0.78rem",
              color: "var(--accent-primary)", fontWeight: 600,
            }}>
              ⏳ {pipelineState === "running" ? "Running agent mesh..." : "Processing..."}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {templates.map((temp) => {
              const isActive =
                profile === temp.profile &&
                JOURNEY_MAP[activeTab] === temp.journey &&
                !!planResult;
              return (
                <button
                  key={temp.id}
                  onClick={() => onSelectTemplate(temp)}
                  className="card"
                  style={{
                    padding: "0.85rem",
                    textAlign: "left",
                    cursor: "pointer",
                    border: isActive ? "2px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                    backgroundColor: isActive ? "oklch(62% 0.22 240 / 0.1)" : "oklch(14% 0.025 260 / 0.4)",
                    transition: "all 0.15s ease",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <span style={{ fontSize: "1.4rem", marginTop: "0" }}>{temp.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <strong style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>{temp.title}</strong>
                    <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                      {t.profiles[temp.profile]} · {temp.journey}
                    </span>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "0.2rem", lineHeight: 1.3 }}>
                      {temp.query}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Journey Plan Output */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="card" style={{ borderLeft: "4px solid var(--accent-teal)" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h2 style={{
              fontSize: "1.1rem", fontWeight: 700, margin: 0,
              color: "var(--accent-teal)", textTransform: "uppercase", letterSpacing: "0.5px",
            }}>
              🎯 {t.journeyPlanOutcome}
            </h2>
            {planResult && (
              <span style={{ fontSize: "0.72rem", color: "var(--accent-teal)", fontWeight: 700 }}>
                ✓ {t.generatedFor} {profileLabel} ({JOURNEY_MAP[activeTab]})
              </span>
            )}
          </div>

          {/* Error banner */}
          {errorMsg && (
            <div role="alert" style={{
              marginBottom: "1rem", padding: "0.75rem",
              borderRadius: "var(--radius-sm)", backgroundColor: "oklch(65% 0.22 15 / 0.12)",
              border: "1px solid var(--accent-rose)", fontSize: "0.78rem", color: "var(--accent-rose)",
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Journey Tabs */}
          <div role="tablist" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            {journeyTabs.map((tab, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={activeTab === idx}
                onClick={() => {
                  setActiveTab(idx);
                  if (planResult) onRefreshPlan(idx);
                }}
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: "var(--radius-sm)",
                  border: activeTab === idx ? "1px solid var(--accent-teal)" : "1px solid var(--border-subtle)",
                  backgroundColor: activeTab === idx ? "oklch(68% 0.18 185 / 0.15)" : "transparent",
                  color: activeTab === idx ? "var(--accent-teal)" : "var(--text-secondary)",
                  fontWeight: activeTab === idx ? 700 : 400,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <PlanSection
            t={t}
            activeTab={activeTab}
            pipelineState={pipelineState}
            planResult={planResult}
            isSimpleMode={isSimpleMode}
            onSelectSuggestion={async () => {}}
          />
        </div>
      </div>
    </div>
  );
}
