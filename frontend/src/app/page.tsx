"use client";

import React, { useState, useCallback } from "react";
import AgentVisualizer from "../components/AgentVisualizer";
import UploadSection from "../components/UploadSection";
import PlanSection from "../components/PlanSection";
import FeaturesSection from "../components/FeaturesSection";
import AboutSection from "../components/AboutSection";
import FAQSection from "../components/FAQSection";
import HelpSection from "../components/HelpSection";
import SettingsSection from "../components/SettingsSection";
import { useTranslations } from "../lib/translations";
import { ingestSignal, plan } from "../lib/api";
import type { Language, AgeGroup, Journey, PlanResult, IngestResult } from "../lib/types";

type NavSection = "dashboard" | "features" | "about" | "faq" | "help" | "settings";

const JOURNEY_MAP: Record<number, Journey> = {
  0: "tomorrow",
  1: "month",
  2: "home",
};

export default function DashboardPage() {
  // Navigation Sections State
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");

  // Core Pipeline State
  const [lang, setLang] = useState<Language>("en");
  const [profile, setProfile] = useState<AgeGroup>("adult");
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineState, setPipelineState] = useState<"idle" | "ingesting" | "running" | "done">("idle");
  const [planResult, setPlanResult] = useState<PlanResult | null>(null);
  const [ingestResult, setIngestResult] = useState<IngestResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = useTranslations(lang);
  const isSimpleMode = profile === "senior" || profile === "student";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
    setErrorMsg(null);
  };

  const triggerPipeline = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    setErrorMsg(null);
    setPipelineState("ingesting");
    setPlanResult(null);
    setIngestResult(null);

    try {
      // Step 1: Ingest the file
      const ingested = await ingestSignal(file, `user_${profile}`);
      setIngestResult(ingested);
      setPipelineState("running");

      // Step 2: Call the active journey planner
      const journey = JOURNEY_MAP[activeTab];
      const planRes = await plan(journey, {
        user_id: `user_${profile}`,
        query: `Optimise my ${
          journey === "tomorrow"
            ? "day"
            : journey === "month"
            ? "month"
            : "home routine"
        } for ${profile} profile`,
        age_group: profile,
      });
      setPlanResult(planRes);
      setPipelineState("done");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setErrorMsg(msg);
      setPipelineState("idle");
    } finally {
      setIsProcessing(false);
    }
  }, [file, profile, activeTab]);

  const journeyTabs = [t.tomorrowPlan, t.frictionBudget, t.logisticsRadar];

  // Navigation Links configuration
  const navItems = [
    { id: "dashboard" as NavSection, label: t.nav.dashboard, icon: "💻" },
    { id: "features" as NavSection, label: t.nav.features, icon: "⚡" },
    { id: "about" as NavSection, label: t.nav.about, icon: "🧬" },
    { id: "faq" as NavSection, label: t.nav.faq, icon: "❓" },
    { id: "help" as NavSection, label: t.nav.help, icon: "📚" },
    { id: "settings" as NavSection, label: t.nav.settings, icon: "⚙️" },
  ];

  return (
    <main
      id="main"
      className="dashboard-grid"
      role="main"
      style={{ fontSize: isSimpleMode ? "1.1rem" : "1rem", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient background glows */}
      <div className="ambient-gradient-1" />
      <div className="ambient-gradient-2" />

      {/* ── Left Panel: Sidebar Navigation & Ingestion ───────────────── */}
      <aside
        className="sidebar card"
        style={{
          borderRadius: 0,
          borderRight: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          overflowY: "auto",
        }}
        aria-label="Navigation and Ingestion Settings"
      >
        <div>
          <h1
            className="brand-title"
            style={{
              fontSize: isSimpleMode ? "2rem" : "var(--text-xl)",
              marginBottom: "0.25rem",
              background: "linear-gradient(135deg, var(--text-primary), var(--accent-primary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "1.5rem",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Global Navigation Panel */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            borderBottom: "1px solid var(--border-subtle)",
            paddingBottom: "1.5rem",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
                padding: "0.6rem 0.8rem",
                borderRadius: "var(--radius-sm)",
                border: "none",
                backgroundColor: activeNav === item.id ? "oklch(62% 0.22 240 / 0.15)" : "transparent",
                color: activeNav === item.id ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: activeNav === item.id ? 700 : 500,
                fontSize: isSimpleMode ? "1.05rem" : "0.85rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Signal Ingestion Panel (only displayed contextually on Dashboard section for cleaner user layout) */}
        {activeNav === "dashboard" ? (
          <UploadSection
            t={t}
            profile={profile}
            setProfile={setProfile}
            lang={lang}
            setLang={setLang}
            handleFileUpload={handleFileUpload}
            triggerPipeline={triggerPipeline}
            file={file}
            isProcessing={isProcessing}
            errorMsg={errorMsg}
            ingestResult={ingestResult}
            isSimpleMode={isSimpleMode}
          />
        ) : (
          <div style={{ marginTop: "auto", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
            PragmaLogixAI Decision OS
          </div>
        )}
      </aside>

      {/* ── Center Panel: Main Contents ────────────────────────────────── */}
      <section
        style={{ padding: "2rem", overflowY: "auto" }}
        aria-label="Workspace Center"
      >
        {activeNav === "dashboard" && (
          <>
            {/* Journey tab navigation */}
            <div
              role="tablist"
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              {journeyTabs.map((tab, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={activeTab === idx}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border:
                      activeTab === idx
                        ? "1px solid var(--accent-primary)"
                        : "1px solid var(--border-subtle)",
                    backgroundColor:
                      activeTab === idx
                        ? "oklch(62% 0.22 240 / 0.15)"
                        : "transparent",
                    color:
                      activeTab === idx
                        ? "var(--accent-primary)"
                        : "var(--text-secondary)",
                    fontWeight: activeTab === idx ? 700 : 400,
                    fontSize: "0.85rem",
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
              onSelectSuggestion={async (query: string) => {
                // Route to correct journey tab
                let journey: Journey = "tomorrow";
                if (query.toLowerCase().includes("subscription") || query.toLowerCase().includes("friction")) {
                  setActiveTab(1);
                  journey = "month";
                } else if (query.toLowerCase().includes("logistics") || query.toLowerCase().includes("home") || query.toLowerCase().includes("routine")) {
                  setActiveTab(2);
                  journey = "home";
                } else {
                  setActiveTab(0);
                  journey = "tomorrow";
                }

                // Run the real pipeline
                setIsProcessing(true);
                setErrorMsg(null);
                setPipelineState("running");
                setPlanResult(null);

                try {
                  const planRes = await plan(journey, {
                    user_id: `user_${profile}`,
                    query,
                    age_group: profile,
                  });
                  setPlanResult(planRes);
                  setPipelineState("done");
                } catch (err: unknown) {
                  const msg = err instanceof Error ? err.message : "Unknown error";
                  setErrorMsg(msg);
                  setPipelineState("idle");
                } finally {
                  setIsProcessing(false);
                }
              }}
            />
          </>
        )}

        {activeNav === "features" && <FeaturesSection />}
        {activeNav === "about" && <AboutSection />}
        {activeNav === "faq" && <FAQSection />}
        {activeNav === "help" && <HelpSection />}
        {activeNav === "settings" && <SettingsSection />}
      </section>

      {/* ── Right Panel: ADK Agent Mesh Visualizer ──────────────────────── */}
      <aside
        className="right-panel card"
        style={{ borderRadius: 0, borderLeft: "1px solid var(--border-subtle)" }}
        aria-label="Agent Mesh Topology"
      >
        <h2
          style={{
            fontSize: "var(--text-sm)",
            marginBottom: "1.5rem",
            fontWeight: 700,
          }}
        >
          Agent Mesh Pipeline
        </h2>
        <AgentVisualizer state={pipelineState} />
      </aside>
    </main>
  );
}
