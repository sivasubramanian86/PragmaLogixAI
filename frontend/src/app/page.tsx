"use client";

import React, { useState, useCallback } from "react";
import AppSidebar from "../components/AppSidebar";
import AgentVisualizer from "../components/AgentVisualizer";
import MetricDashboard from "../components/MetricDashboard";
import GeneratePlanView from "../components/views/GeneratePlanView";
import OutcomesView from "../components/views/OutcomesView";
import FeaturesSection from "../components/FeaturesSection";
import AboutSection from "../components/AboutSection";
import FAQSection from "../components/FAQSection";
import HelpSection from "../components/HelpSection";
import SettingsSection from "../components/SettingsSection";
import { useTranslations } from "../lib/translations";
import { ingestSignal, plan } from "../lib/api";
import { TEMPLATES, JOURNEY_MAP } from "../lib/templates";
import type { Language, AgeGroup, Journey, PlanResult, IngestResult } from "../lib/types";

type NavSection = "dashboard" | "generate_plan" | "outcomes" | "features" | "about" | "faq" | "help" | "settings";

// ── Page ───────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  // Global state
  const [lang, setLang] = useState<Language>("en");
  const [profile, setProfile] = useState<AgeGroup>("adult");
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");
  const [activeTab, setActiveTab] = useState<number>(0);

  // Pipeline state
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineState, setPipelineState] = useState<"idle" | "ingesting" | "running" | "done">("idle");
  const [planResult, setPlanResult] = useState<PlanResult | null>(null);
  const [ingestResult, setIngestResult] = useState<IngestResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = useTranslations(lang);
  const isSimpleMode = profile === "senior" || profile === "student";

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
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
      const ingested = await ingestSignal(file, `user_${profile}`);
      setIngestResult(ingested);
      setPipelineState("running");

      const journey = JOURNEY_MAP[activeTab];
      const planRes = await plan(journey, {
        user_id: `user_${profile}`,
        query: `Optimise my ${journey === "tomorrow" ? "day" : journey === "month" ? "month" : "home routine"} for ${profile} profile`,
        age_group: profile,
      });
      setPlanResult(planRes);
      setPipelineState("done");
      setActiveNav("outcomes");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setPipelineState("idle");
    } finally {
      setIsProcessing(false);
    }
  }, [file, profile, activeTab]);

  const handleSelectTemplate = useCallback(async (temp: typeof TEMPLATES[0]) => {
    setProfile(temp.profile);
    const journeyIdx = temp.journey === "tomorrow" ? 0 : temp.journey === "month" ? 1 : 2;
    setActiveTab(journeyIdx);
    setIsProcessing(true);
    setErrorMsg(null);
    setPipelineState("running");
    setPlanResult(null);

    try {
      const planRes = await plan(temp.journey, {
        user_id: `user_${temp.profile}`,
        query: temp.query,
        age_group: temp.profile,
      });
      setPlanResult(planRes);
      setPipelineState("done");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setPipelineState("idle");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleRefreshPlan = useCallback(async (journeyIdx: number) => {
    const journey = JOURNEY_MAP[journeyIdx];
    const matching = TEMPLATES.find((tmp) => tmp.profile === profile && tmp.journey === journey);
    const query = matching ? matching.query : `Optimize ${journey} plan for ${profile} profile`;
    setIsProcessing(true);
    setErrorMsg(null);
    setPipelineState("running");

    try {
      const planRes = await plan(journey, { user_id: `user_${profile}`, query, age_group: profile });
      setPlanResult(planRes);
      setPipelineState("done");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setPipelineState("idle");
    } finally {
      setIsProcessing(false);
    }
  }, [profile]);

  const handleDashboardSuggestion = useCallback(async (query: string) => {
    setActiveNav("outcomes");
    let journey: Journey = "tomorrow";
    if (query.toLowerCase().includes("subscription") || query.toLowerCase().includes("friction")) {
      setActiveTab(1); journey = "month";
    } else if (query.toLowerCase().includes("logistics") || query.toLowerCase().includes("home") || query.toLowerCase().includes("routine")) {
      setActiveTab(2); journey = "home";
    } else {
      setActiveTab(0); journey = "tomorrow";
    }
    setIsProcessing(true);
    setErrorMsg(null);
    setPipelineState("running");
    setPlanResult(null);

    try {
      const planRes = await plan(journey, { user_id: `user_${profile}`, query, age_group: profile });
      setPlanResult(planRes);
      setPipelineState("done");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setPipelineState("idle");
    } finally {
      setIsProcessing(false);
    }
  }, [profile]);

  // ── Section title ─────────────────────────────────────────────────────────

  const sectionTitle = (() => {
    if (activeNav === "dashboard")     return t.systemDashboard;
    if (activeNav === "generate_plan") return t.generatePlan;
    if (activeNav === "outcomes")      return t.journeyPlanOutcome;
    return t.nav[activeNav as keyof typeof t.nav] ?? activeNav;
  })();

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <main
      id="main"
      className="dashboard-grid"
      role="main"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Ambient glows */}
      <div className="ambient-gradient-1" />
      <div className="ambient-gradient-2" />

      {/* Left Sidebar */}
      <AppSidebar
        t={t}
        lang={lang}
        setLang={setLang}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        profile={profile}
        pipelineState={pipelineState}
      />

      {/* Center Workspace */}
      <section
        style={{ padding: "2rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}
        aria-label="Workspace Center"
      >
        {/* Section Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingBottom: "1rem", borderBottom: "1px solid var(--border-subtle)",
        }}>
          <h2 style={{
            fontSize: "var(--text-md)", fontWeight: 700, margin: 0,
            color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.5px",
          }}>
            {sectionTitle}
          </h2>
        </div>

        {/* Views */}
        {activeNav === "dashboard" && (
          <MetricDashboard
            isSimpleMode={isSimpleMode}
            t={t}
            onSelectSuggestion={handleDashboardSuggestion}
          />
        )}

        {activeNav === "generate_plan" && (
          <GeneratePlanView
            t={t}
            lang={lang}
            profile={profile}
            setProfile={setProfile}
            file={file}
            setFile={setFile}
            handleFileUpload={handleFileUpload}
            triggerPipeline={triggerPipeline}
            isProcessing={isProcessing}
            isSimpleMode={isSimpleMode}
            errorMsg={errorMsg}
            ingestResult={ingestResult}
          />
        )}

        {activeNav === "outcomes" && (
          <OutcomesView
            t={t}
            lang={lang}
            profile={profile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            planResult={planResult}
            pipelineState={pipelineState}
            isSimpleMode={isSimpleMode}
            isProcessing={isProcessing}
            templates={TEMPLATES}
            onSelectTemplate={handleSelectTemplate}
            onRefreshPlan={handleRefreshPlan}
            errorMsg={errorMsg}
          />
        )}

        {activeNav === "features"  && <FeaturesSection lang={lang} />}
        {activeNav === "about"     && <AboutSection lang={lang} />}
        {activeNav === "faq"       && <FAQSection lang={lang} />}
        {activeNav === "help"      && <HelpSection lang={lang} />}
        {activeNav === "settings"  && <SettingsSection lang={lang} />}
      </section>

      {/* Right Agent Mesh Panel */}
      <aside
        className="right-panel card"
        style={{ borderRadius: 0, borderLeft: "1px solid var(--border-subtle)" }}
        aria-label="Agent Mesh Topology"
      >
        <h2 style={{ fontSize: "var(--text-sm)", marginBottom: "1.5rem", fontWeight: 700 }}>
          {t.agentMeshPipeline}
        </h2>
        <AgentVisualizer state={pipelineState} />
      </aside>
    </main>
  );
}
