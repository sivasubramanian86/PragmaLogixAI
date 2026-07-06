/**
 * AppSidebar — left navigation panel, profile status widget, language selector.
 * Extracted from page.tsx to reduce monolith size.
 */
"use client";

import React from "react";
import type { Language, AgeGroup } from "../lib/types";
import type { Strings } from "../lib/translations";

type NavSection = "dashboard" | "generate_plan" | "outcomes" | "features" | "about" | "faq" | "help" | "settings";

interface AppSidebarProps {
  t: Strings;
  lang: Language;
  setLang: (l: Language) => void;
  activeNav: NavSection;
  setActiveNav: (n: NavSection) => void;
  profile: AgeGroup;
  pipelineState: "idle" | "ingesting" | "running" | "done";
}

export default function AppSidebar({
  t, lang, setLang, activeNav, setActiveNav, profile, pipelineState,
}: AppSidebarProps) {
  const navItems: { id: NavSection; label: string; icon: string }[] = [
    { id: "dashboard",     label: t.nav.dashboard, icon: "💻" },
    { id: "generate_plan", label: t.generatePlan,  icon: "🚀" },
    { id: "outcomes",      label: t.journeyPlanOutcome, icon: "🎯" },
    { id: "features",      label: t.nav.features,  icon: "⚡" },
    { id: "about",         label: t.nav.about,     icon: "🧬" },
    { id: "faq",           label: t.nav.faq,       icon: "❓" },
    { id: "help",          label: t.nav.help,      icon: "📚" },
    { id: "settings",      label: t.nav.settings,  icon: "⚙️" },
  ];

  const profileLabel = t.profiles[profile];

  return (
    <aside
      className="sidebar card"
      style={{
        borderRadius: 0,
        borderRight: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        overflowY: "auto",
        padding: "1.5rem 1rem",
      }}
      aria-label="Navigation and Settings"
    >
      {/* Brand */}
      <div>
        <h1
          className="brand-title"
          style={{
            fontSize: "var(--text-xl)",
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
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "0",
          }}
        >
          {t.subtitle}
        </p>
      </div>

      {/* Language selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
          🌐 Language
        </span>
        <select
          id="global-lang-select"
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          style={{
            padding: "0.35rem 0.5rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--bg-canvas)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-subtle)",
            fontSize: "0.78rem",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {Object.entries(t.languages).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", paddingLeft: "0.5rem" }}>
          {t.workspace}
        </span>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                width: "100%",
                padding: "0.6rem 0.9rem",
                borderRadius: "var(--radius-md)",
                border: "none",
                backgroundColor: activeNav === item.id ? "oklch(62% 0.22 240 / 0.15)" : "transparent",
                color: activeNav === item.id ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: activeNav === item.id ? 700 : 500,
                fontSize: "0.95rem",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span style={{ fontSize: "1rem", minWidth: "1.2rem" }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.id === "generate_plan" && pipelineState === "running" && (
                <span style={{ fontSize: "0.6rem", color: "var(--accent-amber)" }}>●</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile & System Status */}
      <div className="card" style={{
        padding: "1rem",
        backgroundColor: "oklch(14% 0.025 260 / 0.3)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}>
        <div>
          <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {t.activeProfile}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.3rem" }}>
            <span style={{ fontSize: "1.1rem" }}>👤</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent-primary)" }}>
              {profileLabel}
            </span>
          </div>
        </div>
        <div style={{
          display: "flex", flexDirection: "column", gap: "0.3rem",
          fontSize: "0.72rem", color: "var(--text-secondary)",
          borderTop: "1px solid var(--border-subtle)", paddingTop: "0.6rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{t.decisionOS}</span>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>v2.0</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{t.meshState}</span>
            <span style={{ fontWeight: 600, color: "var(--accent-teal)" }}>{t.online}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "auto", fontSize: "0.65rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>
        {t.title}<br />{t.agentMeshPipeline}
      </div>
    </aside>
  );
}
