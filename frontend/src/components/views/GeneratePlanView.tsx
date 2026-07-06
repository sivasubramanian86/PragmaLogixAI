/**
 * GeneratePlanView — file ingestion + pipeline trigger UI.
 * Extracted from page.tsx to reduce monolith size.
 */
"use client";

import React from "react";
import UploadSection from "../UploadSection";
import type { AgeGroup, Language, IngestResult } from "../../lib/types";
import type { Strings } from "../../lib/translations";

interface GeneratePlanViewProps {
  t: Strings;
  lang: Language;
  profile: AgeGroup;
  setProfile: (p: AgeGroup) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  triggerPipeline: () => void;
  isProcessing: boolean;
  isSimpleMode: boolean;
  errorMsg: string | null;
  ingestResult: IngestResult | null;
}

export default function GeneratePlanView({
  t,
  lang,
  profile,
  setProfile,
  file,
  setFile,
  handleFileUpload,
  triggerPipeline,
  isProcessing,
  isSimpleMode,
  errorMsg,
  ingestResult,
}: GeneratePlanViewProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
      {/* Ingestion Card */}
      <div className="card" style={{ borderLeft: "4px solid var(--accent-primary)", padding: "2rem" }}>
        <h2 style={{
          fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem",
          color: "var(--accent-primary)", textTransform: "uppercase", letterSpacing: "0.5px",
        }}>
          🚀 {t.ingestSignalHeader}
        </h2>
        <UploadSection
          t={t}
          profile={profile}
          setProfile={setProfile}
          handleFileUpload={handleFileUpload}
          setFile={setFile}
          triggerPipeline={triggerPipeline}
          file={file}
          isProcessing={isProcessing}
          errorMsg={errorMsg}
          ingestResult={ingestResult}
          isSimpleMode={isSimpleMode}
          lang={lang}
        />
      </div>

      {/* Ingestion Logs */}
      {ingestResult && (
        <div className="card" style={{ borderLeft: "4px solid var(--accent-teal)", animation: "fadeIn 0.3s ease" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--accent-teal)", marginBottom: "1rem" }}>
            📊 {t.ingestionLogs}
          </h3>
          <div style={{
            backgroundColor: "oklch(10% 0.02 260)",
            padding: "1rem",
            borderRadius: "var(--radius-sm)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            maxHeight: "320px",
            overflowY: "auto",
            border: "1px solid var(--border-subtle)",
          }}>
            <div style={{ color: "var(--accent-teal)", fontWeight: 600, marginBottom: "0.5rem" }}>
              [SYSTEM] {t.ingestSummary}
            </div>
            <div>{t.extractedNodes} {ingestResult.nodes_extracted ?? 0}</div>
            <div>{t.extractedEdges} {ingestResult.edges_extracted ?? 0}</div>
            <div>{t.extractedEvents} {ingestResult.events_extracted ?? 0}</div>
            <pre style={{ marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.72rem", whiteSpace: "pre-wrap" }}>
              {JSON.stringify(ingestResult, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
